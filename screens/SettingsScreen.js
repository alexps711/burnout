import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

/**
 * @author Alejandro Perez
 * @version 1.0.0
 */
export default class SettingsScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Settings -- Yet to implement!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});