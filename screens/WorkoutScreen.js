import React from 'react';
import { Animated, FlatList, View, StyleSheet, Text, Button, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ListItem, Content } from 'native-base';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { EventRegister } from 'react-native-event-listeners'
import ExerciseCard from '../components/ExerciseCard';
import ActionButton from 'react-native-action-button';

/**
 * @author Alejandro Perez
 * @version 12/06/2019
 */
export default class WorkoutScreen extends React.Component {
    static navigationOptions = {
        title: 'Workout',
    };

    constructor(props) {
        super(props);
        this.state = {
            //Flips its value every time an exercise is selected.
            //Used to re-render the list of exercises.
            changed: false,
            //List containing the exercises selected.
            excercises: [],
            startTime: '',
            workoutStarted: false,
            //Keep track of the position if the timer.
            timerPosition: new Animated.ValueXY({ x: 400, y: 8 }),
        };
    };

    componentDidMount() {
        this._startWorkout();
        //Listen to new exercises added.
        this.listener = EventRegister.addEventListener('goBack', (data) => {
            this.setState({
                changed: !this.state.changed,
                //Add to the list of exercises the one selected by the user. 
                excercises: [...this.state.excercises, { key: data, sets: '0', reps: '0' }]
            });
        });
    };

    /**  Adjust the screen for the workout. */
    _startWorkout = () => {
        //Update position of the watch.
        this._moveWatch();

        //Keep track of start time.
        let date = new Date();
        let time = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`; //Formatted to get double digits with the minutes.

        //Update state
        this.setState({ workoutStarted: true });
        this.setState({ startTime: time });
    };

    /** Repositions the stopwatch. */
    _moveWatch = () => {
        Animated.spring(this.state.timerPosition, {
            toValue: { x: 200, y: 8 },
        }).start();
    };

    /** End the current workout and go back to the log screen */
    _finishWorkout = () => {
        this._saveWorkout();
        EventRegister.emit('backToLog');
        this.props.navigation.popToTop();
    }

    /** Save the workout locally, accessed by id. */
    _saveWorkout = async () => {
        let id = 0;
        
        try {
            //Increment id until a free one is found.
            while ( await AsyncStorage.getItem(`${id}`) !== null) {
                i++;
            }
            //Store the workout.
            await AsyncStorage.setItem(`${id}`, JSON.stringify(this.state.excercises));
        } catch (err) {
            //Do something.
        }
    }

    render() {
        let { timerPosition, startTime, changed, workoutStarted, excercises } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <ListItem><Text style={styles.listItem}>Start Time: {startTime}</Text></ListItem>
                    <Animated.View style={[styles.stopwatch, timerPosition.getLayout()]}>
                        <Stopwatch options={stopwatchStyle} start={workoutStarted} />
                    </Animated.View>
                </View>
                <View>
                    <Button title="Finish workout" onPress={() => this._finishWorkout()} />
                </View>
                <Content padder>
                    <FlatList data={excercises} extraData={changed} renderItem={({ item }) =>
                        <ExerciseCard content={item.key} />}
                    />
                </Content>
                <ActionButton style={{ position: 'absolute' }} buttonColor="rgba(0,76,60,1)" onPress={() => this.props.navigation.navigate('Muscles')} />
            </SafeAreaView>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    stopwatch: {
        position: 'absolute',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    excercise: {
        paddingTop: 20,
    },
    titleText: {
        fontSize: 25,
    },
    listItem: {
        fontSize: 20,
    },
});

const stopwatchStyle = {
    container: {
        backgroundColor: 'white',
        padding: 5
    },
    text: {
        fontSize: 20
    }
}

