import { ScrollView, StyleSheet, Text, View } from "react-native";
import Deck from "./src/Deck";
import { Card, Button } from "react-native-elements";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_flow.png.webp?itok=CKgs2Lws",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://abduzeedo.com/sites/default/files/styles/square_1x1/public/originals/hero_ism.jpg?itok=cHdv_lzV",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_izi.png.webp?itok=JhiXazsV",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://abduzeedo.com/sites/default/files/styles/square_1x1/public/originals/hero_vhs.png?itok=ChOh8UMD",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://abduzeedo.com/sites/default/files/styles/square_1x1/public/originals/hero_recreio.png?itok=TvAjiAAP",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://abduzeedo.com/sites/default/files/styles/square_1x1/public/originals/hero_adobe-a.jpg?itok=v4GEntyB",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://abduzeedo.com/sites/default/files/styles/square_1x1/public/originals/hero_mutante.png?itok=5fiDnhFY",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://abduzeedo.com/sites/default/files/styles/square_1x1/public/originals/hero_pearl.jpg?itok=ZT42XbJ1",
  },
];

export default function App() {
  const renderCard = (item) => {
    return (
      <Card key={item.id}>
        <Card.Image
          source={{
            uri: item.uri,
          }}
        ></Card.Image>
        <Card.Title>{item.text}</Card.Title>
        <Text style={styles.cardText}>Custom Card</Text>
        <Button icon={{ name: "code" }} backgroundColor='blue' title='View' />
      </Card>
    );
  };

  const renderNoMoreCards = () => {
    return (
      <Card>
        <Card.Title>All Done</Card.Title>
        <Text style={styles.cardText}>There's no more content here!</Text>
        <Button backgroundColor='blue' title='Get more!' />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Deck
          data={DATA}
          renderCard={renderCard}
          renderNoMoreCards={renderNoMoreCards}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardText: {
    marginBottom: "10px",
  },
});
