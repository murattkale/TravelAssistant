import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type CityDetailsScreenProps = {
    route: RouteProp<MainStackParamList, "CityDetails">,
    navigation: FrameNavigationProp<MainStackParamList, "CityDetails">,
};

type Attraction = {
    name: string;
    type: string;
    price: number;
    rating: number;
};

export function CityDetailsScreen({ route, navigation }: CityDetailsScreenProps) {
    const { cityName, budget, days } = route.params;
    const [attractions, setAttractions] = React.useState<Attraction[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulated API call to get attractions
        setTimeout(() => {
            setAttractions([
                { name: "City Museum", type: "Culture", price: 15, rating: 4.5 },
                { name: "Central Park", type: "Nature", price: 0, rating: 4.8 },
                { name: "Historic District", type: "Sightseeing", price: 10, rating: 4.3 }
            ]);
            setLoading(false);
        }, 1000);
    }, [cityName]);

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                <stackLayout className="bg-white rounded-lg p-4 mb-4">
                    <label className="text-xl font-bold mb-2">{cityName}</label>
                    <label className="text-gray-600 mb-4">
                        {days} days - Budget: ${budget}
                    </label>
                </stackLayout>

                {loading ? (
                    <activityIndicator busy={true} />
                ) : (
                    <stackLayout className="bg-white rounded-lg p-4">
                        <label className="text-lg font-bold mb-2">Recommended Attractions</label>
                        {attractions.map((attraction, index) => (
                            <gridLayout
                                key={index}
                                columns="*, auto"
                                className="border-b border-gray-200 p-2"
                            >
                                <stackLayout col="0">
                                    <label className="font-bold">{attraction.name}</label>
                                    <label className="text-sm text-gray-600">
                                        {attraction.type} - ${attraction.price}
                                    </label>
                                </stackLayout>
                                <label col="1" className="text-blue-500">
                                    ★ {attraction.rating}
                                </label>
                            </gridLayout>
                        ))}
                    </stackLayout>
                )}

                <button
                    className="bg-blue-500 text-white p-3 rounded-lg mt-4"
                    onTap={() => navigation.navigate("DailyPlan", {
                        cityName,
                        day: 1
                    })}
                >
                    View Daily Plan
                </button>
            </stackLayout>
        </scrollView>
    );
}