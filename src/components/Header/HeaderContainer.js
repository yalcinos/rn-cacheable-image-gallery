import React from "react";
import { Container, Header, Body, Title } from "native-base";
import { StyleSheet } from "react-native";

const HeaderContainer = () => {
  return (
    <Header style={styles.container}>
      <Body>
        <Title>Image asds</Title>
      </Body>
    </Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#9435",
  },
});

export default HeaderContainer;
