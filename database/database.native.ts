// database.native.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { openDatabaseSync } from 'expo-sqlite';

export const db = openDatabaseSync('my-database.db');

export async function setupDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_type TEXT CHECK(item_type IN ('gold', 'cash')) NOT NULL,
      direction TEXT CHECK(direction IN ('in', 'out')) NOT NULL,
      type TEXT,
      karat TEXT,
      weight REAL CHECK(weight >= 0 AND weight = ROUND(weight, 2)),
      amount REAL CHECK(amount >= 0 AND amount = ROUND(amount, 2)),
      currency TEXT DEFAULT 'SRA',
      date DATE,
      party TEXT,
      note TEXT
    );
  `);

  console.log('✅ Mobile DB initialized');
}

export async function deleteDatabase() {
  await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/my-database.db`, { idempotent: true });
  await AsyncStorage.removeItem('db_initialized');
  console.log('🗑️ Mobile DB deleted');
}
