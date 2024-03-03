import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { COLORS, FONTS } from "../../constants";

const Button = ({ title, onPress, style, isLoading }) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={COLORS.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    height: 55,

    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    ...FONTS.medium,
    color: COLORS.black,
  },
});

export default Button;
