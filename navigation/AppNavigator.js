import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import AuthScreen from '../screens/AuthScreen';

const App = createSwitchNavigator({
    AuthLoading: LoadingScreen,
    Auth: AuthScreen,
    Main: MainTabNavigator,
}, {
    initialRouteName: 'AuthLoading',
});

export default createAppContainer(App);