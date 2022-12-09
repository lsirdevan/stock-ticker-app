import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DetailScreen from "../screens/DetailScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const NAVIGATION_OPTIONS = {
    headerShown: false
};

const Navigation = () => (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name={"Search"}
                component={HomeScreen}
                options={NAVIGATION_OPTIONS}
            />
            <Stack.Screen
                name={"Detail Stack"}
                component={DetailScreen}
                options={({ route }) => ({ title: route.params.title })}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default Navigation;
