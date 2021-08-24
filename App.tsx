import { StatusBar } from "expo-status-bar";
import React, { MutableRefObject, RefObject, useRef, useState } from "react";
import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import {
  Transition,
  Transitioning,
  TransitioningView,
} from "react-native-reanimated";

import data from "./data";

interface Props {
  transitionRef: RefObject<TransitioningView>;
}

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

export default function App({}: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const ref = useRef(null) as RefObject<TransitioningView> | null;

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={styles.container}
    >
      {data.map(
        ({ backgroundColor, color, category, subCategories }, index) => {
          return (
            <TouchableNativeFeedback
              key={category}
              onPress={() => {
                ref?.current?.animateNextTransition();
                setCurrentIndex(index === currentIndex ? -1 : index);
              }}
              style={styles.cardContainer}
            >
              <View style={[styles.card, { backgroundColor }]}>
                <Text style={[styles.heading, { color }]}>{category}</Text>
                {index === currentIndex && (
                  <View style={[styles.subCategories]}>
                    {subCategories.map((subCategory) => {
                      return (
                        <Text
                          key={subCategory}
                          style={[styles.body, { color }]}
                        >
                          {subCategory}
                        </Text>
                      );
                    })}
                  </View>
                )}
              </View>
            </TouchableNativeFeedback>
          );
        }
      )}
      <StatusBar style="auto" />
    </Transitioning.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardContainer: {
    flexGrow: 1,
  },
  card: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 38,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: -2,
  },
  subCategories: {
    marginTop: 20,
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    textAlign: "center",
  },
});
