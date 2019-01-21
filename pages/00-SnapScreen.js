//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,StatusBar } from 'react-native';
import Camera from '../components/Camera'

// create a component
class SnapScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="blue"
                    barStyle="light-content"
                />
                <Camera />
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
});

//make this component available to the app
export default SnapScreen;
