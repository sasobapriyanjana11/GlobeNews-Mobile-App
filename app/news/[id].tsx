import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { NewsDataType } from "@/types";
import Loading from "../../components/Loading";
import { Colors } from "@/constants/Colors";
import Moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {};

const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bookmark, setBookmark] = useState(false);

    useEffect(() => {
        getNews();
    }, []);

    useEffect(() => {
        if (!isLoading && news.length > 0) {
            renderBookmark(news[0].article_id);
        }
    }, [isLoading, news]);

    const getNews = async () => {
        try {
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
            const response = await axios.get(URL);
            if (response?.data?.results?.length > 0) {
                setNews(response.data.results);
            } else {
                setNews([]);
            }
            setIsLoading(false);
        } catch (err: any) {
            console.log("Error fetching news:", err.message);
            setIsLoading(false);
        }
    };

    // Render bookmark status
    const renderBookmark = async (newsId: string) => {
        const bookmarks = await AsyncStorage.getItem("bookmarkNews");
        const parsedBookmarks = bookmarks ? JSON.parse(bookmarks) : [];
        setBookmark(parsedBookmarks.includes(newsId));
    };

    // Toggle bookmark
    const toggleBookmark = async (newsId: string) => {
        try {
            const bookmarks = await AsyncStorage.getItem("bookmarkNews");
            const parsedBookmarks = bookmarks ? JSON.parse(bookmarks) : [];

            if (parsedBookmarks.includes(newsId)) {
                // Remove bookmark
                const updatedBookmarks = parsedBookmarks.filter((id: string) => id !== newsId);
                await AsyncStorage.setItem("bookmarkNews", JSON.stringify(updatedBookmarks));
                setBookmark(false);
                alert("News removed from bookmarks!!");
            } else {
                // Add bookmark
                parsedBookmarks.push(newsId);
                await AsyncStorage.setItem("bookmarkNews", JSON.stringify(parsedBookmarks));
                setBookmark(true);
                alert("News added to bookmarks!!");
            }
        } catch (err) {
            console.error("Error toggling bookmark:", err);
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
                            <Ionicons name="arrow-back" size={22} color="black" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity style={styles.headerButton} onPress={() => toggleBookmark(news[0].article_id)}>
                            <Ionicons
                                name={bookmark ? "heart" : "heart-outline"}
                                size={22}
                                color={bookmark ? "red" : Colors.black}
                            />
                        </TouchableOpacity>
                    ),
                    title: '',
                }}
            />
            {isLoading ? (
                <Loading size="large" />
            ) : news.length > 0 ? (
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>{news[0].title}</Text>
                    <View style={styles.newsInfoWrapper}>
                        <Text style={styles.newsInfo}>{Moment(news[0].pubDate).format('MMMM DD YYYY , hh:mm a')}</Text>
                        <Text style={styles.newsInfo}>{news[0].source_name}</Text>
                    </View>
                    {news[0].image_url ? (
                        <Image source={{ uri: news[0].image_url }} style={styles.newsImg} />
                    ) : (
                        <Text style={styles.placeholderText}>No image available</Text>
                    )}
                    {news[0].description ? (
                        <Text style={styles.content}>{news[0].description}</Text>
                    ) : (
                        <Text style={styles.paidContentText}>No description available.</Text>
                    )}
                    {news[0].content && !news[0].content.includes("ONLY AVAILABLE IN PAID PLANS") ? (
                        <Text style={styles.content}>{news[0].content}</Text>
                    ) : (
                        <Text style={styles.paidContentText}>Full content available for paid users.</Text>
                    )}
                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.errorText}>News article not found</Text>
                </View>
            )}
        </>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    newsInfoWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    newsInfo: {
        fontSize: 12,
        color: Colors.darkGrey,
    },
    newsImg: {
        width: "100%",
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginVertical: 10,
        letterSpacing: 0.6,
    },
    content: {
        fontSize: 16,
        color: "#666",
        letterSpacing: 0.6,
        textAlign: "left",
        lineHeight: 24,
    },
    paidContentText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "red",
        textAlign: "center",
        marginTop: 10,
    },
    placeholderText: {
        fontSize: 14,
        fontStyle: "italic",
        color: "#888",
        textAlign: "center",
        marginVertical: 10,
    },
    errorText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "red",
    },
    headerButton: {
        marginHorizontal: 10,
        padding: 8,
    },
});