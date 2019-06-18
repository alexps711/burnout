import React from 'react';
import { SafeAreaView, Button, AsyncStorage, Text, FlatList } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { ListItem } from 'native-base';
import WorkoutCard from '../components/WorkoutCard';

/**
 * @author Alejandro Perez
 * @version 12/06/2019
 */
export default class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Log'
    };

    state = {
        workouts:[],
        changed: false
    };

    /**
     * Searches for workouts locally and puts them into the screen state.
     */
    _retrieveWorkouts = async () => {
        let id = 0;
        let workout;

        //Iterate over all the workouts and add them to the state.
        do {
            workout = await AsyncStorage.getItem(`${id}`);
            this.setState({workouts: new Set([...this.state.workouts, JSON.parse(workout)])});
            id++;
        } while (workout !== null)
        this.setState({changed: !this.state.changed});
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('backToLog', () => this._retrieveWorkouts());
    }

    render() {
        let {workouts, changed} = this.state;
        return (
            <SafeAreaView>
                <Button title='Start Workout' onPress={() => this.props.navigation.navigate('Main')} />
                <FlatList data={workouts} extraData={changed} renderItem={({item}) => 
                    <WorkoutCard content={item.key} />} 
                />
            </SafeAreaView>
        )
    }
}