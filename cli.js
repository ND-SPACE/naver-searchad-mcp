#!/usr/bin/env node
import readline from 'readline';
import manifest from './manifest.json' with { type: 'json' };
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

process.stdin.resume();
// STDIN 종료 이벤트도 찍어 보기
process.stdin.on('end', () => console.error('[mcp] stdin end'));
process.stdin.on('close', () => console.error('[mcp] stdin close'));

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
// Readline 종료 이벤트 찍기
rl.on('close', () => console.error('[mcp] readline closed'));

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
