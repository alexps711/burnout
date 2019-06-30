import React from 'react';
import { SafeAreaView, View, Text, Button, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import { ListItem, Content } from 'native-base';
import Swipeable from 'react-native-swipeable';
import ExerciseCard from '../components/ExerciseCard';

/**
 * @author Alejandro Perez Salas
 * @version 1.0.0
 */
export default class FinishedWorkoutScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Workout',
        headerLeft: <Button title="Back" onPress={() => navigation.popToTop()} />
    });

    constructor(props) {
        super(props);
        this.state = {
            startTime: this.props.navigation.getParam('startTime'),
            exercises: this.props.navigation.getParam('exercises'),
            title: this.props.navigation.getParam('title'),
        }
    }

    render() {
        let { startTime, exercises } = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <ListItem><Text style={styles.listItem}>Start time: {startTime}</Text></ListItem>
                <Content padder>
                    <FlatList data={exercises} renderItem={({ item }) =>
                        <Swipeable rightButtons={[<TouchableHighlight style={styles.removeButton}><Text style={styles.removeText}>Remove</Text></TouchableHighlight>]} onLeftActionRelease={() => console.log("hello")} >
                            <ExerciseCard content={item.key} sets={item.sets} reps={item.reps} />
                        </Swipeable>}
                    />
                </Content>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listItem: {
        fontSize: 20
    },
    removeButton: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    removeText: {
        paddingLeft: 5
    }
});