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

class Login extends Component {
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
        this.props.navigation.navigate("HomePage");
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
          <View
            style={{
              marginTop: 150,
              marginBottom: 12,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
            }}
          >
            <View style={{ paddingBottom: 30 }}>
              <Image
                style={{
                  //flex: 1,
                  aspectRatio: Platform.OS === "ios" ? 4.0 : 3.0,
                  resizeMode: "contain",
                  height: 80,
                  width: 100
                }}
                source={require("../../assets/collabapp.png")}
              />
            </View>
          </View>
          <View>
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
                  placeholder="Email"
                  placeholderTextColor="white"
                  onChangeText={email => this.setState({ email })}
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
                  placeholder="Password"
                  secureTextEntry={true}
                  placeholderTextColor="white"
                  onChangeText={pass => this.setState({ pass })}
                />
              </Item>

              <View style={{ margin: 5 }}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("CreateGroup")}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "right",
                      color: "white",
                      fontWeight: "bold"
                    }}
                  >
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                {!this.state.loader ? (
                  <TouchableOpacity
                    onPress={this.Login}
                    style={{
                      backgroundColor: "#147efb",
                      padding: 15,
                      borderRadius: 5
                    }}
                  >
                    <Text style={{ textAlign: "center", color: "white" }}>
                      LOG IN
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <ActivityIndicator size="large" color="#0000ff" />
                )}
              </View>
              <View
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <View
                  style={{
                    bottom: 10,
                    borderBottomColor: "#dddddd",
                    borderBottomWidth: 1,
                    width: 155
                  }}
                />
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      width: 30,
                      color: "#dddddd",
                      alignSelf: "center"
                    }}
                  >
                    OR
                  </Text>
                </View>
                <View
                  style={{
                    bottom: 10,
                    width: 155,
                    borderBottomColor: "#dddddd",
                    borderBottomWidth: 1
                  }}
                />
              </View>
            </View>
          </View>
          <View>
            <Footer
              style={{ backgroundColor: "#282c34", borderColor: "#282c34" }}
            >
              <View
                style={{ display: "flex", flexDirection: "row", padding: 15 }}
              >
                <Text style={{ color: "#a1a1a1", fontSize: 14 }}>
                  Don’t have a Collab account yet?
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Signup")}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      marginLeft: 5,
                      fontWeight: "bold"
                    }}
                  >
                    Signup
                  </Text>
                </TouchableOpacity>
              </View>
            </Footer>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({});

export default Login;
