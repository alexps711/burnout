import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Card, CardItem } from 'native-base';
import {EventRegister} from 'react-native-event-listeners';

/**
 * @author Alejandro Perez
 * @version 1.0.0
 */
export default class ExerciseCard extends React.Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        sets: PropTypes.string,
        reps: PropTypes.string
    };

    constructor(props) {
        super(props);
        this.repsInputText = React.createRef();
        this.state = {
            key: this.props.content,
            sets: 0,
            reps: 0
        };
    }

    /**
     * Emits changes every time user updates number of sets or reps.
     * @param {String} type sets or reps.
     * @param {number} data the number of sets or reps.
     */
    async emitStats(type, data) {
        await this.setState({[type]: data});
        let exercise = {
            key: this.state.key,
            sets: this.state.sets,
            reps: this.state.reps
        };
        EventRegister.emitEvent('exerciseChange', exercise);
    }

    render() {
        const { content, sets, reps } = this.props;
        return (
            <Card on>
                <CardItem header>
                    <Text style={styles.titleText}>{content}</Text>
                </CardItem>
                <CardItem title >
                    <TextInput style={styles.setsRepsInput} onChangeText={(data) => this.emitStats('sets', data)} placeholder={sets} keyboardType='numeric' setsInput onEndEditing={() => { this.repsInputText.current.focus(); }}/>
                    <Text style={styles.setsRepsText}> Sets  </Text>
                    <TextInput style={styles.setsRepsInput} onChangeText={(data) => this.emitStats('reps', data)} ref={this.repsInputText} placeholder={reps} repsInput keyboardType='numeric' />
                    <Text style={styles.setsRepsText}> Reps</Text>
                </CardItem>
            </Card >
        );
    };
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 25
    },
    setsRepsText: {
        fontSize: 20,
    },
    setsRepsInput: {
        fontSize: 25,
        minWidth: 20,
    }, 
});