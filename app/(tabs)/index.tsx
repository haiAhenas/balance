import Mybutton from '@/components/Mybutton';
import { useInitDatabase } from '@/hooks/useInitDatabase';
import { useRouter } from 'expo-router';
import { I18nManager, View } from 'react-native';

export default function HomeScreen() {
  I18nManager.forceRTL(true);
  useInitDatabase();
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Mybutton
        title="انشاء سند"
        onPress={() => router.push('/create_documents')}
      />
    </View>
  );
}