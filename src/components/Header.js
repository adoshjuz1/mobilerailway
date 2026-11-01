import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// шапка
export default function Header({ title = 'Railway Connect', onBack, onAvatarPress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBtn} onPress={onBack}>
        <Ionicons name={onBack ? 'arrow-back' : 'menu-outline'} size={24} color="#003d9b" />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onAvatarPress} activeOpacity={onAvatarPress ? 0.7 : 1}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={18} color="#003d9b" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003d9b',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});