import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import { MaterialIcons } from '@expo/vector-icons';
import HomeStack from "./home/homeStack";
import StorageStack from "./storage/storageStack";

const Tab = createMaterialBottomTabNavigator();

// Tạo tab navigation
export default class TabNav extends Component{
    render() {
        return(
            <Tab.Navigator
                shifting={true}
                activeColor="#fff"
                barStyle={{ backgroundColor: "#003f5c" }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStack}
                    options={{
                        tabBarLabel: "Chụp ảnh",
                        tabBarColor: "#003f5c",
                        tabBarIcon: ({color}) => (
                            <MaterialIcons name="photo-camera" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Storage"
                    component={StorageStack}
                    options={{
                        tabBarLabel: "Thư viện",
                        tabBarColor: "#5D1049",
                        tabBarIcon: ({color}) => (
                            <MaterialIcons name="photo-library" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}
