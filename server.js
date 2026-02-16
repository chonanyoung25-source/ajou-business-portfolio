
const http = require('http');
const fs = require('fs');
const path = require('path');

// Cloud Run 필수 환경 변수 처리
const PORT = process.env.PORT || 8080;
const HOST = '0.0.0.0';

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.ts': 'text/javascript',
  '.tsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // 헬스 체크 로그 (실시간 확인용)
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);

  // URL에서 쿼리 파라미터 제거
  let requestPath = req.url.split('?')[0];
  if (requestPath === '/') requestPath = '/index.html';

  const filePath = path.join(__dirname, requestPath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 파일이 없으면 SPA를 위해 index.html로 폴백
      console.log(`Fallback to index.html for: ${requestPath}`);
      fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Critical Error: index.html not found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      });
      return;
    }

    // 파일 읽기 및 전송
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
        return;
      }
      res.writeHead(200, { 
        'Content-Type': contentType,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
    });
  });
});

// 서버 바인딩
server.listen(PORT, HOST, (err) => {
  if (err) {
    console.error('SERVER_START_FAILED:', err);
    process.exit(1);
  }
  console.log('-------------------------------------------');
  console.log(`🚀 DEPLOYMENT_SUCCESSFUL`);
  console.log(`📍 LISTENING_ON: http://${HOST}:${PORT}`);
  console.log(`📂 WORK_DIR: ${__dirname}`);
  console.log('-------------------------------------------');
});

// 프로세스 예외 처리 (서버 중단 방지)
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT_EXCEPTION:', err);
});
