import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

import { Status, Species, Gender } from "../../types/common";
import { CharacterParams, Reducer } from "../../screens/Characters";

type FiltersProps = {
  isVisible: boolean;
  params: CharacterParams;
  setFiltersVisibile: (value: boolean) => void;
  setParams: ({ key, value }: Reducer) => void;
};

type SectionType = "status" | "gender" | "species";

type Section = {
  type: SectionType;
  data: Status[] | Species[] | Gender[];
};

type SelectedSection = {
  type: SectionType;
  value: string;
};

const status: Status[] = ["Alive", "Dead", "unknown"];
const gender: Gender[] = ["Female", "Male", "Genderless", "unknown"];
const species: Species[] = [
  "Human",
  "Alien",
  "Robot",
  "Animal",
  "Planet",
  "Unknown",
  "Disease",
  "Humanoid",
  "Cronenberg",
  "Mythological",
  "Poopybutthole",
];

const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const Filters = ({
  isVisible,
  params,
  setFiltersVisibile,
  setParams,
}: FiltersProps) => {
  const handleClerarFilters = () => {
    setParams({ ...params, key: "gender", value: "" });
    setParams({ ...params, key: "species", value: "" });
    setParams({ ...params, key: "status", value: "" });
  };

  const handleValue = ({ type, value }: SelectedSection) => {
    setParams({ key: type, value });
  };

  const Section = ({ type, data }: Section) => {
    return (
      <View style={{ padding: 3 }}>
        <Text style={styles.sectionTitle}>{capitalize(type)}</Text>

        <View style={styles.sectionContent}>
          {data.map((value) => {
            const isSelected = params[type] === value;
            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.sectionValue,
                  isSelected && { backgroundColor: "#0c63e4" },
                ]}
                onPress={() => handleValue({ type, value })}
              >
                <Text
                  style={[
                    styles.sectionTextValue,
                    isSelected && { color: "#FFFFFF" },
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setFiltersVisibile(false)}
      style={styles.modal}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.clearFilterContainer}
          onPress={handleClerarFilters}
        >
          <Text style={styles.clearFilterText}>Clear Filters</Text>
        </TouchableOpacity>
        <Section type="status" data={status} />
        <Section type="species" data={species} />
        <Section type="gender" data={gender} />
      </View>
    </Modal>
  );
};

export default Filters;

const styles = StyleSheet.create({
  modal: {
    alignItems: "center",
  },
  container: {
    backgroundColor: "#FFF",
    width: 300,
    borderRadius: 10,
  },
  clearFilterContainer: {
    alignSelf: "center",
    marginVertical: 5,
    padding: 5,
  },
  clearFilterText: {
    color: "#0c63e4",
  },
  sectionTitle: {
    padding: 15,
    color: "#0c63e4",
    backgroundColor: "#e7f1ff",
  },
  sectionContent: {
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionValue: {
    padding: 5,
    marginVertical: 7,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#0c63e4",
    borderRadius: 10,
  },
  sectionTextValue: {
    color: "#0c63e4",
  },
});
