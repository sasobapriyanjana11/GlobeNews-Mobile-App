import { TouchableOpacity, View, ScrollView, StyleSheet, Text } from "react-native";
import { Colors } from "@/constants/Colors";
import newsCategoryList from "@/constants/Categories";
import React, { useRef, useState } from "react";

type Props = {
    onCategoryChange: (category: string) => void;
}

const Categories = ({ onCategoryChange }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<(View | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];

        setActiveIndex(index);

        selected?.measureLayout(
            scrollRef.current,
            (x) => {
                scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
            },
            () => {} // Error callback
        );
        onCategoryChange(newsCategoryList[index].slug);
    };

    return (
        <View>
            <Text style={styles.title}>Trending Right Now</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemWrapper}
            >
                {newsCategoryList.map((item, index) => (
                    <View
                        ref={(el) => (itemRef.current[index] = el)}
                        key={index}
                    >
                        <TouchableOpacity
                            style={[styles.item, activeIndex === index && styles.itemActive]}
                            onPress={() => handleSelectCategory(index)}
                        >
                            <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>
                                {item.title}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    itemWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.darkGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5,
    },
    itemTextActive: {
        fontWeight: "600",
        color: Colors.white,
    },
});
