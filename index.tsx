import React from "react";
import { Text, View, StyleSheet } from "react-native";
import FilterContainer from "./src/index";

const App = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text>Sample Module: Single select</Text>
      <View style={{ marginTop: 10 }}>
        <FilterContainer />
      </View>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    alignItems: "center",
  },
});
