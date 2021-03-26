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

class GroupProfile extends Component {
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
            <Feather
              style={{ color: "white" }}
              name="arrow-left"
              size={40}
              onPress={() => this.props.navigation.goBack()}
            />
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                color: "white",
                justifyContent: "center",
                alignItems: "center"
                //paddingHorizontal: 50
              }}
            >
              Group Profile
            </Text>

            <Feather
              style={{ color: "white" }}
              name="share"
              size={40}
              //onPress={() => this.props.navigation.push("ChatFeed")}
            />
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View
              style={{
                backgroundColor: "darkgrey",
                height: 100,
                width: 100,
                borderRadius: 50,
                //marginHorizontal: 20,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Feather
                style={{ color: "lightgrey" }}
                name="user"
                size={50}
                onPress={() => this.props.navigation.navigate("GroupProfile")}
              />
            </View>

            <View style={{ paddingTop: 20 }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 26,
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Group Name 💰
              </Text>
              <Text
                style={{ color: "grey", fontSize: 20, textAlign: "center" }}
              >
                100 Members
              </Text>
            </View>

            <View style={{ paddingVertical: 20, paddingHorizontal: 40 }}>
              <Text
                style={{ color: "grey", fontSize: 20, textAlign: "center" }}
              >
                We connect investors and traders with live news, alerts, data,
                and more.
              </Text>
            </View>
            <View
              style={{
                paddingVertical: 20,
                width: "100%",
                borderColor: "darkgrey",
                marginTop: 20,
                borderTopWidth: 1,
                borderBottomWidth: 1
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, textAlign: "center" }}
              >
                Members
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});

export default GroupProfile;
