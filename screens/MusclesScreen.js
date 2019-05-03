import React from 'react';
import { View, ScrollView, FlatList, Text, StyleSheet, Button, AsyncStorage, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { ListItem } from 'native-base';
import { EventRegister } from 'react-native-event-listeners';
import Swipeable from 'react-native-swipeable';

export default class MusclesScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: "Muscles",
        headerRight: <Button title="Add" onPress={() => navigation.navigate('Modal')} />
    });

    constructor(props) {
        super(props);
        this.state = {
            // Tells the list to re-render.
            // Swaps its value when the user tries to add a muscle group to the list.
            changed: false,
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

    componentWillMount() {

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
        try {
            const musclesList = await AsyncStorage.getItem('muscles');
            if (musclesList !== undefined) {
                this.setState({ muscles: JSON.parse(musclesList) });
            }
        } catch (error) {
            //do something.
        }  
    };

    render() {
        let { muscles, changed } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <FlatList
                        data={muscles}
                        extraData={changed}
                        renderItem={({ item }) =>
                            <Swipeable leftContent={(<Text>Pull to activate</Text>)} rightButtons={[
                                <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
                                <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
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
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
});