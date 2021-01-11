import React, {Component} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import { StyleSheet} from 'react-native';
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

const styles = StyleSheet.create({

});
