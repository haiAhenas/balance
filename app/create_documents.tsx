import { db } from '@/database/database.native'; // Adjust if using web
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function CreateDocumentScreen({ navigation }: any) {
  // letter afther set should be capital
  const [party, setParty] = useState('');
  const [handled_by, setHandledBy] = useState('');
  const [cash, setcash] = useState('');

  const [currency , setcurrency]  = useState('SRA');
  const [note, setNote] = useState('');
  const [goldTransactions, setGoldTransactions] = useState([{ weight: '', karat: '', type: '' }]);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10); // "YYYY-MM-DD"
  });
  // Dropdown state
  const [items, setItems] = useState([
    { label: 'اختر نوع المستند', value: '' },
    { label: 'سند صرف', value: 'out' },
    { label: 'سند قبض', value: 'in' },
  ]);

  const handleCreate = async () => {
    if (!party || !date) {
      Alert.alert('خطأ', 'يرجى إدخال اسم الطرف والتاريخ');
      return;
    }
    try {
      await db.runAsync(
        'INSERT INTO documents (party, date, note) VALUES (?, ?, ?)',
        [party, date, note]
      );
      Alert.alert('تم', 'تم إنشاء المستند بنجاح');
      setParty('');
      setDate('');
      setNote('');
      if (navigation?.goBack) navigation.goBack();
    } catch (error) {
      Alert.alert('خطأ', 'حدث خطأ أثناء إنشاء المستند');
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container} nestedScrollEnabled={true}>
      <Text style={styles.title}>إنشاء مستند جديد</Text>

      <View style={styles.group}>
        <Text style={styles.title}>تفاصيل المستند</Text>
        <Text style={styles.label}> اختر نوع السند</Text>

        <DropDownPicker
        open={open}
        value={selectedValue}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedValue}
        setItems={setItems}
        placeholder="اختر نوع المستند"
        style={styles.input}
        dropDownContainerStyle={styles.dropdown}
        textStyle={{ textAlign: 'left', writingDirection: 'rtl' }} // <-- Add this line
        zIndex={1000}
        listMode="SCROLLVIEW" // <-- Add this line
        />
        <TextInput
        style={styles.input}
        placeholder="اسم الطرف"
        placeholderTextColor="#888"

        value={party}
        onChangeText={setParty}
        />
        <TextInput
        style={styles.input}
        placeholder="التاريخ (YYYY-MM-DD)"
        placeholderTextColor="#888"
        value={date}
        onChangeText={setDate}
        />
        <TextInput
        style={styles.input}
        placeholder="الشخص الذي قام بالمعاملة"
        placeholderTextColor="#888"
        value={handled_by}
        onChangeText={setHandledBy}
        />
        <TextInput
        style={styles.input}
        placeholder="ملاحظات"
        placeholderTextColor="#888"
        value={note}
        onChangeText={setNote}
        />
      </View>

      <View style={styles.group}>
        <Text style={styles.title}>المعاملات النقدية</Text>
        <TextInput
        style={styles.input}
        placeholder="ادخل المبلغ"
        placeholderTextColor="#888"
        value={cash}
        onChangeText={setcash}
        />
        <TextInput
        style={styles.input}
        placeholder="العملة (SRA, USD, EUR)"
        placeholderTextColor="#888"
        value={currency}
        onChangeText={setcurrency}
        />
      </View>
      <View style={styles.group} >
        <Text style={styles.title}>المعاملات الذهبية</Text>
            {goldTransactions.map((gold, i) => (
        <View style={styles.group} key={i}>
          <TextInput
            style={styles.input}
            placeholder="وزن الذهب"
            placeholderTextColor="#888"

            value={gold.weight}
            onChangeText={text => {
              const updated = [...goldTransactions];
              updated[i].weight = text;
              setGoldTransactions(updated);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="عيار الذهب"
            placeholderTextColor="#888"

            value={gold.karat}
            onChangeText={text => {
              const updated = [...goldTransactions];
              updated[i].karat = text;
              setGoldTransactions(updated);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="صنف الذهب"
            placeholderTextColor="#888"

            value={gold.type}
            onChangeText={text => {
              const updated = [...goldTransactions];
              updated[i].type = text;
              setGoldTransactions(updated);
            }}
          />
        </View> 
          ))}
        <Button title="إضافة عملية اخر"onPress={() => setGoldTransactions([...goldTransactions, { weight: '', karat: '', type: '' }])}/>
      </View> // end of gold transactions
      
      <Button title="حفظ المستند" onPress={handleCreate} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  group: {padding: 16,backgroundColor: '#fff', borderWidth: 1,borderColor: '#ccc',borderRadius: 6, marginBottom: 16,},
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 10, marginBottom: 12, textAlign: 'right', minHeight: 44 ,direction: 'rtl'  ,},
  dropdown: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6 , textAlign: 'right' , direction: 'rtl'  },
  label: {fontSize: 16,color: '#444',marginBottom: 6,textAlign: 'right', fontWeight: '500',},
});