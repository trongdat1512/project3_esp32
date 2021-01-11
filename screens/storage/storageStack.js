import React, {Component} from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Storage from "./storage.js"

const Stack = createStackNavigator();

export default class StorageStack extends Component{
    render() {
        return(
            <Stack.Navigator mode="modal">
                <Stack.Screen
                    name="Storage"
                    component={Storage}
                    options={{
                        title: "Thư viện",
                        headerTitleAlign: "center",
                        headerTintColor: "#fff",
                        headerStyle:{
                            backgroundColor: "#5D1049"
                        }
                    }}
                />
            </Stack.Navigator>
        );
    }
}
