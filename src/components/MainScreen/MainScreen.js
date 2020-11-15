import React, { useRef, useEffect, useState } from "react";
import { Container, Content, Text, Body } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import HeaderContainer from "../Header/HeaderContainer";
import { fetchImagesFromAPI } from "../../apis/api";
import { View, Dimensions, StyleSheet, Platform } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

export const MainScreen = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);
  console.log(images);
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await fetchImagesFromAPI();
    const imageList = response.data;
    setImages(imageList);

    if (response !== undefined || response != null) {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.url }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={images}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
});
