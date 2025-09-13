import { tableSchemas } from './variable';

export let db: any;

export async function setupDatabase() {
  const initSqlJs = (await import('sql.js')).default;
  const SQL = await initSqlJs({
    locateFile: () => 'https://sql.js.org/dist/sql-wasm.wasm',
  });

  db = new SQL.Database();

  for (const schema of tableSchemas) {
    db.run(schema);
  }

  const binaryArray = db.export();
  localStorage.setItem('sqlite_db', JSON.stringify(Array.from(binaryArray)));
  console.log('✅ Web DB initialized');
}

export async function deleteDatabase() {
  localStorage.removeItem('sqlite_db');
  console.log('🗑️ Web database deleted');
}