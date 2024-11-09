import { Dialogs } from '@nativescript/core';
import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { CityCard } from "../ui/CityCard";
import { InputField } from "../ui/InputField";

type HomeScreenProps = {
    route: RouteProp<MainStackParamList, "Home">,
    navigation: FrameNavigationProp<MainStackParamList, "Home">,
};

type City = {
    name: string;
    days: number;
    budget: number;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
    const [cities, setCities] = React.useState<City[]>([]);
    const [newCity, setNewCity] = React.useState("");
    const [days, setDays] = React.useState("");
    const [budget, setBudget] = React.useState("");

    const addCity = () => {
        if (!newCity.trim()) {
            Dialogs.alert("Please enter a city name");
            return;
        }

        const daysNum = parseInt(days);
        const budgetNum = parseInt(budget);

        if (isNaN(daysNum) || daysNum <= 0) {
            Dialogs.alert("Please enter a valid number of days");
            return;
        }

        if (isNaN(budgetNum) || budgetNum <= 0) {
            Dialogs.alert("Please enter a valid budget");
            return;
        }

        setCities([...cities, {
            name: newCity.trim(),
            days: daysNum,
            budget: budgetNum
        }]);
        
        setNewCity("");
        setDays("");
        setBudget("");
    };

    return (
        <scrollView className="bg-gray-100">
            <stackLayout className="p-4">
                <label className="text-2xl font-bold text-center mb-4">
                    Plan Your Journey
                </label>

                <stackLayout className="bg-white rounded-lg p-4 mb-4">
                    <InputField
                        hint="Enter city name"
                        value={newCity}
                        onTextChange={setNewCity}
                    />
                    <InputField
                        hint="Number of days"
                        value={days}
                        keyboardType="number"
                        onTextChange={setDays}
                    />
                    <InputField
                        hint="Budget (USD)"
                        value={budget}
                        keyboardType="number"
                        onTextChange={setBudget}
                    />
                    <button
                        className="bg-blue-500 text-white p-3 rounded-lg"
                        onTap={addCity}
                    >
                        Add City
                    </button>
                </stackLayout>

                <stackLayout className="bg-white rounded-lg p-4">
                    <label className="text-xl font-bold mb-2">Your Route</label>
                    {cities.map((city, index) => (
                        <CityCard
                            key={index}
                            name={city.name}
                            days={city.days}
                            budget={city.budget}
                            onPress={() => navigation.navigate("CityDetails", {
                                cityName: city.name,
                                days: city.days,
                                budget: city.budget
                            })}
                        />
                    ))}
                </stackLayout>

                {cities.length > 0 && (
                    <button
                        className="bg-green-500 text-white p-3 rounded-lg mt-4"
                        onTap={() => navigation.navigate("Map", {
                            cities: cities.map(city => ({
                                name: city.name,
                                coordinates: { latitude: 0, longitude: 0 }
                            }))
                        })}
                    >
                        View on Map
                    </button>
                )}

                <button
                    className="bg-purple-500 text-white p-3 rounded-lg mt-2"
                    onTap={() => navigation.navigate("Chat")}
                >
                    Ask AI Assistant
                </button>
            </stackLayout>
        </scrollView>
    );
}