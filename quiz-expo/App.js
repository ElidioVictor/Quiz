import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './components/Home'
import Add from './components/Quiz'
import Quiz from './components/Add'
import Edit from './components/Edit'
import Quiz10 from './components/Quiz10'

const Stack = createStackNavigator()

export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Add" component={Quiz} />
                <Stack.Screen name="Quiz" component={Add} />
                <Stack.Screen name="Edit" component={Edit} />
                <Stack.Screen name="Quiz10" component={Quiz10} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}