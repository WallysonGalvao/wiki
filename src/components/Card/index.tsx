import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { Character } from "../../types/common";

type CardProps = {
  character: Character;
  setSelectedCharacter: (character: Character) => void;
  setModalVisible: (value: boolean) => void;
};

const Card = ({
  character,
  setSelectedCharacter,
  setModalVisible,
}: CardProps) => {
  const handleDetail = () => {
    setSelectedCharacter(character);
    setModalVisible(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleDetail}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View
        style={[
          styles.badge,
          character.status === "Alive" && styles.badgeAlive,
          character.status === "Dead" && styles.badgeDead,
        ]}
      >
        <Text style={styles.badgeText}>{character.status}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.lastLocation}>Last Location</Text>
        <Text>{character.location.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: "40%",
    borderWidth: 1,
    borderColor: "#0b5ed7",
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 154,
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: "center",
  },
  infoContainer: {
    marginLeft: 5,
    marginBottom: 5,
  },
  name: {
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
  },
  lastLocation: {
    marginVertical: 5,
    fontSize: 12,
  },
  badge: {
    top: 5,
    right: 5,
    position: "absolute",
    padding: 5,
    borderRadius: 5,
    backgroundColor: "gray",
  },
  badgeAlive: {
    backgroundColor: "green",
  },
  badgeDead: {
    backgroundColor: "red",
  },
  badgeText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
