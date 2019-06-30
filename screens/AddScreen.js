import React from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

/**
 * @author Alejandro Perez
 * @version 27/06/2019
 */
export default class AddScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add',
        headerLeft: <Button title='Back' onPress={() => navigation.goBack()} />
    });

    state = {
        input: '',
    };

    /**
     * Navigate back to MusclesScreen, emitting the data typed in by the user.
     * @param {string} data - the input typed in by the user.
     */
    _returnTo = (data) => {
        EventRegister.emit('updateExercise', data);
        this.props.navigation.goBack();
    };

    render() {
        let { input } = this.state;
        return(
            <View style={styles.container}>
                <TextInput  style={styles.input} placeholder='Type an exercise' value={input} onChangeText={(text) => this.setState({input: text})}/>
                <Button title='Submit' onPress={() => this._returnTo(input)} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontSize: 20
    }
});