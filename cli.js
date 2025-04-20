#!/usr/bin/env node
import { createServer } from '@anthropic-ai/model-context-protocol/server';
import manifest from './manifest.json' with { type: 'json' };

// 모든 액션을 동적으로 불러오기
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const actionsDir = path.join(__dirname, 'actions');

const actions = {};
const files = fs.readdirSync(actionsDir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const action = await import(path.join(actionsDir, file));
  actions[action.default.name] = action.default.run;
}

createServer({ manifest, actions }).start();
