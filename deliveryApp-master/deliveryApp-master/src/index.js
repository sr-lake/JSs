import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar, SafeAreaView} from 'react-native';

import Navigation from './Navigation';

export default function App() {
    return (
        <NavigationContainer>
            <SafeAreaView style={{flex: 1}}>
                <StatusBar />
                <Navigation />
            </SafeAreaView>
        </NavigationContainer>
    );
}
