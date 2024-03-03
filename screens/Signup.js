import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { COLORS, FONTS, SIZES } from "../constants";
import { AntDesign } from "@expo/vector-icons";
import { icons } from "../constants/icons";
import { Ionicons } from "@expo/vector-icons";
import Input from "./components/Input";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Button from "./components/Button";

const Signup = () => {
  const [areas, setAreas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        let areaDatas = data.map((item) => {
          return {
            code: item.alpha2Code,
            item: item.translations.fr,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://flagsapi.com/${item.alpha2Code}/flat/64.png`,
          };
        });

        setAreas(areaDatas);
        if (areaDatas.length > 0) {
          let defautData = areaDatas.filter((a) => a.code == "CD");
          if (defautData) {
            setSelectedArea(defautData[0]);
            // console.log(defautData);
          }
        }
      });
  }, []);

  const handleInputChange = (value) => {
    console.log(value);
  };

  const renderAreaModal = () => {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{ paddingVertical: 16 }}
          onPress={() => {
            setSelectedArea(item);
            setModalVisible(false);
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: item.flag }}
                resizeMode="contain"
                style={{ height: 30, width: 30, marginRight: 10 }}
              />
              <Text style={{ ...FONTS.regular }}>{item.item}</Text>
            </View>
            <Text style={{ ...FONTS.regular, color: COLORS.text_gray }}>
              {item.callingCode}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                height: SIZES.height,
                width: SIZES.width,
                backgroundColor: COLORS.white,
                ...styles.container,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  width: 42,
                  height: 42,
                }}
              >
                <View>
                  <Ionicons name="close-outline" size={26} color="black" />
                </View>
              </TouchableOpacity>
              <View style={{ height: 55 }}>
                <Input
                  placeholder="Recherches le pays"
                  placeholderTextColor={COLORS.text_gray}
                  selectionColor={COLORS.black}
                  autoFocus={true}
                />
              </View>
              <FlatList
                data={areas}
                renderItem={renderItem}
                horizontal={false}
                heyExtractor={(item) => item.code}
                style={{ padding: 20, marginBottom: 20 }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.area}>
      <StatusBar hidden />
      <View style={styles.container}>
        <View style={{ flexDirection: "column", gap: 14 }}>
          <Text style={{ ...FONTS.h1 }}>
            Veuillez saisisser votre numéro de téléphone
          </Text>
          <Text
            style={{
              ...FONTS.regular,
              color: COLORS.text_gray,
            }}
          >
            Un code de vérification vous sera envoyé par SMS
          </Text>
          <View style={{ ...styles.inputContainer }}>
            <TouchableOpacity
              style={styles.selectFlagContainer}
              onPress={() => setModalVisible(true)}
            >
              <View style={{}}>
                <Image
                  source={{ uri: selectedArea?.flag }}
                  resizeMode="contain"
                  style={styles.flag}
                />
              </View>

              <View>
                <Text style={{ ...FONTS.regular }}>
                  {selectedArea?.callingCode}
                </Text>
              </View>
              <View>
                <AntDesign name="down" size={10} color={COLORS.text_gray} />
              </View>
            </TouchableOpacity>
            <Input
              placeholder="Numéro de téléphone"
              keyboardType="numeric"
              placeholderTextColor={COLORS.text_gray}
              selectionColor={COLORS.black}
              onChangeText={handleInputChange}
            />
          </View>
          <Button title="Press Me" isLoading={false} />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={{ ...FONTS.regular4, color: COLORS.text_gray }}>
            En contunuant sur l'app Taxi App, vous acceptez
          </Text>
          <Text
            style={{
              ...FONTS.regular,
              textDecorationColor: COLORS.black,
              textDecorationLine: "underline",
            }}
          >
            Les Termes et Conditions de Confidentialités
          </Text>
        </View>
      </View>
      {renderAreaModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    // alignItems: "center",
  },

  inputContainer: {
    flexDirection: "row",
    width: SIZES.width - 32,
    // marginVertical: 32,
    alignItems: "center",
    gap: 8,
  },
  selectFlagContainer: {
    height: 55,
    width: 120,
    backgroundColor: COLORS.clear_gray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 8,
    borderRadius: 5,
  },
  flag: {
    height: 30,
    width: 30,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 55,
    backgroundColor: COLORS.clear_gray,
    padding: 8,
    color: COLORS.black,
    borderRadius: 5,
    ...FONTS.regular,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    alignItems: "center",
  },
});

export default Signup;
