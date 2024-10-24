import { forwardRef, useCallback } from "react";
import { FlatList, ViewToken } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import ListItem from "./list-item/ListItem";

export type Page = {
  component: React.ReactNode;
};

interface AnimatedFlatListProps {
  pages: Page[];
  scrollEnabled?: boolean;
  setCurrentIndex?: (value: number) => void;
}

const AnimatedFlatList = forwardRef<FlatList<Page>, AnimatedFlatListProps>(
  ({ pages, scrollEnabled, setCurrentIndex }: AnimatedFlatListProps, ref) => {
    const x = useSharedValue(0);

    const onViewableItemsChanged = useCallback(
      ({ viewableItems }: { viewableItems: ViewToken[] }) => {
        if (setCurrentIndex) setCurrentIndex(viewableItems[0].index ?? 0);
      },
      []
    );

    const scrollHandle = useAnimatedScrollHandler({
      onScroll: (event) => {
        x.value = event.contentOffset.x;
      },
    });

    const renderItem = useCallback(
      ({ item, index }: { item: any; index: number }) => {
        return <ListItem item={item} index={index} x={x} />;
      },
      [x]
    );

    return (
      <Animated.FlatList
        ref={ref}
        onScroll={scrollHandle}
        horizontal
        scrollEventThrottle={16}
        pagingEnabled={true}
        data={pages}
        keyExtractor={(_, index) => index.toString()}
        bounces={false}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        scrollEnabled={scrollEnabled}
      />
    );
  }
);

export default AnimatedFlatList;
