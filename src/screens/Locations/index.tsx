import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Card from "../../components/Card";
import Picker from "../../components/Picker";

import api from "../../services";
import { Character, Location } from "../../types/common";
import { LocationsResponse } from "../../types/response";

const Locations = () => {
  const [locationId, setLocationId] = useState(5);
  const [location, setLocation] = useState<Location>({} as Location);
  const [locations, setLocations] = useState<Location[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  const callLocations = async () => {
    const { data } = await api.get<LocationsResponse>("location");
    if (data) setLocations(data.results);
  };

  const callLocationAndCharacters = async () => {
    const { data } = await api.get<Location>(`location/${locationId}`);
    if (data) {
      const promises = data.residents.map((url) => api.get<Character>(url));
      const charactersResult = await Promise.all(promises).then((response) =>
        response.map((res) => res.data)
      );
      setLocation(data);
      setCharacters(charactersResult);
    }
  };

  useEffect(() => {
    callLocations();
  }, []);

  useEffect(() => {
    callLocationAndCharacters();
  }, []);

  useEffect(() => {
    callLocationAndCharacters();
  }, [locationId]);

  const keyExtractor = (item: Character) => item.id.toString();

  const renderHeader = () => {
    return (
      <>
        <View style={styles.headerContainer}>
          <Text style={styles.headerLocation}>
            Location:{" "}
            <Text style={styles.headerLocationName}>{location?.name}</Text>
          </Text>

          <Text style={styles.headerAirDate}>
            Type:<Text>{location?.type}</Text>
          </Text>
        </View>
        <Picker
          data={locations}
          label="Pick Location"
          selectedValue={locationId}
          onValueChange={setLocationId}
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

export default Locations;

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
    marginTop: 10,
  },
  headerLocation: {
    marginVertical: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  headerLocationName: {
    color: "#0b5ed7",
    fontWeight: "bold",
  },
  headerAirDate: {},
});
