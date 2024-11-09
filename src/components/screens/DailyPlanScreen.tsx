import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";

type DailyPlanScreenProps = {
    route: RouteProp<MainStackParamList, "DailyPlan">,
    navigation: FrameNavigationProp<MainStackParamList, "DailyPlan">,
};

type Activity = {
    time: string;
    name: string;
    description: string;
    duration: string;
};

export function DailyPlanScreen({ route }: DailyPlanScreenProps) {
    const { cityName, day } = route.params;
    const [activities, setActivities] = React.useState<Activity[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulated API call to get daily activities
        setTimeout(() => {
            setActivities([
                {
                    time: "09:00",
                    name: "Breakfast",
                    description: "Local café experience",
                    duration: "1h"
                },
                {
                    time: "10:30",
                    name: "City Museum",
                    description: "Guided tour of main exhibits",
                    duration: "2h"
                },
                {
                    time: "13:00",
                    name: "Lunch Break",
                    description: "Traditional local restaurant",
                    duration: "1.5h"
                },
                {
                    time: "15:00",
                    name: "Historic District",
                    description: "Walking tour",
                    duration: "2h"
                }
            ]);
            setLoading(false);
        }, 1000);
    }, [cityName, day]);

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                <stackLayout className="bg-white rounded-lg p-4 mb-4">
                    <label className="text-xl font-bold mb-2">{cityName}</label>
                    <label className="text-gray-600">Day {day}</label>
                </stackLayout>

                {loading ? (
                    <activityIndicator busy={true} />
                ) : (
                    <stackLayout className="bg-white rounded-lg p-4">
                        {activities.map((activity, index) => (
                            <stackLayout
                                key={index}
                                className="border-b border-gray-200 p-3"
                            >
                                <gridLayout columns="auto, *">
                                    <label
                                        col="0"
                                        className="font-bold text-blue-500 mr-2"
                                    >
                                        {activity.time}
                                    </label>
                                    <label
                                        col="1"
                                        className="font-bold"
                                    >
                                        {activity.name}
                                    </label>
                                </gridLayout>
                                <label className="text-sm text-gray-600">
                                    {activity.description}
                                </label>
                                <label className="text-xs text-gray-500">
                                    Duration: {activity.duration}
                                </label>
                            </stackLayout>
                        ))}
                    </stackLayout>
                )}
            </stackLayout>
        </scrollView>
    );
}