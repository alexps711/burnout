import React from 'react';
import { SafeAreaView, Button, AsyncStorage, Text } from 'react-native';

export default class LogScreen extends React.Component {

    state = {
        workout: '',
    }

    _retrieveWorkouts = async () => {
        let date = new Date();
        let time = date.getDate();

        const workout = await AsyncStorage.getItem(`${time}`);
        console.log(workout);
        this.setState({workout: workout});
    }

    componentWillMount() {
        this._retrieveWorkouts();
    }

    render() {
        return (
            <SafeAreaView>
                <Button title='Start Workout' onPress={() => this.props.navigation.navigate('Main')} />
                <Text>{this.state.workout}</Text>
            </SafeAreaView>
        )
    }
}