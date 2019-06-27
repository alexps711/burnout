import React from 'react';
import { ScrollView, FlatList, Text, StyleSheet, Button, AsyncStorage, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ListItem } from 'native-base';
import { EventRegister } from 'react-native-event-listeners';
import Swipeable from 'react-native-swipeable';

/**
 * @author Alejandro Perez
 * @version 27/06/2019
 */
export default class MusclesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Muscles",
        headerRight: <Button title="Add" onPress={() => navigation.navigate('Modal')} />
    });

    constructor(props) {
        super(props);
        this.state = {
            //Muscles rendered by default when no custom ones are added.
            muscles: [
                { key: 'Chest' },
                { key: 'Back' },
                { key: 'Abs' },
                { key: 'Biceps' },
                { key: 'Triceps' },
            ]
        };
    }

    componentDidMount() {
        this._updateMusclesList();
        // Listens for when the user wants to add a new muscle group.
        this.listener = EventRegister.addEventListener('updateMuscles', async (data) => {
            //Update the muscles list in the storage with the new data.
            await AsyncStorage.setItem('muscles', JSON.stringify([...this.state.muscles, { key: data }]));
            this._updateMusclesList();
        });
    }

    componentWillUnmount() {
        //Remove the listener before moving to another screen.
        EventRegister.removeEventListener(this.listener);
    }

    /**
     * Sets the state to the current muscles list in the storage.
     */
    _updateMusclesList = async () => {
        try {
            const musclesList = await AsyncStorage.getItem('muscles');
            //Might be redundant -- CHECK
            if (musclesList !== null) {
                this.setState({ muscles: JSON.parse(musclesList) });
            }
        } catch (error) {
            console.log(err);
        }
    };

    render() {
        let { muscles } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <FlatList
                        data={muscles}
                        renderItem={({ item }) =>
                            <Swipeable leftContent={(<Text>Pull to activate</Text>)} rightButtons={[
                                <TouchableHighlight><Text>Remove</Text></TouchableHighlight>,
                            ]}>
                                {/* Pass the muscle group selected to the next screen and navigate to it. */}
                                <ListItem onPress={() => this.props.navigation.navigate('SelectedMuscleScreen', { 'name': item.key })}>
                                    <Text style={styles.item}>{item.key}</Text>
                                </ListItem>
                            </Swipeable>}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        fontSize: 20
    }
});