import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import SearchBar from "../../components/SearchBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNewsCategories } from "../../hooks/useNewsCategories";
import { useNewsCountries } from "../../hooks/useNewsCountries";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

const Page = () => {
  const { top: safeTop } = useSafeAreaInsets();
  const { newsCategories, toggleNewsCategory } = useNewsCategories();
  const { newsCountries, toggleNewsCountries } = useNewsCountries();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Toggle category selection
  const handleCategoryPress = (id: string, slug: string) => {
    toggleNewsCategory(id);
    setSelectedCategories(prev =>
        prev.includes(slug) ? prev.filter(item => item !== slug) : [...prev, slug]
    );
  };

  // Toggle country selection
  const handleCountryPress = (index: number, code: string) => {
    toggleNewsCountries(index);
    setSelectedCountries(prev =>
        prev.includes(code) ? prev.filter(item => item !== code) : [...prev, code]
    );
  };

  return (
      <View style={[styles.container, { paddingTop: safeTop }]}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Search Bar */}
          <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />

          {/* Categories Section */}
          <Text style={styles.title}>Categories</Text>
          <View style={styles.listContainer}>
            {newsCategories.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.categoryButton,
                      selectedCategories.includes(item.slug) && styles.selectedItem
                    ]}
                    onPress={() => handleCategoryPress(item.id, item.slug)}
                >
                  <Text style={styles.categoryText}>{item.title}</Text>
                </TouchableOpacity>
            ))}
          </View>

          {/* Country Section */}
          <Text style={styles.title}>Country</Text>
          <View style={styles.listContainer}>
            {newsCountries.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      selectedCountries.includes(item.code) && styles.selectedItem
                    ]}
                    onPress={() => handleCountryPress(index, item.code)}
                >
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
            ))}
          </View>

          {/* Search Button */}
          <Link
              href={{
                pathname: `/news/Search`,
                params: {
                  ...(searchQuery ? { query: searchQuery } : {}),
                  ...(selectedCategories.length > 0 ? { categories: selectedCategories.join(",") } : {}),
                  ...(selectedCountries.length > 0 ? { countries: selectedCountries.join(",") } : {})
                }
              }}
              asChild
          >
            <TouchableOpacity style={styles.searchBtn}>
              <Text style={styles.searchBtnTxt}>Search</Text>
            </TouchableOpacity>
          </Link>

        </ScrollView>
      </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding:20
  },
  scrollContent: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#e0e0e0",
  },
  selectedItem: {
    backgroundColor: "#009688", // Highlight selected item
  },
  categoryText: {
    color: "#000",
    fontWeight: "500",
  },
  searchBtn: {
    backgroundColor: "#009688",
    alignItems: "center",
    padding: 12,
    borderRadius: 25,
    marginTop: 10,
    marginHorizontal: 10
  },
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600"
  }
});