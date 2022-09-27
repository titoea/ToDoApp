import { View, Text, StyleSheet, Pressable } from "react-native";
export default function ToDoItem({ content, state, onPress }) {
  const complete = state === "complete";
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          styles.itemContainer,
          complete ? styles.complete : styles.incomplete,
        ]}
      >
        <Text style={styles.text}> {content}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: "#ffc299",
    marginBottom: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ffc299",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 3,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  text: {
    fontSize: 16,
  },
  complete: {
    opacity: 0.5,
  },
  incomplete: {
    opacity: 1,
  },
});
