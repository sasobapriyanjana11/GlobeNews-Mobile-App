import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { NewsDataType } from '@/types';
import Loading from '@/components/Loading';
import { Colors } from '@/constants/Colors';
import moment from 'moment';

type Props = {};

const NewsDetails: React.FC<Props> = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    const [news, setNews] = useState<NewsDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        setIsLoading(true);
        try {
            const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
            const response = await axios.get(URL);

            if (response.data && response.data.results && response.data.results.length > 0) {
                setNews(response.data.results);
            } else {
                setNews([]);
            }
        } catch (err) {
            console.error('Error fetching news', err);
        } finally {
            setIsLoading(false);
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
                    headerRight: () => (
                        <TouchableOpacity onPress={() => {}}>
                            <Ionicons name="heart-outline" size={22} />
                        </TouchableOpacity>
                    ),
                    title: '',
                }}
            />
            {isLoading ? (
                <Loading size={'large'} />
            ) : (
                <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
                    <Text style={styles.title}>{news[0]?.title}</Text>
                    <View style={styles.infoWrapper}>
                        <Text style={styles.newsInfo}>{moment(news[0]?.pubDate).format('MMMM DD hh:mm a')}</Text>
                        <Text style={styles.newsInfo}>{news[0]?.source_name}</Text>
                    </View>
                    {news[0]?.image_url ? (
                        <Image source={{ uri: news[0]?.image_url }} style={styles.newsImage} />
                    ) : (
                        <Text style={styles.noImageText}>Image not available</Text>
                    )}
                    {news[0]?.content ? (
                        <Text style={styles.newsContent}>{news[0]?.content}</Text>
                    ) : news[0]?.description ? (
                        <Text style={styles.newsContent}>{news[0]?.description}</Text>
                    ) : (
                        <Text style={styles.newsContent}>Content not available</Text>
                    )}
                </ScrollView>
            )}
        </>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginVertical: 10,
        letterSpacing: 0.6,
    },
    newsImage: {
        width: '100%',
        height: 300,
        marginBottom: 20,
        borderRadius: 10,
    },
    infoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        flexWrap: 'wrap',
    },
    newsInfo: {
        fontSize: 12,
        color: Colors.darkGrey,
    },
    newsContent: {
        fontSize: 14,
        color: '#555',
        letterSpacing: 0.8,
        lineHeight: 22,
    },
    noImageText: {
        fontSize: 14,
        color: Colors.darkGrey,
        textAlign: 'center',
    },
});
