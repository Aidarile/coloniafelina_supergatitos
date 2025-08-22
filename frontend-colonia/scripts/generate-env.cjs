const fs = require('fs');
const path = require('path');

const rawApi = process.env.NG_API_BASE_URL || 'https://supergatitos-backend.onrender.com';
const apiBaseUrl = rawApi.replace(/\/+$/, '');

const emailjsServiceId   = process.env.NG_EMAILJS_SERVICE_ID   ?? 'undefined';
const emailjsPublicKey   = process.env.NG_EMAILJS_PUBLIC_KEY   ?? 'undefined';
const emailjsTemplateGen = process.env.NG_EMAILJS_TEMPLATE_GENERAL ?? 'undefined';
const emailjsTemplateAdp = process.env.NG_EMAILJS_TEMPLATE_ADOPTA  ?? 'undefined';

const q = (v) => JSON.stringify(String(v));
const content = `// generado por generate-env.cjs
export const environment = {
  production: true,
  apiBaseUrl: ${q(apiBaseUrl)},
  emailjsServiceId: ${q(emailjsServiceId)},
  emailjsPublicKey: ${q(emailjsPublicKey)},
  emailjsTemplates: { general: ${q(emailjsTemplateGen)}, adopta: ${q(emailjsTemplateAdp)} }
};
`;

for (const f of [
  path.join(__dirname, '../src/environments/environment.ts'),
  path.join(__dirname, '../src/environments/environment.prod.ts'),
]) {
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, content, 'utf8');
}
console.log('✅ environment(s) con apiBaseUrl =', apiBaseUrl);
