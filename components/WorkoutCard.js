import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TextInput } from 'react-native';
import { Card, CardItem } from 'native-base';

/**
 * @author Alejandro Perez
 * @version 27/06/2019
 */
export default class WorkoutCard extends React.Component {
    static propTypes = {
        content: PropTypes.string.isRequired,
    };

    render() {
        const { content } = this.props;
        return (
            <Card on>
                <CardItem header>
                    <Text style={styles.titleText}>{content}</Text>
                </CardItem>
                <CardItem title >
                    <Text>Yet to implement!</Text>
                </CardItem>
            </Card >
        );
    };
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 25
    }
});