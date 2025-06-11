import Mybutton from '@/components/Mybutton';
import { useInitDatabase } from '@/database/SQLiteDB';
import { I18nManager, View } from 'react-native';

export default function HomeScreen() {
  useInitDatabase();
  I18nManager.forceRTL(true);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Mybutton
        title="انشاء سند"
        onPress={() => console.log('Button Pressed')}
      />
    </View>
  );
}



