import { useCallback, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ToDoItemsContext = createContext({
  todos: [],
  addToDoItem: (item) => {},
  fetchToDoItems: () => {},
  updateToDoItem: (id, key, value) => {},
  deleteToDoItem: (id) => {},
});

export default function ToDoItemsContextProvider({ children }) {
  const [todos, setToDos] = useState([]);

  async function storeItems(arrayOfItems) {
    const todosStringified = JSON.stringify(arrayOfItems);
    await AsyncStorage.setItem("MY_TODOS", todosStringified);
  }

  async function retrieveItems(key) {
    const Raw = await AsyncStorage.getItem(key);
    if (Raw) {
      const Parsed = JSON.parse(Raw);
      return Parsed;
    }
  }

  const fetchToDoItems = async () => {
    const todosParsed = await retrieveItems("MY_TODOS");
    setToDos(todosParsed);
  };

  const addToDoItem = useCallback(
    (item) => {
      const newToDos = [item, ...todos];
      setToDos((currentToDoItems) => [item, ...currentToDoItems]);
      storeItems(newToDos);
    },
    [todos]
  );

  const updateToDoItem = useCallback( (id, key, value) => {
      const index = todos.findIndex((item) => item.id === id);
      if (index !== -1) {
        todos[index][key] = value;
      }
      setToDos(todos);
      storeItems(todos); 
    },
    [todos]
  );

  const deleteToDoItem = useCallback(
    (id) => {
      const newToDos = todos.filter((item) => item.id !== id);
      setToDos((currentToDoItems) =>
        currentToDoItems.filter((item) => item.id !== id)
      );
      storeItems(newToDos);
    },
    [todos]
  );

  const value = {
    todos: todos,
    fetchToDoItems: fetchToDoItems,
    addToDoItem: addToDoItem,
    updateToDoItem: updateToDoItem,
    deleteToDoItem: deleteToDoItem,
  };
  return (
    <ToDoItemsContext.Provider value={value}>
      {children}
    </ToDoItemsContext.Provider>
  );
}
