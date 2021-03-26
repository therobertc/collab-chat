import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import * as firebase from "firebase";
import { Footer, Text, Input, Item } from "native-base";
import { Feather } from "@expo/vector-icons";

class GroupCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      loader: false
    };
  }

  async componentDidMount() {}

  render() {
    return (
      <View
        style={{
          backgroundColor: "white",
          height: 80,
          borderRadius: 40,
          //width: "100%",
          marginHorizontal: 20,
          marginVertical: 10,
          alignItems: "center",
          //justifyContent: "center",
          flexDirection: "row"
        }}
      >
        <View
          style={{
            backgroundColor: "darkgrey",
            height: 50,
            width: 50,
            borderRadius: 40,
            marginHorizontal: 30,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Feather
            style={{ color: "lightgrey" }}
            name="user"
            size={40}
            onPress={() => this.props.navigation.navigate("CreateGroup")}
          />
        </View>

        <Text style={{ fontSize: 20, fontWeight: "700" }}>@GROUPNAME</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default GroupCard;
