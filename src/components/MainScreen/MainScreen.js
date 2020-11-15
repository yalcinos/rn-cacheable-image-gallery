import React, { useState } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";
import HeaderContainer from "../Header/HeaderContainer";
export const MainScreen = () => {
  const [images, setImages] = useState([]);
  return (
    <Container>
      <HeaderContainer />
      <Content>
        <Card>
          <CardItem header>
            <Text>NativeBase</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>//Your text here</Text>
            </Body>
          </CardItem>
          <CardItem footer>
            <Text>GeekyAnts</Text>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};
export default MainScreen;
