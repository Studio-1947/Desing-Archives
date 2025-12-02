require('dotenv').config();
try {
  new URL(process.env.DATABASE_URL);
  console.log('URL is valid');
} catch (e) {
  console.error('URL is invalid:', e.message);
}
process.exit(0);
