import { createStackNavigator } from 'react-navigation';
import WorkoutScreen from '../screens/WorkoutScreen';
import MusclesScreen from '../screens/MusclesScreen';
import SelectedMuscleScreen from '../screens/SelectedMuscleScreen';
import AddScreen from '../screens/AddScreen';
import LogScreen from '../screens/LogScreen';
import FinishedWorkoutScreen from '../screens/FinishedWorkoutScreen';

/**
 * @author Alejandro Perez
 * @version 1.0.0
 */

const MainStack = createStackNavigator({
    Main: WorkoutScreen,
    Muscles: MusclesScreen,
    SelectedMuscleScreen: SelectedMuscleScreen,
});

export default createStackNavigator({
    Log: LogScreen,
    FinishedWorkout: FinishedWorkoutScreen,
    Main: {
        screen: MainStack,
        //Avoid duplicate headers.
        navigationOptions: { header: null }
    },
    Modal: AddScreen
}, {
        mode: 'modal',
    });