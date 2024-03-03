import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { COLORS, FONTS } from "../../constants";

const Input = ({ style, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <TextInput
      {...props}
      style={[styles.input, isFocused && styles.focusedInput, style]}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 55,
    backgroundColor: COLORS.clear_gray,
    padding: 8,
    color: COLORS.black,
    borderRadius: 5,
    ...FONTS.regular,
  },
  focusedInput: {
    borderColor: COLORS.black,
    borderWidth: 2,
  },
});

export default Input;
