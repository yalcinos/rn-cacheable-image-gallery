import React, { useRef, useEffect, useState } from "react";
import { Container, Content, Text, Grid, Button } from "native-base";
import Carousel from "react-native-snap-carousel";
import HeaderContainer from "../Header/HeaderContainer";
import { fetchImagesFromAPI } from "../../apis/api";
import { View, Dimensions, StyleSheet, Platform, Image } from "react-native";
import CachedImage from "./CachedImage";

const { width: screenWidth } = Dimensions.get("window");

export const MainScreen = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reRenderImage, setReRenderImage] = useState(false);
  const carouselRef = useRef(null);

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
  /*
   * This recursive function shuffle array of image and update state
   */
  const randomImageList = (array, currentIndex) => {
    let tempValue, randomIndex;
    // Generates random number based on array length
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // Swap with current element
    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;

    //Recursive function:Call itself until iterate over all array.
    while (0 !== currentIndex) {
      return randomImageList(array, currentIndex);
    }
    setImages(array);
    //I created this state because, when clicking the button, it will re-render the CachedImage(child) component
    setReRenderImage(!reRenderImage);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <CachedImage
          key={index}
          style={styles.image}
          uri={item.url}
          reRender={reRenderImage}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    );
  };

  return isLoading === true ? (
    <Content>
      <Text>Loading...</Text>
    </Content>
  ) : (
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
        {/* If I shuffle 5000 images at the same time, sometimes I get call Maximum call stack size exceeded error.
        Because recursive function is working 5000 times and it causes stack overflow.
        I have tried to use setTimeout and Promise for using the event loop to store function in the event queue but this time app was frozen. 
        So, I decided to slice the array into a smaller piece. But If you wanna test it out you can remove comment for second button tag */}
        <Button
          style={styles.randomButton}
          onPress={() => randomImageList(images.slice(0, 1000), 1000)}
        >
          {/* <Button
          style={styles.randomButton}
          onPress={() => randomImageList(images, images.length)}
        > */}
          <Text style={styles.buttonText}>Random Order</Text>
        </Button>
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
    // Prevent a random Android rendering issue : It came with library
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
    textAlign: "center",
    width: "100%",
    bottom: "45%",
    fontSize: 20,
    transform: [{ rotate: "45deg" }],
  },
  randomButton: {
    marginTop: 30,
    backgroundColor: "#8bcdcd",
    marginLeft: "auto",
    marginRight: "auto",
    width: "70%",
    justifyContent: "center",
  },
  buttonText: {
    color: "#000",
  },
});
