import { StyleSheet, View, Text, Dimensions } from "react-native";
import Signup from "./screens/Signup";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    // montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    // "montserrat-bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    // "montserrat-meduim": require("./assets/fonts/Montserrat-Medium.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Signup />;
}

const styles = StyleSheet.create({});
