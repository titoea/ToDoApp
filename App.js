import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddToDoScreen from "./screens/AddToDoScreen";
import ViewToDoScreen from "./screens/ViewToDoScreen";
import ToDoItemsContextProvider from "./store/todoitems-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ToDoItemsContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ViewToDo">
          <Stack.Screen name="ViewToDo" component={ViewToDoScreen}/>
          <Stack.Screen name="AddToDo" component={AddToDoScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ToDoItemsContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
