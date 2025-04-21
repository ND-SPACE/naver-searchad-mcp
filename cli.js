#!/usr/bin/env node
import readline from 'readline';
import manifest from './manifest.json' with { type: 'json' };
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const send = msg => process.stdout.write(JSON.stringify(msg) + '\n');

// 1) 초기 manifest 응답
send({ jsonrpc: '2.0', result: manifest, id: 0 });

// 2) runAction 요청 처리 루프
rl.on('line', async line => {
  try {
    const msg = JSON.parse(line);
    if (msg.method === 'runAction') {
      const { actionName, params } = msg.params;
      const file = path.join(__dirname, 'actions', `${actionName}.js`);
      if (!fs.existsSync(file)) throw new Error('Action not found');
      const mod = await import(file);
      const result = await mod.default.run(params);
      send({ jsonrpc: '2.0', result, id: msg.id });
    }
  } catch (err) {
    send({ jsonrpc: '2.0', error: { message: err.message }, id: null });
  }
});
