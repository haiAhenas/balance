// useInitDatabase.ts
import { setupDatabase } from '@/database/database.web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


export function useInitDatabase() {
  useEffect(() => {
    const init = async () => {
      const already = await AsyncStorage.getItem('db_initialized');
      if (!already) {
        await setupDatabase();
        await AsyncStorage.setItem('db_initialized', 'true');
      } else {
        console.log('ℹ️ Database already set up');
      }
    };

    init();
  }, []);
}
