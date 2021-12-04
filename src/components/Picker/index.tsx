import React from "react";
import { Text, StyleSheet } from "react-native";
import { Picker as RNPicker } from "@react-native-picker/picker";
import { Episode, Location } from "../../types/common";

type PickerProps = {
  data: Location[] | Episode[];
  label: string;
  selectedValue: number;
  onValueChange: (value: number) => void;
};

const Picker = ({ data, label, selectedValue, onValueChange }: PickerProps) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <RNPicker
        selectedValue={selectedValue}
        onValueChange={(value) => onValueChange(value)}
        itemStyle={styles.pickerItem}
      >
        {data?.map((d) => (
          <RNPicker.Item label={d.name} value={d.id} />
        ))}
      </RNPicker>
    </>
  );
};

export default Picker;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  pickerItem: {
    fontSize: 14,
  },
});
