import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type MapScreenProps = {
    route: RouteProp<MainStackParamList, "Map">,
    navigation: FrameNavigationProp<MainStackParamList, "Map">,
};

export function MapScreen({ route }: MapScreenProps) {
    const { cities } = route.params;

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                <stackLayout className="bg-white rounded-lg p-4">
                    <label className="text-xl font-bold mb-4">Your Route</label>
                    {cities.map((city, index) => (
                        <stackLayout
                            key={index}
                            className="border-b border-gray-200 p-2"
                        >
                            <label className="font-bold">{city.name}</label>
                            <label className="text-sm text-gray-600">
                                Lat: {city.coordinates.latitude}, 
                                Long: {city.coordinates.longitude}
                            </label>
                        </stackLayout>
                    ))}
                </stackLayout>
            </stackLayout>
        </scrollView>
    );
}