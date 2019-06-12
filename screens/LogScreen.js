import React from 'react';
import { SafeAreaView, Button, AsyncStorage, Text } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

/**
 * @author Alejandro Perez
 * @version 12/06/2019
 */
export default class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Log'
    }

    state = {
        workouts: [],
    }

    /**
     * Searches for workouts locally and puts them into the screen state.
     */
    _retrieveWorkouts = async () => {
        let id = 0;
        let workout;

        //Iterate over all the workouts and add them to the state.
        do {
            workout = await AsyncStorage.getItem(`${id}`);
            this.setState({workouts: [...this.state.workouts, JSON.parse(workout)]});
            i++;
        } while (workout !== null)
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('backToLog', () => this._retrieveWorkouts());
    }

    render() {
        return (
            <SafeAreaView>
                <Button title='Start Workout' onPress={() => this.props.navigation.navigate('Main')} />
            </SafeAreaView>
        )
    }
}