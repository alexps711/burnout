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
    static navigationOptions = {
        title: "Muscles",
    };

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
                { key: 'Legs'},
                { key: 'Shoulders'}
            ]
        };
    }

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