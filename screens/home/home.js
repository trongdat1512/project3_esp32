import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Image,
    TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import axios from "react-native-axios";
import {firebaseApp} from "../../util/firebaseConfig";

const imgWidth = Dimensions.get('window').width*0.9;
let t;

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            captureState: "",
            isCapturing: false
        }
    }

    upload = async ()=>{
        const response = await fetch('http://192.168.0.10/ESP32/camera_upload/upload_esp32.jpg?time='+Date.now());
        const blob = await response.blob();
        let metadata = {
            contentType: 'image/jpeg',
        };
        let currentDate = new Date();
        let datetime = "" + currentDate.getDate() + "-"
            + (currentDate.getMonth()+1)  + "-"
            + currentDate.getFullYear() + " "
            + currentDate.getHours() + ":"
            + currentDate.getMinutes() + ":"
            + currentDate.getSeconds();
        let fileName = datetime + ".jpg";
        let ref = firebaseApp.storage().ref().child('captured/' + fileName);
        return ref.put(blob, metadata);
    }

    capture = ()=>{
        axios.post(
            "http://192.168.0.10/ESP32/esp32_cam_upload_control.php",
            "LED1_ON="
        )
            .then((res)=>{
                this.setState({
                    isCapturing: true,
                    captureState: "Taking photo..."
                });
                t = setInterval(()=>{
                    if(this.state.isCapturing){
                        axios.post(
                            "http://192.168.0.10/ESP32/sync_allpages.php",
                            "val_button="
                        )
                            .then((res)=>{
                                if(res.data == "DONE!"){
                                    this.setState({
                                        captureState: "Done!",
                                        isCapturing: false
                                    });
                                    this.upload();
                                    clearInterval(t);
                                }
                            })
                            .catch((err)=>{
                                console.error(err);
                            })
                    }
                }, 1000)
            })
            .catch((err)=>{
                console.error(err);
            })
    }

    loader = ()=>{
        if(!this.state.isCapturing){
            return(
                <Image
                    style={styles.img}
                    source={{
                        uri: 'http://192.168.0.10/ESP32/camera_upload/upload_esp32.jpg?time='+Date.now(),
                    }}
                />
            );
        }
        else{
            return(
                <ActivityIndicator style={styles.img} size="large" color="#003f5c"/>
            );
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <Text style={styles.label}>Hệ thống giám sát qua internet sử dụng ESP32-camera</Text>
                {this.loader()}
                <Text style={styles.captureState}>{this.state.captureState}</Text>
                <TouchableOpacity
                    style={styles.captureBtn}
                    onPress={this.capture}
                >
                    <MaterialIcons name="photo-camera" size={50} color="gray" />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    label:{
        marginTop: 50,
        fontSize: 25,
        textAlign: "center",
        color: "#003f5c",
        fontWeight: "bold"
    },
    img:{
        width: imgWidth,
        height: imgWidth*3/4,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5
    },
    captureBtn:{
        position: "absolute",
        bottom: 50,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 50,
        padding: 10
    },
    captureState:{
        marginTop: 10,
        fontSize: 16
    }
});
