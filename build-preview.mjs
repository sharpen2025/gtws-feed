// gtws-widget.html + preview-data.js → preview.html (로컬 확인용)
import { readFileSync, writeFileSync } from 'node:fs';

const widget = readFileSync('gtws-widget.html', 'utf8');
const data = readFileSync('preview-data.js', 'utf8');

const page = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>GTWS 위젯 미리보기</title>
<style>
  body{margin:0; background:#f4f5f7; padding:28px 16px; font-family:-apple-system,BlinkMacSystemFont,"Pretendard","Apple SD Gothic Neo","Noto Sans KR",sans-serif;}
  .wrap{max-width:1280px; margin:0 auto;}   /* 아임웹 컨텐츠 가로폭과 동일 */
  .note{color:#5b636c; font-size:13px; margin:0 0 14px; text-align:center;}
</style>
</head>
<body>
<div class="wrap">
  <p class="note">아래는 아임웹에 붙여넣을 위젯의 미리보기입니다. (샘플 데이터 · 2026-09-18 기준)</p>
  <script>${data}</script>
${widget}
</div>
</body>
</html>
`;

writeFileSync('preview.html', page, 'utf8');
console.log('✓ preview.html 생성');
