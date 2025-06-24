

export let db: any;

export async function setupDatabase() {
  const initSqlJs = (await import('sql.js')).default;
  const SQL = await initSqlJs({
    locateFile: () => 'https://sql.js.org/dist/sql-wasm.wasm',
  });

  db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_type TEXT NOT NULL,
      direction TEXT NOT NULL,
      type TEXT,
      karat TEXT,
      weight REAL,
      amount REAL,
      currency TEXT DEFAULT 'SRA',
      date TEXT,
      party TEXT,
      note TEXT
    );
  `);

  const binaryArray = db.export();
  localStorage.setItem('sqlite_db', JSON.stringify(Array.from(binaryArray)));
  console.log('✅ Web DB initialized');
}

export async function deleteDatabase() {
  localStorage.removeItem('sqlite_db');
  console.log('🗑️ Web database deleted');
}
