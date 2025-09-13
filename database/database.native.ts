// database.native.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { openDatabaseSync } from 'expo-sqlite';
import { tableSchemas } from './variable';


export const db = openDatabaseSync('my-database.db');

export async function setupDatabase() {
  for (const schema of tableSchemas) {
    await db.execAsync(schema);
  }
  console.log('✅ Mobile DB initialized');
}
export async function deleteDatabase() {
  await FileSystem.deleteAsync(`${FileSystem.documentDirectory}SQLite/my-database.db`, { idempotent: true });
  await AsyncStorage.removeItem('db_initialized');
  console.log('🗑️ Mobile DB deleted');
}
