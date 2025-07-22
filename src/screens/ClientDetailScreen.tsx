import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type ClientDetailRouteProp = RouteProp<RootStackParamList, 'ClientDetail'>;

export const ClientDetailScreen = () => {
  const { params } = useRoute<ClientDetailRouteProp>();
  const client = params.client;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{client.firstName} {client.lastName}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text>{client.phoneNumber}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text>{client.email}</Text>

      <Text style={styles.label}>Status:</Text>
      <Text>{client.status}</Text>

      <Text style={styles.label}>Date Created:</Text>
      <Text>{new Date(client.createdAt).toLocaleString()}</Text>

      <Text style={styles.label}>Notes:</Text>
      <Text>{client.notes}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { marginTop: 10, fontWeight: 'bold' },
});
