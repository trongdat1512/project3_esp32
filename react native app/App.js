import React, {Component} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import TabNav from "./screens/tabNav";

export default class App extends Component{
    render(){
        return (
            <NavigationContainer>
                <TabNav />
            </NavigationContainer>
        );
    }
}
