import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import AuthScreen from '../screens/AuthScreen';

/**
 * @author Alejandro Perez
 * @version 1.0.0
 */

const App = createSwitchNavigator({
    AuthLoading: LoadingScreen,
    Auth: AuthScreen,
    Main: MainTabNavigator,
}, {
    initialRouteName: 'AuthLoading',
});

export default createAppContainer(App);