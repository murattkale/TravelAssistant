import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

// Register entry components
ReactNativeScript.registerElement(
    'activityIndicator',
    () => require('@nativescript/core').ActivityIndicator
);

// Start the application
ReactNativeScript.start(React.createElement(MainStack, {}, null));