#!/usr/bin/env node
import readline from 'readline';
import manifest from './manifest.json' with { type: 'json' };
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// 프로그램이 계속 실행되도록 이벤트 루프를 활성 상태로 유지
const keepAliveInterval = setInterval(() => {
  // 주기적인 로깅은 선택사항입니다
  // console.error('[mcp] keepalive heartbeat');
}, 60000); // 1분마다 실행

process.stdin.resume();

// STDIN 종료 이벤트 핸들링 개선
process.stdin.on('end', () => {
  console.error('[mcp] stdin end - continuing execution');
  // 여기서 종료하지 않고 계속 실행됨
});

process.stdin.on('close', () => {
  console.error('[mcp] stdin close - continuing execution');
  // 여기서도 종료하지 않고 계속 실행됨
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Readline 종료 이벤트 개선
rl.on('close', () => {
  console.error('[mcp] readline closed - continuing execution');
  // readline이 닫혀도 프로그램은 계속 실행됨
  
  // 필요하다면 여기서 다시 readline 인터페이스를 재생성할 수도 있습니다
  // const newRl = readline.createInterface({ ... });
});

const send = msg => {
  console.error('[mcp] sending →', msg);
  process.stdout.write(JSON.stringify(msg) + '\n');
};

// 1) manifest 응답
console.error('[mcp] about to send manifest');
send({ jsonrpc: '2.0', result: manifest, id: 0 });

// 2) runAction 요청 처리
rl.on('line', async line => {
  console.error('[mcp] received line →', line);
  try {
    const msg = JSON.parse(line);
    if (msg.method === 'runAction') {
      console.error('[mcp] runAction→', msg.params.actionName);
      const file = path.join(__dirname, 'actions', `${msg.params.actionName}.js`);
      if (!fs.existsSync(file)) throw new Error('Action not found');
      const mod = await import(file);
      const result = await mod.default.run(msg.params.params);
      send({ jsonrpc: '2.0', result, id: msg.id });
    }
  } catch (err) {
    console.error('[mcp] handler error', err);
    send({ jsonrpc: '2.0', error: { message: err.message }, id: null });
  }
});

// 적절한 종료 처리를 위한 시그널 핸들러 추가
process.on('SIGINT', () => {
  console.error('[mcp] Received SIGINT, cleaning up...');
  clearInterval(keepAliveInterval);
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('[mcp] Received SIGTERM, cleaning up...');
  clearInterval(keepAliveInterval);
  process.exit(0);
});