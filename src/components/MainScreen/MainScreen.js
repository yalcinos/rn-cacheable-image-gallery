import React, { useRef, useEffect, useState } from "react";
import { Container, Content, Text, Grid } from "native-base";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import HeaderContainer from "../Header/HeaderContainer";
import { fetchImagesFromAPI } from "../../apis/api";
import { View, Dimensions, StyleSheet, Platform, Image } from "react-native";
import CachedImage from "./CachedImage";

const { width: screenWidth } = Dimensions.get("window");

export const MainScreen = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const carouselRef = useRef(null);
  // console.log(images);
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const response = await fetchImagesFromAPI();
    const imageList = response.data;
    setImages(imageList);
    if (response !== undefined || response != null) {
      setIsLoading(false);
      return;
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <CachedImage style={styles.image} uri={item.url} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return (
    <Container>
      <HeaderContainer />
      <Content style={styles.container}>
        <Grid style={styles.gridItem}>
          <Carousel
            ref={carouselRef}
            sliderWidth={screenWidth}
            sliderHeight={screenWidth}
            itemWidth={screenWidth - 60}
            data={images}
            renderItem={renderItem}
          />
        </Grid>
      </Content>
    </Container>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    position: "relative",
  },
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
    borderRadius: 20,
  },
  imageContainer: {
    flex: 1,
    // Prevent a random Android rendering issue
    marginBottom: Platform.select({ ios: 0, android: 1 }),
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 1,
  },
  gridItem: {
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 30,
  },
  title: {
    position: "absolute",
    // margin: "auto",
    textAlign: "center",
    width: "100%",
    bottom: "45%",
    fontSize: 20,
    transform: [{ rotate: "45deg" }],
  },
});
