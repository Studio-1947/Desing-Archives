const fs = require('fs');
const path = require('path');

const envContent = `PORT=5000
DATABASE_URL="postgresql://neondb_owner:npg_rQGKwXJdYt12@ep-cool-paper-ahmiuolm-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
GOOGLE_CLIENT_ID="561492344764-o57303862f9281v1043130760411.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="YOUR_SECRET_HERE"
`;

fs.writeFileSync(path.join(__dirname, '.env'), envContent, { encoding: 'utf8' });
console.log('.env file created successfully');
