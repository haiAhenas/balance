import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { openDatabaseSync } from 'expo-sqlite';
import { useEffect } from 'react';

// Open or create the database
const db = openDatabaseSync('my-database.db');

// Setup database schema
async function setupDatabase() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      direction TEXT CHECK(direction IN ('in', 'out')) NOT NULL,

      -- Gold fields
      type TEXT,
      karat TEXT,
      weight REAL CHECK(weight >= 0 AND weight = ROUND(weight, 2)),

      -- Cash fields
      amount REAL CHECK(amount >= 0 AND amount = ROUND(amount, 2)),
      currency TEXT DEFAULT 'SRA',

      -- Shared fields
      date DATE,
      party TEXT,
      note TEXT
    );
  `);
}

// Call this inside a React component
export function useInitDatabase() {
  useEffect(() => {
    const init = async () => {
      const already = await AsyncStorage.getItem('db_initialized');
      if (!already) {
        await setupDatabase();
        await AsyncStorage.setItem('db_initialized', 'true');
        console.log('✅ Database initialized');
      } else {
        console.log('ℹ️ Database already set up');
      }
    };

    init();
  }, []);
}



export async function deleteDatabase() {
  await FileSystem.deleteAsync(FileSystem.documentDirectory + 'SQLite/my-database.db');
}