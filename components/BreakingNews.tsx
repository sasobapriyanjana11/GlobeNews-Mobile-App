import { FlatList, StyleSheet, Text, View, ViewToken } from "react-native";
import { Colors } from "@/constants/Colors";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import { useEffect, useRef, useState } from "react";
import Animated, {
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue
} from "react-native-reanimated";
import Pegination from "@/components/Pegination";

type Props = {
    newsList: Array<NewsDataType>
};

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollX = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout | null>(null);
    const [width, setWidth] = useState(0);

    const onViewableItemChanged = ({
                                       viewableItems,
                                   }: {
        viewableItems: ViewToken[];
    }) => {
        if (
            viewableItems[0].index !== undefined &&
            viewableItems[0].index !== null
        ) {
            setPaginationIndex(viewableItems[0].index % newsList.length);
        }
    };

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 75,
    };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemChanged },
    ]);

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollX.value = e.contentOffset.x;
        },
    });

    // Automatically scroll every 5 seconds when autoplay is enabled
    useEffect(() => {
        if (isAutoPlay) {
            interval.current = setInterval(() => {
                scrollX.value = scrollX.value + width;
            }, 5000);
        } else {
            if (interval.current) {
                clearInterval(interval.current);
            }
        }

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        };
    }, [isAutoPlay, scrollX, width]);

    useDerivedValue(() => {
        // Ensure smooth scrolling with the calculated offset
        scrollTo(ref, scrollX.value, 0, true);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Breaking News</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_items${index}`}
                    renderItem={({ item, index }) => (
                        <SliderItem sliderItem={item} index={index} scrollx={scrollX} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    onEndReachedThrottle={0.5}
                    onEndReached={() => setData([...data, ...newsList])}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    onScrollBeginDrag={() => {
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={() => {
                        setIsAutoPlay(true);
                    }}
                    onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
                />
                <Pegination items={newsList} scrollX={scrollX} paginationIndex={paginationIndex} />
            </View>
        </View>
    );
};

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        justifyContent: 'center',
    },
});
