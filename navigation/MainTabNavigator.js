import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Ionicons} from '@expo/vector-icons';
import SettingsScreen from '../screens/SettingsScreen';
import WorkoutStack from './WorkoutStack';

export default createBottomTabNavigator({
    Workout: WorkoutStack,
    Settings: SettingsScreen,
},
{
    defaultNavigationOptions: ({navigation}) => ({
        tabBarIcon: () => {
            const {routeName} = navigation.state;
            let IconComponent = Ionicons;
            let iconName;

            if(routeName === "Workout"){
                iconName = 'ios-fitness';
            }
            else if(routeName === "Settings"){
                iconName = 'ios-settings';
            }

            return <IconComponent name={iconName} size={25} />;
        }
    })
});