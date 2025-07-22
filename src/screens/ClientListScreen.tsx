import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform, ActionSheetIOS, Alert } from 'react-native';
import { Client } from '../models/Client';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const mockClients: Client[] = [
    {
        id: '1',
        firstName: 'Robert',
        lastName: 'Daniel',
        phoneNumber: '+40751681579',
        email: 'robertdanielrobi42@gmail.com',
        createdAt: '2025-07-22T09:19:00Z',
        notes: 'Instagram Lead via Redline Tuning Romania...',
        status: 'Uncontacted',
      },
      {
        id: '2',
        firstName: 'Stefan',
        lastName: 'Popescu',
        phoneNumber: '+40712345678',
        email: 'stefan.popescu@example.com',
        createdAt: '2025-07-21T15:42:00Z',
        notes: 'Recomandare de la client anterior.',
        status: 'Contacted',
      }
];

export const ClientListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({ item }: { item: Client }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ClientDetail', { client: item })}
    >
      <Text style={styles.name}>{item.firstName} {item.lastName}</Text>
      <Text style={styles.meta}>Added: {new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  const handleFABPress = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Add New Client', 'Modify Existing Client'],
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) {
            navigation.navigate('AddClient');
          } else if (buttonIndex === 2) {
            navigation.navigate('ModifyClient'); // trebuie să adaugi ecranul ăsta
          }
        }
      );
    } else {
      // Android fallback
      Alert.alert(
        'Choose an action',
        '',
        [
          { text: 'Add New Client', onPress: () => navigation.navigate('AddClient') },
          { text: 'Modify Existing Client', onPress: () => navigation.navigate('ModifyClient') },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockClients}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      {/* Floating + Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleFABPress}
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#F6F0FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  meta: { color: '#666', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#5A31F4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 32,
    marginBottom: 2,
  }
});
