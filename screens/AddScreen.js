import React from 'react';
import { View, Button, StyleSheet, TextInput } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

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
        EventRegister.emit('updateMuscles', data);
        this.props.navigation.goBack();
    };

    render() {
        let { input } = this.state;
        return(
            <View style={styles.container}>
                <TextInput  placeholder='Type a muscle group' value={input} onChangeText={(text) => this.setState({input: text})}/>
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
    }
});