import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SearchResultsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Результаты поиска</Text>
      <Button 
        title="Выбрать места на рейс" 
        onPress={() => navigation.navigate('SeatSelection')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});