import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Card, CardItem } from 'native-base';

/**
 * @author Alejandro Perez
 * @version 12/06/2019
 */
export default class ExerciseCard extends React.Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
        setsInput: PropTypes.func,
        repsInput: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.repsInputText = React.createRef();
    };

    render() {
        const { content, setsInput, repsInput } = this.props;
        return (
            <Card on>
                <CardItem header>
                    <Text style={styles.titleText}>{content}</Text>
                </CardItem>
                <CardItem title >
                    <TextInput style={styles.setsRepsInput} placeholder='0' keyboardType='numeric' setsInput onEndEditing={() => { this.repsInputText.current.focus(); }} />
                    <Text style={styles.setsRepsText}> Sets  </Text>
                    <TextInput style={styles.setsRepsInput} ref={this.repsInputText} placeholder='0' repsInput keyboardType='numeric' />
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