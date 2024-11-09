import { RouteProp } from '@react-navigation/core';
import * as React from "react";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../../NavigationParamList";
import { InputField } from "../ui/InputField";
import { generateTravelResponse } from "../../services/gemini";

type ChatScreenProps = {
    route: RouteProp<MainStackParamList, "Chat">,
    navigation: FrameNavigationProp<MainStackParamList, "Chat">,
};

type Message = {
    text: string;
    isUser: boolean;
    timestamp: Date;
};

export function ChatScreen() {
    const [messages, setMessages] = React.useState<Message[]>([
        {
            text: "Hello! I'm your AI travel assistant powered by Gemini. How can I help you plan your trip?",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [newMessage, setNewMessage] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const sendMessage = async () => {
        if (!newMessage.trim() || isLoading) return;

        const userMessage: Message = {
            text: newMessage.trim(),
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setNewMessage("");
        setIsLoading(true);

        try {
            const aiResponse = await generateTravelResponse(userMessage.text);
            const aiMessage: Message = {
                text: aiResponse,
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = {
                text: "I apologize, but I'm having trouble connecting right now. Please try again.",
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <gridLayout rows="*, auto" className="bg-gray-100">
            <scrollView row="0" className="p-4">
                <stackLayout>
                    {messages.map((message, index) => (
                        <stackLayout
                            key={index}
                            className={`p-3 rounded-lg mb-2 ${
                                message.isUser
                                    ? "bg-blue-500 ml-8"
                                    : "bg-white mr-8"
                            }`}
                        >
                            <label
                                className={
                                    message.isUser
                                        ? "text-white"
                                        : "text-gray-800"
                                }
                                textWrap={true}
                            >
                                {message.text}
                            </label>
                        </stackLayout>
                    ))}
                    {isLoading && (
                        <activityIndicator
                            busy={true}
                            className="m-4"
                        />
                    )}
                </stackLayout>
            </scrollView>

            <gridLayout
                row="1"
                columns="*, auto"
                className="bg-white p-2 border-t border-gray-200"
            >
                <InputField
                    col="0"
                    hint="Type your message..."
                    value={newMessage}
                    onTextChange={setNewMessage}
                />
                <button
                    col="1"
                    className="bg-blue-500 text-white p-2 rounded-lg ml-2"
                    onTap={sendMessage}
                    isEnabled={!isLoading}
                    opacity={isLoading ? 0.5 : 1}
                >
                    {isLoading ? "..." : "Send"}
                </button>
            </gridLayout>
        </gridLayout>
    );
}