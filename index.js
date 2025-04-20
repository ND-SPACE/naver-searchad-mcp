import fs from 'fs';

const actionFiles = fs.readdirSync('./actions');
console.log(`✅ Claude MCP에 등록된 액션 수: ${actionFiles.length}`); 