import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import {Signup} from './src/screens/authFlow';
import {Home} from './src/screens/appFlow';
import {RootSiblingParent} from 'react-native-root-siblings';

export default function App() {
  return (
    // <SafeAreaProvider style={{flex: 1}}>
    //   <Navigation />
    // </SafeAreaProvider>
    <RootSiblingParent>
      <Home />
      {/* <SafeAreaProvider style={{flex: 1}}>
        <Navigation />
      </SafeAreaProvider> */}
    </RootSiblingParent>
  );
}
