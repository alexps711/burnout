import React from 'react';
import { SafeAreaView, Button, AsyncStorage, Text, FlatList, StyleSheet, View } from 'react-native';
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
        workouts: [],
        changed: false
    };

    /**
     * Searches for workouts locally and puts them into the screen state.
     */
    _retrieveWorkouts = async () => {
        let id = 0;
        let workout = await AsyncStorage.getItem(`${id}`);
        try {
            //Iterate over all the workouts and add them to the state.
            while(workout != null){
                this.setState({workouts: [...this.state.workouts, JSON.parse(workout)]});
                id++;
                workout = await AsyncStorage.getItem(`${id}`);
            }
            await this.setState({ changed: !this.state.changed });
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.listener = EventRegister.addEventListener('backToLog', () => this._retrieveWorkouts());
    }

    componentWillUnmount() {
        EventRegister.removeEventListener('backToLog');
    }

    render() {
        let { workouts, changed } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Button title='Start Workout' onPress={() => this.props.navigation.navigate('Main')} />
                {workouts.length === 0 ? <View><Text>Hello</Text></View> : <FlatList data={workouts} extraData={changed} renderItem={({ item }) =>
                    <WorkoutCard content={item.key} />} />}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
