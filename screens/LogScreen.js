import React from 'react';
import { SafeAreaView, Button, AsyncStorage, Text, FlatList, StyleSheet, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Content } from 'native-base';
import WorkoutCard from '../components/WorkoutCard';

/**
 * @author Alejandro Perez
 * @version 1.0.0
 */
export default class LogScreen extends React.Component {
    static navigationOptions = {
        title: 'Log'
    };

    state = {
        workouts: [],
    };

    componentDidMount() {
        this._retrieveWorkouts();
        this.listener = EventRegister.addEventListener('backToLog', (newWorkout) => {
            this.setState({
                workouts: [...this.state.workouts, newWorkout],
            });
        });
    }

    componentWillUnmount() {
        EventRegister.removeEventListener(this.listener);
    }

    /**
     * Searches for workouts locally and puts them into the screen state.
     */
    _retrieveWorkouts = async () => {
        let id = 0;
        let workout;
        let workouts = [];
        try {

            while (workout !== null) {
                if (workout !== undefined) {
                    workouts.push(JSON.parse(workout));
                    id++;
                }
                workout = await AsyncStorage.getItem(`${id}`);
            }
            this.setState({ workouts: workouts });
        } catch (err) { console.log(err); }
    }

    render() {
        let { workouts } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Button title='Start Workout' onPress={() => this.props.navigation.navigate('Main')} />
                <Content padder>
                    {workouts.length === 0 ? <View style={styles.text}><Text>You haven't finished any workouts yet!</Text></View> :
                        <FlatList data={workouts} renderItem={({ item }) =>
                            <WorkoutCard title={item.key} startTime={item.startTime} exercises={item.exercises} />} />
                    }
                </Content>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 250
    }
});
