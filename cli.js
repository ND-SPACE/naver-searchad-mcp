#!/usr/bin/env node
import manifest from './manifest.json' with { type: 'json' };
console.log(JSON.stringify(manifest));
