import { createStackNavigator } from 'react-navigation';
import WorkoutScreen from '../screens/WorkoutScreen';
import MusclesScreen from '../screens/MusclesScreen';
import SelectedMuscleScreen from '../screens/SelectedMuscleScreen';
import AddScreen from '../screens/AddScreen';

const MainStack = createStackNavigator({
    Main: WorkoutScreen,
    Muscles: MusclesScreen,
    SelectedMuscleScreen: SelectedMuscleScreen,
});

export default createStackNavigator({
    Main: {
        screen: MainStack,
        //Avoid duplicate headers.
        navigationOptions: {
            header: null,
        }
    },
    Modal: AddScreen
}, {
        mode: 'modal',
    });