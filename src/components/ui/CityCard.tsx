import * as React from "react";
import { StyleSheet } from "react-nativescript";

type CityCardProps = {
    name: string;
    days: number;
    budget: number;
    onPress: () => void;
};

export function CityCard({ name, days, budget, onPress }: CityCardProps) {
    return (
        <gridLayout
            columns="*, auto"
            className="border-b border-gray-200 p-2"
        >
            <stackLayout col="0">
                <label className="font-bold">{name}</label>
                <label className="text-sm text-gray-600">
                    {days} days - ${budget}
                </label>
            </stackLayout>
            <button
                col="1"
                className="text-blue-500"
                onTap={onPress}
            >
                Details
            </button>
        </gridLayout>
    );
}