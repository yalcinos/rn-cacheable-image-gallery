import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import shorthash from "shorthash";
//https://docs.expo.io/versions/latest/sdk/filesystem/
import * as FileSystem from "expo-file-system";

const CachedImage = ({ style, uri, reRender }) => {
  const [source, setSource] = useState({});

  //reRender is a state which is controlled by mainScreen.js for re-rendering images.
  useEffect(() => {
    cacheCheck();
  }, [reRender]);

  /*
   * This function check is image cached. If it is already cached, it will take from cache and render.
   * If it is not in the cache. It will upload to the cache store.
   */
  const cacheCheck = async () => {
    //shortash generate unique hashid for long uri path.
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
    //Downloading to cache
    const newImage = await FileSystem.downloadAsync(uri, path);
    const newUri = newImage.uri;
    setSource({ uri: newUri });
  };

  return <Image style={style} source={source} />;
};
export default CachedImage;
