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

import GroupCard from "../components/GroupCard";

class HomePage extends Component {
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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{ flex: 1, backgroundColor: "#282c34" }}
      >
        <ScrollView>
          <View
            style={{
              marginTop: 50,
              marginBottom: 20,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Groups
            </Text>

            <Feather
              style={{ color: "white" }}
              name="plus"
              size={40}
              onPress={() => this.props.navigation.navigate("CreateGroup")}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("ChatFeed")}
          >
            <GroupCard></GroupCard>
          </TouchableOpacity>

          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
              display: "flex",
              flexDirection: "row",
              paddingHorizontal: 20,
              justifyContent: "space-between"
            }}
          >
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
              Private Messages
            </Text>

            <Feather
              style={{ color: "white" }}
              name="plus"
              size={40}
              onPress={() => this.props.navigation.navigate("CreateGroup")}
            />
          </View>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <GroupCard></GroupCard>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});

export default HomePage;
