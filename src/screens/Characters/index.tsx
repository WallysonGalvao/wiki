import React, { useEffect, useLayoutEffect, useReducer, useState } from "react";
import { Button, FlatList, StyleSheet, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

import Card from "../../components/Card";
import Detail from "../../components/Detail";

import api from "../../services";
import { Character } from "../../types/common";
import { CharactersResponse } from "../../types/response";

type CharacterParams = {
  page: number;
  name: string;
  status: string;
  gender: string;
  species: string;
};

const initialState = {} as CharacterParams;

type Reducer = {
  key: keyof CharacterParams;
  value: string | number;
};

const reducer = (state: CharacterParams, { key, value }: Reducer) => ({
  ...state,
  [key]: value,
});

const Characters = () => {
  const { setOptions } = useNavigation();
  const [params, setParams] = useReducer(reducer, initialState);
  const [isModalVisible, setModalVisible] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );

  const callCharacters = async (name = "") => {
    console.log("callCharacters:: " + JSON.stringify(name));
    const { data } = await api.get<CharactersResponse>("character", {
      params: { ...params, page: 1, name },
    });
    if (data) setCharacters(data.results);
  };

  const callMoreCharacters = async (page: number) => {
    console.log("callMoreCharacters:: " + JSON.stringify(params));
    const { data } = await api.get<CharactersResponse>("character", {
      params: { ...params, page },
    });
    if (data) setCharacters((prevState) => [...prevState, ...data.results]);
  };

  const onEndReached = () => {
    const { page } = params;
    setParams({ key: "page", value: page + 1 });
    callMoreCharacters(page + 1);
  };

  const onChangeSearch = (value: string) => {
    setParams({ key: "name", value });
    callCharacters(value);
  };

  const handleFilter = () => {
    console.log("Filter");
  };

  useEffect(() => {
    callCharacters();
  }, []);

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => <Button onPress={handleFilter} title="Filters" />,
    });
  }, []);

  const keyExtractor = (item: Character) => item.id.toString();

  const renderItem = ({ item }: { item: Character }) => (
    <Card
      character={item}
      setSelectedCharacter={setSelectedCharacter}
      setModalVisible={setModalVisible}
    />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(value) => onChangeSearch(value)}
        value={params.name}
        placeholder="Search for characters"
        returnKeyType="search"
        onSubmitEditing={() => onChangeSearch(params.name)}
      />
      <FlatList
        data={characters}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReachedThreshold={1}
        onEndReached={onEndReached}
        numColumns={2}
        columnWrapperStyle={styles.columns}
        showsVerticalScrollIndicator={false}
      />
      {!!selectedCharacter && (
        <Detail
          character={selectedCharacter}
          isVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
};

export default Characters;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
  },
  columns: {
    justifyContent: "space-around",
  },
  input: {
    marginHorizontal: 20,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: "#0b5ed7",
  },
});
