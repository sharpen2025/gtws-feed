/**
 * Golden Trail Series → JSON 수집기
 *
 * goldentrailseries.com 에서
 *   1) 캘린더의 "Next Up" 과 "All Races"
 *   2) World Series 종합 랭킹 (남/여)
 * 를 긁어 data/gtws.json 으로 저장한다.
 *
 * 사이트가 Cloudflare 뒤에 있어 일반 fetch 는 막힐 수 있으므로
 * Playwright(크로미움)로 실제 브라우저처럼 접속한다.
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';

const BASE = 'https://goldentrailseries.com';
const OUT = 'data/gtws.json';

/** 랭킹에 담을 최대 인원 (성별 각각) */
const RANK_LIMIT = 100;

/** 서울 시간 기준 날짜 문자열 */
function seoulNow() {
  const now = new Date();
  const fmt = (opts) =>
    new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul', ...opts }).format(now);
  const date = fmt({ year: 'numeric', month: '2-digit', day: '2-digit' }); // YYYY-MM-DD
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Seoul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now);
  return { date, time, iso: `${date}T${time}:00+09:00` };
}

/** "20/09/2026" → "2026-09-20" */
function toISODate(dmy) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec((dmy || '').trim());
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

/** 페이지 안에서 실행되는 카드 파서 (브라우저 컨텍스트) */
const EXTRACT_RACES = `(() => {
  const parseCard = (a) => {
    const txt = a.textContent || '';
    const date = (txt.match(/\\b(\\d{2}\\/\\d{2}\\/\\d{4})\\b/) || [])[1] || '';
    const flag = a.querySelector('svg.flag-icon use')?.getAttribute('href') || '';
    const series = [...a.querySelectorAll('div')]
      .map((d) => d.textContent.trim())
      .find((s) => /^(World|National) Series$/.test(s)) || '';
    const stats = [...a.querySelectorAll('.flex.gap-6 > div')].map((d) =>
      d.textContent.replace(/\\s+/g, ' ').trim()
    );
    return {
      date,
      country: flag.replace('#flag-', '').toLowerCase(),
      series,
      name: (a.querySelector('h3')?.textContent || '').replace(/\\s+/g, ' ').trim(),
      tagline: (a.querySelector('p')?.textContent || '').replace(/\\s+/g, ' ').trim(),
      distance: stats[0] || '',
      elevation: stats[1] || '',
      capacity: stats[2] || '',
      url: a.getAttribute('href') || '',
      image: a.querySelector('img')?.getAttribute('src') || ''
    };
  };
  const pick = (sel) => [...document.querySelectorAll(sel + ' a[href*="/race/"]')].map(parseCard);
  return {
    nextUp: pick('.b18-next-up-block'),
    races: pick('.b19-all-races-block')
  };
})()`;

async function main() {
  const stamp = seoulNow();
  const edition = Number(stamp.date.slice(0, 4));

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
    locale: 'en-US',
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();

  // ── 1. 캘린더 ────────────────────────────────────────────────
  await page.goto(`${BASE}/calendar/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('.b19-all-races-block a[href*="/race/"]', { timeout: 60000 });
  const cal = await page.evaluate(EXTRACT_RACES);

  const decorate = (r) => ({ ...r, dateISO: toISODate(r.date) });
  const nextUp = cal.nextUp.map(decorate);
  const races = cal.races.map(decorate).sort((a, b) => a.dateISO.localeCompare(b.dateISO));

  if (!races.length) throw new Error('All Races 를 하나도 읽지 못했습니다. 사이트 구조가 바뀌었을 수 있습니다.');

  // ── 2. 랭킹 (같은 도메인 안에서 API 호출) ──────────────────────
  const fetchRank = async (sex, ed) =>
    page.evaluate(
      async ({ sex, ed }) => {
        const res = await fetch(
          `/wp-json/gts/v1/gtws/generalRanking.php?sex=${sex}&top=5000&edition=${ed}`
        );
        if (!res.ok) return [];
        const json = await res.json();
        return Array.isArray(json) ? json : [];
      },
      { sex, ed }
    );

  const slim = (rows) =>
    rows
      .filter((p) => p && p.name && Number(p.gtwsPoints) > 0)
      .map((p) => ({
        rank: Number(p.rankSex) || null,
        name: p.name,
        club: p.club || '',
        country: (p.countryCode || '').toLowerCase(),
        points: Number(p.gtwsPoints) || 0,
        raceCount: Array.isArray(p.races) ? p.races.length : 0,
      }))
      .sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999) || b.points - a.points)
      .slice(0, RANK_LIMIT);

  let usedEdition = edition;
  let men = slim(await fetchRank('m', usedEdition));
  let women = slim(await fetchRank('f', usedEdition));

  // 시즌이 아직 안 열렸으면 직전 연도로 폴백
  if (!men.length && !women.length) {
    usedEdition = edition - 1;
    men = slim(await fetchRank('m', usedEdition));
    women = slim(await fetchRank('f', usedEdition));
  }

  await browser.close();

  const payload = {
    updatedAt: stamp.iso,
    updatedDate: stamp.date,
    updatedTime: stamp.time,
    edition: usedEdition,
    counts: { nextUp: nextUp.length, races: races.length, men: men.length, women: women.length },
    nextUp,
    races,
    ranking: { men, women },
    source: {
      calendar: `${BASE}/calendar/`,
      ranking: `${BASE}/serie/world-series/world-series-overall-ranking/`,
    },
  };

  // 랭킹을 한 명도 못 가져왔다면 직전 결과를 유지한다 (일시적 장애 대비)
  if (!men.length && !women.length && existsSync(OUT)) {
    try {
      const prev = JSON.parse(readFileSync(OUT, 'utf8'));
      if (prev?.ranking?.men?.length || prev?.ranking?.women?.length) {
        payload.ranking = prev.ranking;
        payload.edition = prev.edition ?? usedEdition;
        payload.counts.men = payload.ranking.men.length;
        payload.counts.women = payload.ranking.women.length;
        payload.rankingStale = true;
      }
    } catch {
      /* 이전 파일이 깨졌으면 그냥 무시 */
    }
  }

  mkdirSync('data', { recursive: true });
  writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');

  console.log(
    `✓ ${stamp.iso} | Next Up ${payload.counts.nextUp} · 대회 ${payload.counts.races} · 남 ${payload.counts.men} · 여 ${payload.counts.women} (edition ${payload.edition})`
  );
}

main().catch((err) => {
  console.error('수집 실패:', err);
  process.exit(1);
});
