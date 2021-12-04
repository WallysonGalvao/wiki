import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/core";

import { RootRouteProps } from "../../routes";

const Detail = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute<RootRouteProps<"Detail">>();
  const { character } = params;

  const handleBack = () => goBack();

  return (
    <SafeAreaView>
      <Text style={styles.name}>{character.name}</Text>
      <View style={styles.content}>
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
        <View style={styles.infoTable}>
          <Text style={styles.tableText}>
            Gender: <Text style={styles.tableValue}>{character.gender}</Text>
          </Text>
          <Text style={styles.tableText}>
            Location:{" "}
            <Text style={styles.tableValue}>{character.location.name}</Text>
          </Text>
          <Text style={styles.tableText}>
            Origin:{" "}
            <Text style={styles.tableValue}>{character.origin.name}</Text>
          </Text>
          <Text style={styles.tableText}>
            Species: <Text style={styles.tableValue}>{character.species}</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  content: {
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
    alignSelf: "center",
  },
  badge: {
    width: 200,
    padding: 5,
    marginTop: 5,
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
    textAlign: "center",
  },
  infoTable: {
    width: 200,
    marginTop: 5,
  },
  tableText: {
    fontWeight: "bold",
    marginVertical: 2,
  },
  tableValue: {
    fontWeight: "normal",
  },
});
