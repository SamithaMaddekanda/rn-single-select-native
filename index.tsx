import React from "react";
import { Text, View, StyleSheet } from "react-native";

const App = () => {
  return (
    <View style={styles.sectionContainer}>
      <Text>Sample Module: Single select</Text>
    </View>
  );
};
export default App;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 200,
    alignItems: "center",
  },
});
