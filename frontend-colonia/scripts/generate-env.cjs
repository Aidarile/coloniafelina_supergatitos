const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../src/environments/environment.ts');

const content = `
export const environment = {
  production: true,
  emailjsServiceId: '${process.env.NG_EMAILJS_SERVICE_ID}',
  emailjsPublicKey: '${process.env.NG_EMAILJS_PUBLIC_KEY}',
  emailjsTemplates: {
    general: '${process.env.NG_EMAILJS_TEMPLATE_GENERAL}',
    adopta: '${process.env.NG_EMAILJS_TEMPLATE_ADOPTA}'
  }
};
`;

fs.writeFileSync(envPath, content);
console.log('el archivo environment.ts se ha generado en build');
