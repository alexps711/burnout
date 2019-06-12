import React from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';

/**
 * @author Alejandro Perez
 * @version 12/06/2019
 */
export default class LoadingScreen extends React.Component {
    constructor(props){
        super(props);
        this._bootstrapAsync();
    }
    
    /**
     * Navigate to the Main stack if user already logged in.
     * Navigate to the login screen otherwise. 
     */
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    };

    render() {
        return(
            <View style={styles.container}>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});