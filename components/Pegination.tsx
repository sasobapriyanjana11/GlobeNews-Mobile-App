import { View, StyleSheet } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";

type Props = {
    items: NewsDataType[];
    paginationIndex: number;
    scrollX: Animated.SharedValue<number>;
};

const Pegination = ({ items, paginationIndex, scrollX }: Props) => {
    return (
        <View style={styles.container}>
            {items.map((_, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                    const opacity = interpolate(
                        scrollX.value,
                        [(index - 1) * 300, index * 300, (index + 1) * 300],
                        [0.3, 1, 0.3],
                        "clamp"
                    );
                    const backgroundColor =
                        paginationIndex === index ? Colors.tint : Colors.darkGrey;

                    return { backgroundColor, opacity };
                });

                return <Animated.View style={[styles.dot, animatedStyle]} key={index} />;
            })}
        </View>
    );
};

export default Pegination;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    dot: {
        backgroundColor: "#333",
        height: 8,
        width: 8,
        marginHorizontal: 2,
        borderRadius: 8,
    },
});
