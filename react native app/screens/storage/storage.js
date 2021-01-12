import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList, Image, RefreshControl,
    Dimensions, ActivityIndicator} from 'react-native';
import {firebaseApp} from "../../util/firebaseConfig";
import {StatusBar} from "expo-status-bar";

const imgWidth = Dimensions.get('window').width*0.43;
let isLoaded = false;
let t, item = [];

export default class Storage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            imgItem: "",
            isLoading: true,
            refreshing: false
        }
    }

    componentDidMount() {
        this.reload();
    }

    reload = ()=>{
        this.setState({
            isLoading: true,
            refreshing: true
        })
        item = [];
        let listRef = firebaseApp.storage().ref().child('captured');
        listRef.listAll().then(function(res) {
            let count = 0;
            let check = 0;
            res.items.forEach(function(itemRef) {
                count++;
            });
            res.items.forEach(function(itemRef) {
                itemRef.getDownloadURL().then(url=>{
                    item.unshift(JSON.parse(JSON.stringify({"url": url, "name": itemRef.name})));
                    check++;
                    if(check === count) isLoaded = true;
                });
            });
        }).catch(function(e) {
            console.error(e);
        });
        t = setInterval(()=>{
            if(isLoaded){
                this.setState({
                    imgItem: item,
                    isLoading: false,
                    refreshing: false
                })
                isLoaded = false;
                clearInterval(t);
            }
        }, 1000);
    }

    loader = ()=>{
        if(!this.state.isLoading){
            return(
                <FlatList
                    data={this.state.imgItem}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.reload} />
                    }
                    renderItem={({item}) =>
                        <View style={styles.itemContainer}>
                            <Image
                                style={styles.img}
                                source={{
                                    uri: item.url,
                                }}
                            />
                            <Text>{item.name}</Text>
                        </View>
                    }
                    keyExtractor={item => item.url}
                    numColumns={2}
                />
            );
        }
        else{
            return(
                <ActivityIndicator style={styles.loader} size="large" color="#003f5c"/>
            );
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                {this.loader()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: 10
    },
    itemContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: "center",
        marginVertical: 5,
        marginHorizontal: 10
    },
    img:{
        width: imgWidth,
        height: imgWidth*3/4,
    },
    loader:{
    },
    reloadBtn:{
        position: "absolute",
        zIndex: 1,
        backgroundColor: "#5D1049",
        bottom: 20,
        right: 20,
        borderWidth: 0,
        borderRadius: 50,
        padding: 10
    },
});
