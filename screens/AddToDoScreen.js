import { useContext, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, Text, Button } from "react-native";
import ToDoItem from "../models/ToDoItem";
import { ToDoItemsContext } from "../store/todoitems-context";

function createItem(content) {
  const id = Math.floor(Math.random() * 100).toString();
  const item = new ToDoItem(id, content, "incomplete");
  return item;
}

export default function AddToDoScreen({ route, navigation }) {
  const [enteredText, setEnteredText] = useState("");

  const toDoItemsCtx = useContext(ToDoItemsContext);

  const editToDoItemId = route.params?.itemId;

  const isEditing = !!editToDoItemId;

  function getEditItemContent() {
    const editItem = toDoItemsCtx.todos.find(
      (item) => item.id === editToDoItemId
    );
    return editItem.content;
  }

  useEffect(() => {
    if (isEditing) {
      setEnteredText(() => {
        const content = getEditItemContent();
        return content;
      });
    }
  }, [isEditing]);

  function textInputHandler(inputtedText) {
    setEnteredText(inputtedText);
  }

  function AddItemHandler() {
    if (!isEditing) {
      if (enteredText !== "") {
        const item = createItem(enteredText);
        toDoItemsCtx.addToDoItem(item);
      }
    } else {
      toDoItemsCtx.updateToDoItem(editToDoItemId, "content", enteredText);
    }
    navigation.navigate("ViewToDo");
    setEnteredText("");
  }

  return (
    <View style={styles.Container}>
      <Text style={styles.title}>Enter a To Do item</Text>
      <TextInput
        style={styles.inputContainer}
        onChangeText={textInputHandler}
        value={enteredText}
        multiline={true}
      />
      <Button title="Add item" onPress={AddItemHandler} color="#b35900"/>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title:{
    fontSize: 18
  },
  inputContainer: {
    width: 300,
    fontSize: 16,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    color: "black",
    marginVertical: 8,
    fontWeight: "bold",
  },
});
