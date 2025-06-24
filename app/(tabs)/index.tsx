import Mybutton from '@/components/Mybutton';
import { useInitDatabase } from '@/hooks/useInitDatabase';
import { I18nManager, View } from 'react-native';

export default function HomeScreen() {
  I18nManager.forceRTL(true);
  //deleteDatabase();
  useInitDatabase();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Mybutton
        title="انشاء سند"
        onPress={() => console.log('Button Pressed')}
      />
    </View>
  );
}



