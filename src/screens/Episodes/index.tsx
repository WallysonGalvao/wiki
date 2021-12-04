import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "../../components/Card";
import Picker from "../../components/Picker";

import api from "../../services";
import { Character, Episode } from "../../types/common";
import { EpisodesResponse } from "../../types/response";

const Episodes = () => {
  const [episodeId, setEpisodeId] = useState(5);
  const [episode, setEpisode] = useState<Episode>({} as Episode);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const callEpisodes = async () => {
    const { data } = await api.get<EpisodesResponse>("episode");
    if (data) setEpisodes(data.results);
  };

  const callEpisodeAndCharacters = async () => {
    const { data } = await api.get<Episode>(`episode/${episodeId}`);
    if (data) {
      const promises = data.characters.map((url) => api.get<Character>(url));
      const charactersResult = await Promise.all(promises).then((response) =>
        response.map((res) => res.data)
      );
      setEpisode(data);
      setCharacters(charactersResult);
    }
  };

  useEffect(() => {
    callEpisodes();
  }, []);

  useEffect(() => {
    callEpisodeAndCharacters();
  }, []);

  useEffect(() => {
    callEpisodeAndCharacters();
  }, [episodeId]);

  const keyExtractor = (item: Character) => item.id.toString();

  const renderHeader = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerEpisode}>
            Episode name:{" "}
            <Text style={styles.headerEpisodeName}>{episode?.name}</Text>
          </Text>

          <Text style={styles.headerAirDate}>
            Air date:<Text>{episode?.air_date}</Text>
          </Text>
        </View>
        <Picker
          data={episodes}
          label="Pick Episode"
          selectedValue={episodeId}
          onValueChange={setEpisodeId}
        />
      </>
    );
  };

  const renderItem = ({ item }: { item: Character }) => (
    <Card character={item} />
  );

  return (
    <SafeAreaView edges={["left", "right"]} style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Episodes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  columns: {
    justifyContent: "space-around",
  },
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  headerEpisode: {
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  headerEpisodeName: {
    color: "#0b5ed7",
    fontWeight: "bold",
  },
  headerAirDate: {},
});
