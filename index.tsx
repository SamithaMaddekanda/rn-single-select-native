import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FilterContainer from "./src/index";

const FilterModule = () => {
  return (
    <View>
      <Text styles={{ textAlign: "center" }}>Sample Module: Single select</Text>
      <View style={{ marginTop: 10 }}>
        <FilterContainer />
      </View>
    </View>
  );
};
export default FilterModule;

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: "center",
  },
});
