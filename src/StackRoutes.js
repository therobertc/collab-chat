import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CreateGroup from "./components/CreateGroup";
import Home from "../Home";
import HomePage from "./screens/HomePage";
import ChatFeed from "./screens/ChatFeed";
import GroupProfile from "./screens/GroupProfile";

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCqA2hxmu1SK1yeBevBcqT6Cgqf80NVnwg",
  authDomain: "collab-ae69b.firebaseapp.com",
  databaseURL: "https://collab-ae69b.firebaseio.com",
  projectId: "collab-ae69b",
  storageBucket: "collab-ae69b.appspot.com",
  messagingSenderId: "599958094526",
  appId: "1:599958094526:web:931af7559a8936b98394ef",
  measurementId: "G-6ZTZQ0VVRX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const MainNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Signup: { screen: Signup },
    HomePage: { screen: HomePage },
    ChatFeed: { screen: ChatFeed },
    CreateGroup: { screen: CreateGroup },
    GroupProfile: { screen: GroupProfile },
    Home: { screen: Home }
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false
    }
  }
);

const Routes = createAppContainer(MainNavigator);

export default Routes;

// e62d646191c14a79a7fb6c05280af2bc
