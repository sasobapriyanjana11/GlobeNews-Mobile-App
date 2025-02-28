import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Stack, router, useLocalSearchParams, Link } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsDataType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import { NewsItem } from "../../components/NewsList";

type Props = {};

const Page = (props: Props) => {
    const { query, categories, countries } = useLocalSearchParams<{
        query: string;
        categories: string;
        countries: string;
    }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        try {
            let categoryString = "";
            let countriesString = "";
            let queryString = "";

            // Validate and format categories
            if (categories) {
                const validCategories = ["top", "sports", "business", "technology", "entertainment"]; // Add supported categories
                if (validCategories.includes(categories)) {
                    categoryString = `&category=${categories}`;
                } else {
                    console.warn(`Invalid category: ${categories}`);
                }
            }

            // Validate and format countries
            if (countries) {
                const validCountries = ["in", "lk", "us"]; // Add supported country codes
                if (validCountries.includes(countries)) {
                    countriesString = `&country=${countries}`;
                } else {
                    console.warn(`Invalid country: ${countries}`);
                }
            }

            // Validate and format query
            if (query) {
                queryString = `&q=${encodeURIComponent(query)}`; // Encode query to handle special characters
            }

            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en,si&image=1&removeduplicate=1&size=10${categoryString}${countriesString}${queryString}`;
            const response = await axios.get(URL);

            console.log(response.data);
            if (response && response.data) {
                setNews(response.data.results);
                setIsLoading(false);
            }
        } catch (err: any) {
            console.log(err.message);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} />
                        </TouchableOpacity>
                    ),
                    title: "Search",
                }}
            />
            <View style={styles.container}>
                {isLoading ? (
                    <Loading size="large" />
                ) : (
                    <FlatList
                        data={news}
                        keyExtractor={(item) => item.article_id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            const isLarge = index % 2 === 0;
                            return (
                                <Link href={`/news/${item.article_id}`} asChild>
                                    <TouchableOpacity>
                                        <NewsItem item={item} isLarge={isLarge} />
                                    </TouchableOpacity>
                                </Link>
                            );
                        }}
                    />
                )}
            </View>
        </>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
    },
});