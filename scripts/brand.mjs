import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
const [rootArg, logoArg = 'branding/logo.svg', iconArg = 'branding/icon.svg'] = process.argv.slice(2);
if (!rootArg || !logoArg) throw Error('Usage: node scripts/brand.mjs upstream-web branding/logo.svg');
const root = path.resolve(rootArg);
const color = process.env.SINDORA_COLOR || '#52723b';
if (!/^#[0-9a-f]{6}$/i.test(color || '')) throw Error('SINDORA_COLOR must be official #RRGGBB');
const ref = '9bca1f31f6430d78def615536eae58fa6ecb7e36';
const git = (...args) => execFileSync('git', ['-C', root, ...args], {encoding:'utf8'}).trim();
if (git('rev-parse','HEAD') !== ref || git('status','--porcelain')) throw Error('Expected clean pinned upstream checkout');
const logo = fs.readFileSync(logoArg,'utf8');
const icon = fs.readFileSync(iconArg,'utf8');
for (const asset of [logo,icon]) if (!/<svg\b/i.test(asset) || /<script\b|<foreignObject\b|<!DOCTYPE|\bon\w+\s*=|(?:href|src)\s*=\s*["'](?!#)/i.test(asset)) throw Error('Provide a trusted standalone SVG without active or external content');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const changes = new Map();
function replace(p, pairs) {
  let value = read(p);
  for (const [old,next] of pairs) {
    if (!value.includes(old)) throw Error('Missing expected text in '+p+': '+old);
    value = value.replaceAll(old,next);
  }
  changes.set(p,value);
}
replace('config/config.ts', [["title: 'RustDesk Console'", "title: 'Console Sindora'"]]);
replace('config/defaultSettings.ts', [["title: 'RustDesk Console'", "title: 'Console Sindora'"],['#1890ff',color]]);
replace('src/pages/user/login/index.tsx', [['title="RustDesk Console"','title="Console Sindora"'],['subTitle="RustDesk Remote Desktop Management Console"','subTitle="Administration des accès à distance"']]);
for (const p of ['public/manifest.json','src/manifest.json']) {
  const m = JSON.parse(read(p)); m.name='Console Sindora'; m.short_name='Sindora'; m.theme_color=color;
  if (m.description) m.description='Console de gestion des accès à distance';
  changes.set(p,JSON.stringify(m,null,2)+'\n');
}
changes.set('public/logo.svg',icon);
changes.set('public/sindora-logo.svg',logo);
const loginPath='src/pages/user/login/index.tsx';
const login=changes.get(loginPath);
if (!login.includes('src="/logo.svg"')) throw Error('Login logo anchor missing');
changes.set(loginPath,login.replace('logo={<img alt="logo" src="/logo.svg" />}', 'logo={false}').replace('title="Console Sindora"', 'title={<img alt="Console Sindora" src="/sindora-logo.svg" style={{ width: 200, maxWidth: "100%", height: "auto", display: "inline-block" }} />}'));
const configPath = 'config/config.ts';
changes.set(configPath, changes.get(configPath).replace('fontFamily:', 'colorPrimary: '+JSON.stringify(color)+',\n          fontFamily:').replaceAll('#1890ff', color).replaceAll("content: 'RustDesk Console'", "content: 'Console Sindora'"));
replace('src/pages/user/login/styles.ts', [[
  "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
  "linear-gradient(135deg, #ffffff 0%, #edf3e5 55%, #ffffff 100%)"
]]);
for (const [p,v] of changes) fs.writeFileSync(path.join(root,p),v);
console.log('Modified:', [...changes.keys()].join(', '));
