import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomFieldsScreen = () => {
  const [fieldName, setFieldName] = useState('');
  const [fields, setFields] = useState<string[]>([]);

  const STORAGE_KEY = '@custom_fields';

  useEffect(() => {
    loadFields();
  }, []);

  const loadFields = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue) {
        setFields(JSON.parse(jsonValue));
      }
    } catch (e) {
      console.error('Failed to load fields:', e);
    }
  };

  const saveFields = async (newFields: string[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFields));
    } catch (e) {
      console.error('Failed to save fields:', e);
    }
  };

  const addField = () => {
    if (fieldName.trim() === '') return;
    const updatedFields = [...fields, fieldName.trim()];
    setFields(updatedFields);
    saveFields(updatedFields);
    setFieldName('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <Text style={styles.title}>Adaugă câmp personalizat</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Buget, Model mașină, Instagram ID..."
        value={fieldName}
        onChangeText={setFieldName}
      />
      <Button title="Adaugă câmp" onPress={addField} />

      <Text style={styles.subtitle}>Câmpuri existente:</Text>
      <FlatList
        data={fields}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Text style={styles.field}>{item}</Text>}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, marginTop: 20, marginBottom: 5 },
  field: {
    fontSize: 16,
    padding: 8,
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    marginVertical: 4,
  },
});
