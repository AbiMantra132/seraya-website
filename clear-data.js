const { neon } = require('@neondatabase/serverless');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function run() {
  try {
    console.log('Connecting to Neon...');
    const sql = neon(process.env.DATABASE_URL);
    
    const tables = await sql`SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public'`;
    console.log('Tables found:', tables.map(t => t.tablename));
    
    for (const table of tables) {
      if (table.tablename !== 'pg_stat_statements') {
        console.log('Truncating table', table.tablename);
        await sql.query(`TRUNCATE TABLE "public"."${table.tablename}" CASCADE;`);
      }
    }
    console.log('Database cleared.');

    console.log('Clearing Cloudinary...');
    const result = await cloudinary.api.delete_all_resources();
    console.log('Cloudinary resources deleted:', result);
  } catch (err) {
    console.error(err);
  }
}
run();
