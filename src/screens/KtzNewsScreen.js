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

export default function KtzNewsScreen({ navigation }) {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const currentLang = 'ru';

  useEffect(() => {
    fetch('http://172.20.10.6:8001/api/posts/')
      .then((res) => res.json())
      .then((data) => {
        const items = data.results || data;
        const ktzFiltered = items.filter((item) => (item.source || '').toLowerCase() === 'ktz');
        
        setNews(ktzFiltered);
        setFilteredNews(ktzFiltered);

        // Динамически извлекаем уникальные категории из базы данных для КТЖ
        const extractedCategories = [];
        ktzFiltered.forEach((item) => {
          if (item.category) {
            const catId = item.category.id || item.category.slug;
            const catName = item.category.name_rus || item.category.name;
            if (catName && !extractedCategories.some((c) => c.id === catId)) {
              extractedCategories.push({ id: catId, name: catName, slug: item.category.slug });
            }
          }
        });
        setCategories(extractedCategories);
      })
      .catch((err) => console.log('Ошибка загрузки новостей КТЖ:', err))
      .finally(() => setLoading(false));
  }, []);

  const filterByCategory = (catSlug) => {
    setActiveCategory(catSlug);
    if (catSlug === 'all') {
      setFilteredNews(news);
      return;
    }
    const filtered = news.filter(
      (item) => item.category && (item.category.slug === catSlug || item.category.id === catSlug)
    );
    setFilteredNews(filtered);
  };

  const langKey = currentLang === 'kz' ? 'kaz' : currentLang === 'en' ? 'eng' : 'rus';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Шапка раздела */}
        <View style={styles.heroBox}>
          <Text style={styles.heroTitle}>Новости «Қазақстан темір жолы»</Text>
          <Text style={styles.heroSubtitle}>Официальные обновления, изменения расписания и события КТЖ</Text>
        </View>

        {/* Горизонтальный скролл динамических категорий */}
        <View style={styles.filterContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.filterRow}
          >
            <TouchableOpacity 
              style={[styles.filterBtn, activeCategory === 'all' && styles.filterBtnActive]} 
              onPress={() => filterByCategory('all')}
            >
              <Text style={[styles.filterBtnText, activeCategory === 'all' && styles.filterBtnTextActive]}>Все</Text>
            </TouchableOpacity>

            {categories.map((cat) => {
              const isSelected = activeCategory === cat.slug || activeCategory === cat.id;
              return (
                <TouchableOpacity 
                  key={cat.id || cat.slug} 
                  style={[styles.filterBtn, isSelected && styles.filterBtnActive]} 
                  onPress={() => filterByCategory(cat.slug || cat.id)}
                >
                  <Text style={[styles.filterBtnText, isSelected && styles.filterBtnTextActive]}>{cat.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0dcaf0" style={{ marginTop: 40 }} />
        ) : filteredNews.length === 0 ? (
          <Text style={styles.emptyText}>Новости КТЖ по данной категории пока отсутствуют.</Text>
        ) : (
          filteredNews.map((item) => {
            const title = item[`title_${langKey}`] || item.title_rus || item.title;
            const desc = item[`short_description_${langKey}`] || item.short_description_rus || item.short_description;
            const dateStr = item.created_at ? new Date(item.created_at).toLocaleDateString() : '';
            const categoryName = item.category?.name_rus || item.category?.name || 'Объявления';

            return (
              <View key={item.id} style={styles.card}>
                {item.image ? (
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                ) : null}
                
                <View style={styles.cardHeaderRow}>
                  <View style={styles.badgeKtz}>
                    <Text style={styles.badgeKtzText}>{categoryName}</Text>
                  </View>
                  <Text style={styles.dateText}>📅 {dateStr}</Text>
                </View>

                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardDesc} numberOfLines={3}>{desc}</Text>

                <TouchableOpacity 
                  style={styles.readMoreBtn}
                  onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
                >
                  <Text style={styles.readMoreText}>Читать полностью</Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#12151c' },
  container: { padding: 16 },
  heroBox: {
    backgroundColor: '#071428',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0F2C59',
  },
  heroTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 4 },
  heroSubtitle: { color: '#8e929b', fontSize: 12, textAlign: 'center' },

  filterContainer: { marginBottom: 16 },
  filterRow: { gap: 8 },
  filterBtn: {
    backgroundColor: '#1c212c',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#343d4e',
  },
  filterBtnActive: {
    backgroundColor: '#0dcaf0',
    borderColor: '#0dcaf0',
  },
  filterBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  filterBtnTextActive: { color: '#12151c', fontWeight: 'bold' },

  emptyText: { color: '#8e929b', textAlign: 'center', marginTop: 30 },

  card: {
    backgroundColor: '#1c212c',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a313f',
  },
  cardImage: { width: '100%', height: 180, borderRadius: 8, marginBottom: 12, resizeMode: 'cover' },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  badgeKtz: { backgroundColor: '#0dcaf0', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  badgeKtzText: { color: '#12151c', fontSize: 11, fontWeight: 'bold' },
  dateText: { color: '#8e929b', fontSize: 11 },
  cardTitle: { color: '#fff', fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  cardDesc: { color: '#8e929b', fontSize: 12, marginBottom: 14, lineHeight: 16 },
  readMoreBtn: {
    borderWidth: 1,
    borderColor: '#0dcaf0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  readMoreText: { color: '#0dcaf0', fontWeight: 'bold', fontSize: 13 },
});