import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SnapScreen from './pages/00-SnapScreen'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SnapScreen />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
