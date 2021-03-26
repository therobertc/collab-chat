import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import * as firebase from "firebase";
import { Footer, Text, Input, Item, Button } from "native-base";
import { Feather } from "@expo/vector-icons";

import GroupCard from "../components/GroupCard";

class ChatFeed extends Component {
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
          <Feather
            style={{ color: "white" }}
            name="arrow-left"
            size={40}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "white" }}>
            ChatFeed
          </Text>

          <View
            style={{
              backgroundColor: "darkgrey",
              height: 40,
              width: 40,
              borderRadius: 20,
              //marginHorizontal: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Feather
              style={{ color: "lightgrey" }}
              name="user"
              size={30}
              onPress={() => this.props.navigation.navigate("GroupProfile")}
            />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>

        <KeyboardAvoidingView scrollEnabled={false}>
          <View
            style={{
              height: 100,
              backgroundColor: "#282c34",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingTop: 20,
              paddingBottom: 20
            }}
          >
            <Feather
              style={{ fontSize: 30, color: "#AAB8C2" }}
              name="dollar-sign"
              onPress={this.ShowHideComponent}
              //onPress={() => this.props.navigation.navigate("AddContacts")}
            />

            {/* <Text style={{ fontSize: 40 }}>$</Text> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                paddingRight: 5,
                borderWidth: 1,
                height: 40,
                borderRadius: 20,
                alignItems: "center",
                borderColor: "#AAB8C2"
              }}
            >
              <TextInput
                style={{
                  borderRadius: 20,
                  borderColor: "#AAB8C2",
                  borderWidth: 0,
                  fontSize: 20,
                  paddingLeft: 20,
                  backgroundColor: "#282c34",
                  color: "white"
                }}
                //multiline={true}
                placeholder="Message"
                placeholderTextColor="#AAB8C2"
                placeholderStyle={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              />
              <View>
                <Button
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#147efb"
                  }}
                >
                  <Feather
                    style={{ fontSize: 20, color: "white" }}
                    name="send"
                  />
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});

export default ChatFeed;
