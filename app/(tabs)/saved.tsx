import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Link, Stack, useFocusEffect } from "expo-router";
import Loading from "../../components/Loading";
import { NewsItem } from "../../components/NewsList";

const Page = () => {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
      React.useCallback(() => {
        fetchBookmarkNews();
      }, [])
  );

  const fetchBookmarkNews = async () => {
    setIsLoading(true); // Ensure loading state is reset
    setBookmarkNews([]); // Reset previous news before fetching new ones

    try {
      const token = await AsyncStorage.getItem('bookmarkNews');
      const res = token ? JSON.parse(token) : [];

      if (res.length > 0) {
        console.log("Bookmark res:", res);

        // Fetch news in chunks to avoid large queries
        const chunkSize = 8;
        const fetchedNews = [];

        for (let i = 0; i < res.length; i += chunkSize) {
          const chunk = res.slice(i, i + chunkSize);
          const query_string = chunk.join(',');

          console.log("Query string:", query_string);

          const response = await axios.get(
              `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${query_string}`
          );

          if (response.data.results) {
            fetchedNews.push(...response.data.results);
          }
        }

        setBookmarkNews(fetchedNews); // Set fetched news all at once
      }
    } catch (error) {
      console.error("Error fetching bookmarked news:", error);
      alert('Failed to load bookmarked news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <>
        <Stack.Screen options={{ headerShown: true, title: "Saved News" }} />
        <View style={styles.container}>
          {isLoading ? (
              <Loading size="large" />
          ) : bookmarkNews.length > 0 ? (
              <FlatList
                  data={bookmarkNews}
                  keyExtractor={(item) => item.article_id.toString()}
                  numColumns={2} // Ensures a 2-column layout
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item, index }) => (
                      <Link href={`/news/${item.article_id}`} asChild>
                        <TouchableOpacity style={styles.newsItem}>
                          <NewsItem item={item} isLarge={index % 2 === 0} />
                        </TouchableOpacity>
                      </Link>
                  )}
              />
          ) : (
              <Text style={styles.noDataText}>No saved news found.</Text>
          )}
        </View>
      </>
  );
}

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  newsItem: {
    flex: 1,
    margin: 5,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
    marginTop: 20,
  },
});