import React from 'react';
import {View, TextInput, StyleSheet, Button, AsyncStorage } from 'react-native';

/**
 * @author Alejandro Perez
 * @version 1.0.0
 */
export default class AuthScreen extends React.Component {

    _signIn = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
    };

    render() {
        return(
            <View style={styles.container}>
                <Button title="Submit" onPress={() => this._signIn()} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});