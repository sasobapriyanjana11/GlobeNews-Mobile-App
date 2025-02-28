import {View, Text, StyleSheet, Image, TouchableOpacity} from "react-native";
import {NewsDataType} from "@/types";
import {Colors} from "@/constants/Colors";
import Loading from "./Loading";
import {Link} from "expo-router";

// News list component
type Props = {
    newsList: Array<NewsDataType>;
};

const NewsList = ({newsList}: Props) => {
    if (newsList.length === 0) {
        return <Loading size={"large"}/>;
    }

    return (
        <View style={styles.container}>
            {newsList.map((item, index) => {
                const isLarge = index % 2 === 0;
                return (
                    <Link href={`/news/${item.article_id}`} asChild key={item.article_id}>
                        <TouchableOpacity>
                            <NewsItem item={item} isLarge={isLarge}/>
                        </TouchableOpacity>
                    </Link>
                );
            })}
        </View>
    );
};

export default NewsList;

// News item component
export const NewsItem = ({
                             item,
                             isLarge,
                         }: {
    item: NewsDataType;
    isLarge: boolean;
}) => {
    return (
        <View style={[styles.itemContainer, isLarge ? styles.largeCard : styles.smallCard]}>
            <Image source={{uri: item.image_url}} style={styles.itemImg}/>
            <View style={styles.itemInfo}>
                <Text style={styles.itemCategory}>{item.category}</Text>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <View style={styles.itemSourceInfo}>
                    <Image source={{uri: item.source_icon}} style={styles.itemSourceImg}/>
                    <Text style={styles.itemSourceName}>{item.source_name}</Text>
                </View>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginBottom: 50,
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        padding: 14,
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    largeCard: {
        padding: 18,
        borderRadius: 16,
    },
    smallCard: {
        padding: 10,
        borderRadius: 8,
    },
    itemImg: {
        width: 100,
        height: 110,
        borderRadius: 12,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: "center",
    },
    itemCategory: {
        fontSize: 14,
        color: Colors.tint,
        textTransform: "capitalize",
        fontWeight: "600",
        marginBottom: 4,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: Colors.black,
        flexShrink: 1,
    },
    itemSourceInfo: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
    },
    itemSourceImg: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
    itemSourceName: {
        fontSize: 10,
        fontWeight: "600",
        color: Colors.darkGrey,
    },
});