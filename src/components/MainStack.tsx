import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./screens/HomeScreen";
import { CityDetailsScreen } from "./screens/CityDetailsScreen";
import { DailyPlanScreen } from "./screens/DailyPlanScreen";
import { MapScreen } from "./screens/MapScreen";
import { ChatScreen } from "./screens/ChatScreen";

const StackNavigator = stackNavigatorFactory();

export function MainStack() {
    return (
        <BaseNavigationContainer>
            <StackNavigator.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: "#4A90E2",
                    },
                    headerTintColor: "#ffffff",
                    headerShown: true,
                }}
            >
                <StackNavigator.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ 
                        title: "Travel Planner",
                        headerShown: true
                    }}
                />
                <StackNavigator.Screen
                    name="CityDetails"
                    component={CityDetailsScreen}
                    options={({ route }: any) => ({ 
                        title: route.params?.cityName || "City Details",
                        headerShown: true
                    })}
                />
                <StackNavigator.Screen
                    name="DailyPlan"
                    component={DailyPlanScreen}
                    options={{ 
                        title: "Daily Itinerary",
                        headerShown: true
                    }}
                />
                <StackNavigator.Screen
                    name="Map"
                    component={MapScreen}
                    options={{ 
                        title: "Route Map",
                        headerShown: true
                    }}
                />
                <StackNavigator.Screen
                    name="Chat"
                    component={ChatScreen}
                    options={{ 
                        title: "AI Assistant",
                        headerShown: true
                    }}
                />
            </StackNavigator.Navigator>
        </BaseNavigationContainer>
    );
}