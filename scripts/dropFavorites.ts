import { neon } from '@neondatabase/serverless';

async function main() {
  const sql = neon("postgresql://neondb_owner:npg_nZeAjEc61GDM@ep-empty-lake-a5vmd4tr-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require");
  await sql`DROP TABLE IF EXISTS favorites CASCADE;`;
  console.log("Dropped favorites table");
}

main().catch(console.error);
