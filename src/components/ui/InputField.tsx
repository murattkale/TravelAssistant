import * as React from "react";
import { EventData, TextField } from "@nativescript/core";

type InputFieldProps = {
    hint: string;
    value: string;
    keyboardType?: "number" | "text";
    onTextChange: (value: string) => void;
};

export function InputField({ hint, value, keyboardType = "text", onTextChange }: InputFieldProps) {
    return (
        <textField
            className="input p-2 border-b border-gray-300 mb-2"
            hint={hint}
            text={value}
            keyboardType={keyboardType}
            onTextChange={(args: EventData) => {
                const textField = args.object as TextField;
                onTextChange(textField.text);
            }}
        />
    );
}