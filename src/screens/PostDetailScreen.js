
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';

export default function PostDetailScreen({ route, navigation }) {
  const { postId } = route.params || {};
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://172.20.10.6:8001/api/posts/${postId}/`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.log('Ошибка загрузки поста:', err))
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.safeArea, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0dcaf0" />
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={{ color: '#ff6b6b', textAlign: 'center', marginTop: 40 }}>Новость не найдена</Text>
        </View>
      </SafeAreaView>
    );
  }

  const title = post.title_rus || post.title;
  const shortDesc = post.short_description_rus || post.short_description;
  const content = post.content_rus || post.content;
  const dateStr = post.created_at ? new Date(post.created_at).toLocaleDateString() : '';
  const categoryName = post.category?.name_rus || post.category?.name || 'Новости';
  const galleryImages = post.images || (post.image ? [post.image, post.image, post.image] : []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnText}>‹ Назад</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <View style={styles.metaRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{categoryName}</Text>
            </View>
            <Text style={styles.dateText}>📅 {dateStr}</Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          {shortDesc ? (
            <View style={styles.descBox}>
              <Text style={styles.descText}>{shortDesc}</Text>
            </View>
          ) : null}

          <Text style={styles.contentText}>{content}</Text>

          {galleryImages.length > 0 && (
            <View style={styles.galleryContainer}>
              <Text style={styles.galleryTitle}>Галерея</Text>
              <View style={styles.galleryGrid}>
                {galleryImages.map((imgUrl, index) => (
                  <Image key={index} source={{ uri: imgUrl }} style={styles.galleryImage} />
                ))}
              </View>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#12151c' },
  container: { padding: 16 },
  backBtn: { marginBottom: 12 },
  backBtnText: { color: '#0dcaf0', fontSize: 14, fontWeight: 'bold' },
  card: {
    backgroundColor: '#1c212c',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2a313f',
    marginBottom: 30,
  },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  badge: { backgroundColor: '#0dcaf0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  badgeText: { color: '#12151c', fontSize: 11, fontWeight: 'bold' },
  dateText: { color: '#8e929b', fontSize: 11 },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 12, lineHeight: 26 },
  descBox: {
    borderLeftWidth: 4,
    borderLeftColor: '#0dcaf0',
    paddingLeft: 10,
    marginBottom: 16,
  },
  descText: { color: '#b0c4de', fontSize: 13, fontWeight: '600', lineHeight: 18 },
  contentText: { color: '#d1d5db', fontSize: 14, lineHeight: 22, marginBottom: 20 },
  galleryContainer: { borderTopWidth: 1, borderTopColor: '#343d4e', paddingTop: 16 },
  galleryTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 10 },
  galleryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  galleryImage: { width: '48%', height: 120, borderRadius: 8, resizeMode: 'cover' },
});