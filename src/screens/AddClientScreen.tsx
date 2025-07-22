import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AddClientScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [customFields, setCustomFields] = useState<string[]>([]);
  const [customValues, setCustomValues] = useState<{ [key: string]: string }>({});

  const STORAGE_KEY = '@custom_fields';

  useEffect(() => {
    loadCustomFields();
  }, []);

  const loadCustomFields = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue) {
        const fields = JSON.parse(jsonValue) as string[];
        setCustomFields(fields);
      }
    } catch (e) {
      console.error('Failed to load custom fields:', e);
    }
  };

  const handleCustomChange = (key: string, value: string) => {
    setCustomValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const client = {
      firstName,
      lastName,
      phoneNumber,
      email,
      ...customValues,
      createdAt: new Date().toISOString(),
    };
    console.log('Client creat:', client);
    // aici poți trimite spre Firebase, AsyncStorage, etc.
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adaugă Client Nou</Text>

      <TextInput
        style={styles.input}
        placeholder="Prenume"
        value={firstName}
        onChangeText={setFirstName}
      />

      <TextInput
        style={styles.input}
        placeholder="Nume"
        value={lastName}
        onChangeText={setLastName}
      />

      <TextInput
        style={styles.input}
        placeholder="Telefon"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {customFields.map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field}
          value={customValues[field] || ''}
          onChangeText={(text) => handleCustomChange(field, text)}
        />
      ))}

      <Button title="Salvează client" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
});
