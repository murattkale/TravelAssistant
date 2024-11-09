export type MainStackParamList = {
    Home: undefined;
    CityDetails: {
        cityName: string;
        budget: number;
        days: number;
    };
    DailyPlan: {
        cityName: string;
        day: number;
    };
    Map: {
        cities: Array<{
            name: string;
            coordinates: {
                latitude: number;
                longitude: number;
            };
        }>;
    };
    Chat: undefined;
};