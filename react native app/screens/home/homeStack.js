import React, {Component} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Home from "./home";

const Stack = createStackNavigator();

export default class HomeStack extends Component{
    render() {
        return(
            <Stack.Navigator mode="modal">
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{
                        title: "Chụp ảnh",
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerStyle:{
                            backgroundColor: "#003f5c"
                        }
                    }}
                />
            </Stack.Navigator>
        );
    }
}
