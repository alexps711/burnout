import React from 'react';
import { SafeAreaView, ScrollView, FlatList, Text, StyleSheet, Button, AsyncStorage } from 'react-native';
import { ListItem } from 'native-base';
import { EventRegister } from 'react-native-event-listeners';

/**
 * @author Alejandro Perez
 * @version 27/06/2019
 */
export default class SelectedMuscleScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('name'),
        headerRight: <Button title="Add" onPress={() => navigation.navigate('Modal')} />
    });

    state = {
        exercises: this.getListData(this.props.navigation.getParam('name')),
    }
    componentDidMount() {
        this._updateExerciseList();
        // Listens for when the user wants to add a new muscle group.
        this.listener = EventRegister.addEventListener('updateExercises', async (data) => {
            //Update the muscles list in the storage with the new data.
            await AsyncStorage.setItem('exercises', JSON.stringify([...this.state.exercises, { key: data }]));
            this._updateExerciseList();
        });
    }

    componentWillUnmount() {
        //Remove the listener before moving to another screen.
        EventRegister.removeEventListener(this.listener);
    }

    /**
     * Sets the state to the current exercise list in the storage.
     */
    _updateExerciseList = async () => {
        try {
            const exerciseList = await AsyncStorage.getItem('exercises');
            //Might be redundant -- CHECK
            if (exerciseList !== null) {
                this.setState({ exercises: JSON.parse(exerciseList) });
            }
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * Navigate back to the Workout screen passing the excercise selected.
     * @param excercise the name of the excercise selected
     */
    _returnTo = (excercise) => {
        EventRegister.emit('goBack', excercise);
        this.props.navigation.popToTop();
    };

    /**
     * Returns an arrayList containing the exercises 
     * belonging to the selected muscle group.
     * @param {String} muscle the muscle group selected by the user
     */
    getListData(muscle) {
        switch (muscle) {
            case 'Back': return Back;
            case 'Chest': return Chest;
            case 'Abs': return Abs;
            case 'Biceps': return Biceps;
            case 'Triceps': return Triceps;
        };
    };

    render() {
        let { exercises } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <FlatList
                        data={exercises}
                        renderItem={({ item }) => <ListItem
                            onPress={() => this._returnTo(item.key)}>
                            <Text style={styles.item}>{item.key}</Text>
                        </ListItem>
                        }
                    />
                </ScrollView>
            </SafeAreaView>
        );
    };
}

var Back = [
    { key: 'Row' },
    { key: 'Lat pulldown' },
];

var Chest = [
    { key: 'Bench Press' },
    { key: 'Dumbbell Press' },
];

var Abs = [
    { key: 'Crunches' },
    { key: 'Leg Raises' },
    { key: 'Russian Twist' },
];

var Biceps = [
    { key: 'Curls' },
    {key: 'Hammer Curls' },
    { key: 'Incline Hammer Curls' },
];

var Triceps = [
    { key: 'Pushdowns' },
    { key: 'Close Grip Bench Press' },
    { key: 'Skull Crushers' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    item: {
        fontSize: 20
    }
});