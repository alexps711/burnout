import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Card, CardItem } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { EventRegister } from 'react-native-event-listeners';
import { withNavigation } from 'react-navigation';

/**
 * @author Alejandro Perez
 * @version 27/06/2019
 */
class WorkoutCard extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        startTime: PropTypes.string.isRequired,
        exercises: PropTypes.array.isRequired,
        onPress : PropTypes.func,

    };

    render() {
        const { title, exercises, startTime } = this.props;
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('FinishedWorkout', {title: title, exercises: exercises, startTime: startTime })}>
                <Card on>
                    <CardItem header>
                        <Text style={styles.titleText}>{title}</Text>
                    </CardItem>
                    <CardItem title >
                        <Text>Yet to implement!</Text>
                    </CardItem>
                </Card >
            </TouchableOpacity>
        );
    };
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 25
    }
});

export default withNavigation(WorkoutCard);