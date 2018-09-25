import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import firebase from 'firebase';
import { AppNavigation } from './src/navigation/AppNavigation';
import {THEME_COLOR} from "./src/lib/Constants";

export default class App extends React.Component {

  componentWillMount() {
    // Initialize Firebase
    const config = {
      apiKey: "AIzaSyDXQtmRhiNLQq0qF5ctIHsdE6icWY4LlLg",
      authDomain: "degroof-14857.firebaseapp.com",
      databaseURL: "https://degroof-14857.firebaseio.com",
      projectId: "degroof-14857",
      storageBucket: "degroof-14857.appspot.com",
      messagingSenderId: "239043040319"
  
    };
    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle='light-content'/>}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <AppNavigation />
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: THEME_COLOR
  },
});