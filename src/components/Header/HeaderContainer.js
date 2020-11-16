import React from "react";
import { Header, Body, Title } from "native-base";
import { StyleSheet } from "react-native";

const HeaderContainer = () => {
  return (
    <Header style={styles.container}>
      <Body>
        <Title>Gallery App</Title>
      </Body>
    </Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8bcdcd",
  },
});

export default HeaderContainer;
