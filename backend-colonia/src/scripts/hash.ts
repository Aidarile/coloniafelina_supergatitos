/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as bcrypt from 'bcrypt';

async function generarHash() {
  const hash = await bcrypt.hash('gatitos123', 10);
  console.log('Hash generado:', hash);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
generarHash();
