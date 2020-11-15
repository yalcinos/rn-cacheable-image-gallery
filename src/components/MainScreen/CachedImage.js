import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
//https://docs.expo.io/versions/latest/sdk/filesystem/
import * as FileSystem from "expo-file-system";

const CachedImage = (props) => {
  const [source, setSource] = useState({});
  useEffect(() => {
    cacheCheck();
  }, []);

  const cacheCheck = async () => {
    const { uri } = props;
    //shortash generate unique has id for long uri path.
    const shortName = shorthash.unique(uri);
    console.log(shortName);

    const path = `${FileSystem.cacheDirectory}${shortName}`;
    //Read from cache
    const image = await FileSystem.getInfoAsync(path);

    if (image.exists) {
      console.log("read image from cache");
      const uri = image.uri;
      setSource({ uri: uri });
      return;
    }
    console.log("downloading image to cache");
    //Add to cache
    const newImage = await FileSystem.downloadAsync(uri, path);
    const newUri = newImage.uri;
    setSource({ uri: newUri });
  };

  return <Image style={props.style} source={source} />;
};
export default CachedImage;
