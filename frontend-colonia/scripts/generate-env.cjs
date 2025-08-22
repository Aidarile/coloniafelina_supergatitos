const fs = require('fs');
const path = require('path');

// Lee la URL base de la API desde Vercel (o usa un fallback)
const rawApi = process.env.NG_API_BASE_URL || 'https://supergatitos-backend.onrender.com';
// Quita barras finales para evitar // en las rutas
const apiBaseUrl = rawApi.replace(/\/+$/, '');

// EmailJS
const emailjsServiceId   = process.env.NG_EMAILJS_SERVICE_ID   ?? 'undefined';
const emailjsPublicKey   = process.env.NG_EMAILJS_PUBLIC_KEY   ?? 'undefined';
const emailjsTemplateGen = process.env.NG_EMAILJS_TEMPLATE_GENERAL ?? 'undefined';
const emailjsTemplateAdp = process.env.NG_EMAILJS_TEMPLATE_ADOPTA  ?? 'undefined';

// Helper para generar literales de string seguros en TS
const q = (v) => JSON.stringify(String(v));

// Contenido que escribiremos en environment*.ts
const content = `//Archivo generado automáticamente por scripts/generate-env.cjs
export const environment = {
  production: true,
  apiBaseUrl: ${q(apiBaseUrl)},
  emailjsServiceId: ${q(emailjsServiceId)},
  emailjsPublicKey: ${q(emailjsPublicKey)},
  emailjsTemplates: {
    general: ${q(emailjsTemplateGen)},
    adopta: ${q(emailjsTemplateAdp)}
  }
};
`;

const targets = [
  path.join(__dirname, '../src/environments/environment.ts'),
  path.join(__dirname, '../src/environments/environment.prod.ts'),
];

for (const file of targets) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
}

console.log('environment.ts y environment.prod.ts generados con apiBaseUrl =', apiBaseUrl);
