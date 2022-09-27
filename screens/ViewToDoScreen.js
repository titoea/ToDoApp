import { View, FlatList, StyleSheet, Alert } from "react-native";
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { ToDoItemsContext } from "../store/todoitems-context";
import IconButton from "../components/IconButton";
import ToDoItem from "../components/ToDoItem";

export default function ViewToDoScreen({navigation }) {
  const toDoItemsCtx = useContext(ToDoItemsContext);
  const isFocused = useIsFocused();

  const [state, setState] = useState("");

  //   const initialiseListofTodos = useCallback(() => {
  //     toDoItemsCtx.fetchToDoItems();
  //   }, [toDoItemsCtx]);

  useEffect(() => {
    toDoItemsCtx.fetchToDoItems();
    //   if(isFocused){
    //     //toDoItemsCtx.fetchToDoItems();
    //   }
  }, []);

  function onAddIconHandler() {
    navigation.navigate("AddToDo");
  }

  function onEditButtonHandler(id) {
    navigation.navigate("AddToDo", {
      itemId: id,
    });
  }

  function onCompleteButtonHandler(id) {
    toDoItemsCtx.updateToDoItem(id, "state", "complete");
    setState("complete");
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton onPress={onAddIconHandler} icon="add" color="black" />
        );
      },
    });
  }, []);

  function onPressItemHandler(id) {
    const index = toDoItemsCtx.todos.findIndex((item) => item.id === id);
    const state = toDoItemsCtx.todos[index].state;
    setState(state);

    Alert.alert("Options", "Choose an option", [
      { text: "Completed", onPress: () => onCompleteButtonHandler(id) },
      { text: "Edit", onPress: () => onEditButtonHandler(id) },
      { text: "Delete", onPress: () => toDoItemsCtx.deleteToDoItem(id) },
    ]);
  }

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={toDoItemsCtx.todos}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => {
          return (
            <ToDoItem
              content={itemData.item.content}
              state={itemData.item.state}
              onPress={() => onPressItemHandler(itemData.item.id)}
            />
          );
        }}
        extraData={state}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: 20,
  },
});
