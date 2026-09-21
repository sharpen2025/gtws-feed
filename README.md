# GTWS Feed — Golden Trail Series 자동 수집

`goldentrailseries.com` 의 **대회 캘린더(Next Up · All Races)** 와 **World Series 종합 랭킹(남/여)** 을
매일 한국시간 **오전 8시**에 수집해 `data/gtws.json` 으로 저장합니다.
GitHub 서버에서 돌기 때문에 **내 컴퓨터가 꺼져 있어도** 실행됩니다.

```
goldentrailseries.com ──(매일 08:00 KST)──> GitHub Actions ──> data/gtws.json
                                                                    │
                                        trailrunners.kr/gtws  <─────┘ (위젯이 읽어감)
```

---

## 1. 저장소 만들기

1. GitHub 에서 **New repository** → 이름 `gtws-feed` → **Public** → Create
   - ※ 반드시 **Public** 이어야 아임웹 위젯이 JSON 을 읽을 수 있습니다.
2. 이 폴더의 파일을 그대로 올립니다. (Add file → Upload files → 드래그 → Commit)

   ```
   .github/workflows/update.yml
   scrape.mjs
   package.json
   README.md
   ```

   > `gtws-widget.html`, `preview.html`, `preview-data.js`, `build-preview.mjs` 는
   > 아임웹에 붙여넣거나 확인하는 용도라 올리지 않아도 됩니다. (올려도 무방)

## 2. Actions 쓰기 권한 켜기

저장소 **Settings → Actions → General** → 맨 아래 **Workflow permissions**
→ **Read and write permissions** 선택 → Save

이걸 안 하면 수집은 되는데 커밋(저장)에서 실패합니다.

## 3. 첫 실행

**Actions** 탭 → 왼쪽 `Update GTWS data` → **Run workflow** 버튼 → 초록불 확인.
2~3분 뒤 `data/gtws.json` 파일이 생깁니다.

이후에는 **매일 오전 8시(한국시간)** 에 자동으로 돕니다.
(cron 은 UTC 기준이라 워크플로에는 `0 23 * * *` 로 적혀 있습니다.)

## 4. JSON 주소 확인

```
https://raw.githubusercontent.com/<내아이디>/gtws-feed/main/data/gtws.json
```

브라우저에서 열어 데이터가 보이면 성공입니다.

## 5. 아임웹에 붙여넣기

`gtws-widget.html` 전체를 복사해서 `trailrunners.kr/gtws` 페이지의
**코드 삽입(HTML)** 위젯에 붙여넣습니다.
맨 윗줄의 `data-src` 주소만 4번에서 확인한 내 주소로 바꾸면 끝입니다.

```html
<div id="gtws-widget"
     data-src="https://raw.githubusercontent.com/내아이디/gtws-feed/main/data/gtws.json">
```

---

## 참고

| 항목 | 값 |
|---|---|
| 실행 시각 | 매일 08:00 (Asia/Seoul) |
| 비용 | 무료 (Public 저장소의 Actions 는 무제한) |
| 갱신 날짜 | 내용 변동이 없어도 `updatedDate` 는 **실행 당일 날짜**로 기록 |
| 랭킹 인원 | 성별 각 최대 100명 저장 → 위젯에서 30명씩 표시 |
| 랭킹 시즌 | 올해 데이터가 비어 있으면 자동으로 직전 연도로 대체 |

### 수동으로 돌려보기 (내 컴퓨터에서)

```bash
npm install
npx playwright install chromium
node scrape.mjs
```

### 위젯 미리보기

```bash
node build-preview.mjs   # preview.html 생성 → 브라우저로 열기
```

### 사이트 구조가 바뀌면

`scrape.mjs` 의 선택자 두 곳만 확인하면 됩니다.

- 캘린더: `.b18-next-up-block` (Next Up), `.b19-all-races-block` (All Races)
- 랭킹 API: `/wp-json/gts/v1/gtws/generalRanking.php?sex=m|f&top=5000&edition=<연도>`

수집이 실패하면 Actions 가 빨간불로 표시되고, 기존 `data/gtws.json` 은 그대로 남습니다.
