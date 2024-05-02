import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.05 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

const Deck = ({
  data,
  renderCard,
  onSwipeRight = () => {},
  onSwipeLeft = () => {},
  renderNoMoreCards = () => {},
}) => {
  const oldData = useRef(data);
  const [index, setIndex] = useState(0);
  const pos = useRef(new Animated.ValueXY()).current;

  const resetPosition = useCallback(() => {
    Animated.spring(pos, {
      useNativeDriver: false,
      toValue: { x: 0, y: 0 },
    }).start();
  }, [pos]);

  useEffect(() => {
    if (oldData !== data) {
      setIndex(0);
      oldData.current = data;
    }
  }, []);

  useEffect(() => {
    console.log("index", index);
  }, [index]);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  });

  const onSwipeComplete = useCallback(
    (direction) => {
      const item = data[index];
      direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
      pos.setValue({ x: 0, y: 0 });
      console.log("track", index);
      setIndex(index + 1);
    },
    [index, onSwipeRight, onSwipeLeft, pos, data]
  );

  const forceSwipe = useCallback(
    (direction) => {
      const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
      Animated.timing(pos, {
        useNativeDriver: false,
        toValue: { x, y: 0 },
        duration: SWIPE_OUT_DURATION,
      }).start(() => onSwipeComplete(direction));
    },
    [pos, onSwipeComplete]
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        pos.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        console.log(gesture.dx, SWIPE_THRESHOLD);
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe("left");
        } else {
          resetPosition();
        }
      },
    })
  ).current;

  const posCardStyle = useMemo(() => {
    const rotate = pos.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"],
    });
    return { ...pos.getLayout(), transform: [{ rotate }] };
  }, [pos]);

  const renderCards = () => {
    if (index > data.length) return renderNoMoreCards();

    return data
      .map((item, i) => {
        if (i < index) return null;
        else if (i === index) {
          return (
            <Animated.View
              key={item.id}
              style={[posCardStyle, styles.cardStyle]}
              {...panResponder.panHandlers}
            >
              {renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={[styles.cardStyle, { top: 10 * (i - index) }]}
          >
            {renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  };

  return <View>{renderCards()}</View>;
};

const styles = StyleSheet.create({
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH,
  },
});
export default Deck;
