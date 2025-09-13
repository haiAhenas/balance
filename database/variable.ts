let gold_transactions = `CREATE TABLE IF NOT EXISTS gold_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id INTEGER NOT NULL,
  direction TEXT CHECK(direction IN ('in', 'out')) NOT NULL,
  cotegory TEXT,
  karat TEXT,
  weight REAL CHECK(weight >= 0 AND weight = ROUND(weight, 2)),
  FOREIGN KEY(document_id) REFERENCES documents(id)
);`;

let used_gold_transactions = `CREATE TABLE IF NOT EXISTS used_gold (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id INTEGER NOT NULL,
  direction TEXT CHECK(direction IN ('in', 'out')) NOT NULL,
  karat TEXT,
  weight REAL CHECK(weight >= 0 AND weight = ROUND(weight, 2)),
  FOREIGN KEY(document_id) REFERENCES documents(id)
);`;

let cash_transactions = `CREATE TABLE IF NOT EXISTS cash_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  document_id INTEGER NOT NULL,
  direction TEXT CHECK(direction IN ('in', 'out')) NOT NULL,
  amount REAL CHECK(amount >= 0 AND amount = ROUND(amount, 2)),
  currency TEXT DEFAULT 'SRA',
  FOREIGN KEY(document_id) REFERENCES documents(id)
);`;

let documents = `CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  party TEXT NOT NULL,
  date DATE NOT NULL,
  handled_by TEXT,
  note TEXT
);`

// Add all table creation queries to one list
export const tableSchemas = [
  documents,
  gold_transactions,
  used_gold_transactions,
  cash_transactions,
];