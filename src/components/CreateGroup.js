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

class CreateGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      loader: false
    };
  }

  async componentDidMount() {}

  Login = () => {
    this.setState({ loader: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.pass)
      .then(data => {
        this.setState({ loader: false });
        this.props.navigation.navigate("Home");
      })
      .catch(error => {
        this.setState({ loader: false });
        Alert.alert("Try Again" + error);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : ""}
        style={{ flex: 1, backgroundColor: "#282c34" }}
      >
        <ScrollView>
          <View>
            <View
              style={{
                marginTop: 50,
                marginBottom: 20,
                display: "flex",
                flexDirection: "row",
                paddingHorizontal: 20
                //justifyContent: "space-between"
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
                  alignItems: "center",
                  paddingLeft: 50
                }}
              >
                Create Group
              </Text>
            </View>

            <View style={{ margin: 10, marginTop: 5 }}>
              <Item
                rounded
                style={{
                  borderWidth: 5,
                  borderRadius: 5,
                  margin: 5,
                  backgroundColor: "#545f70"
                }}
              >
                <Input
                  style={{ color: "white", fontSize: 14 }}
                  placeholder="Group Name"
                  placeholderTextColor="white"
                  //onChangeText={email => this.setState({ email })}
                />
              </Item>

              <Item
                rounded
                style={{
                  borderWidth: 5,
                  borderRadius: 5,
                  margin: 5,
                  backgroundColor: "#545f70"
                }}
              >
                <Input
                  style={{ color: "white", fontSize: 14 }}
                  placeholder="#GroupTag"
                  //secureTextEntry={true}
                  placeholderTextColor="white"
                  //onChangeText={pass => this.setState({ pass })}
                />
              </Item>

              <Item
                rounded
                multiline={true}
                style={{
                  borderWidth: 5,
                  borderRadius: 5,
                  margin: 5,
                  backgroundColor: "#545f70"
                }}
              >
                <Input
                  multiline={true}
                  style={{ color: "white", fontSize: 14, height: 100 }}
                  placeholder="Description"
                  //secureTextEntry={true}
                  placeholderTextColor="white"
                  //onChangeText={pass => this.setState({ pass })}
                />
              </Item>

              <View style={{ marginTop: 10 }}>
                {/* {!this.state.loader ? ( */}
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Home")}
                  style={{
                    backgroundColor: "#147efb",
                    padding: 15,
                    borderRadius: 5
                  }}
                >
                  <Text style={{ textAlign: "center", color: "white" }}>
                    CREATE GROUP
                  </Text>
                </TouchableOpacity>
                {/* ) : ( */}
                {/* <ActivityIndicator size="large" color="#0000ff" /> */}
                {/* )} */}
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});

export default CreateGroup;
