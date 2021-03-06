import React, { useState, useEffect, useRef } from "react";
import getData from "./Chats";
import {
    View,
    Text,
    SafeAreaView,
    Button,
    TouchableOpacity,
    StyleSheet,
    Image,
    Modal,
    membre
} from "react-native";
import { Camera } from "expo-camera";
import AppIcon from "../compenents/appIcon/AppIcon";

const HomeScreen = ({ navigation }) => {
    const [switchCam, setSwitchCam] = useState(0);

    if (switchCam == 0) {

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 16 }}>
                    <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                textAlign: "center",
                                marginBottom: 16,
                            }}
                        >
                            Bonjour !{"\n\n"}
              Envoyez votre premiere photo !
            </Text>
                        <Button
                            title="Prendre une photo"
                            color="black"
                            onPress={() => setSwitchCam(1)}
                        />
                    </View>
                    <Text
                        style={{
                            fontSize: 18,
                            textAlign: "center",
                            color: "grey",
                        }}
                    ></Text>
                    <Text
                        style={{
                            fontSize: 16,
                            textAlign: "center",
                            color: "grey",
                        }}
                    >
                        SNAPCHAT
          </Text>
                </View>
            </SafeAreaView>
        );
    } else {
        return <Cam navigation={navigation} />;
    }
};
function Cam(navigation) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imagePreview, setImagePreview] = useState(null);
    const [isOpen, setIsopen] = useState(false);
    const camRef = useRef(null);
    const [flashMode, setFlashMode] = useState('off');

    const changeFlashMode = () => {
        if (flashMode == "off") {
            setFlashMode('on');
        } else {
            setFlashMode('off');

        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const takePicture = async () => {
        if (!camRef) {
            return;
        }
        try {
            const pic = await camRef.current.takePictureAsync({});
            //  console.log(pic);
            setImagePreview(pic.uri);
            setIsopen(true);
        } catch (error) {
            console.log("Error taking a picture !");
        }
    };

    const CloseImagaPreview = () => {
        setImagePreview(null), setIsopen(false);
    };

    const nav = () => {
        //navigation.navigate("Chat")
        getData()
        .then((token1) => {
            console.log(token1)
            fetch("http://149.91.89.133:6088/all", {
                method: 'GET',
                headers: {
                    token: token1
                }
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.data)
                    membre = res.data
                })
        })


    }

    
                if (imagePreview) {

                    return (

                        <Modal animationType="fade" visible={isOpen}>
                            {
                                <Image
                                    source={{ uri: imagePreview }}
                                    style={{ height: "100%", width: "100%" }}
                                />
                            }
                            <View style={styles.actionBottom}>
                                <AppIcon IonName="send" size={40} color="#eee" />
                                <AppIcon
                                    IonName="send"
                                    size={40}
                                    color="#0e15a"
                                    style={styles.sendBtn}
                                    onPress={nav}
                                />
                            </View>
                            <View style={styles.closeBtn}>
                                <AppIcon
                                    IonName="close-circle"
                                    size={60}
                                    color="#eee"
                                    onPress={CloseImagaPreview}
                                />
                            </View>
                        </Modal>

                    );

                }

                return (
                    <View style={styles.container}>
                        <Camera
                            style={styles.camera}
                            type={type}
                            ref={camRef}
                            flashMode={flashMode}
                        >
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}
                                >
                                    {
                                        <Image
                                            style={styles.image}
                                            source={require("../../assets/rotate.png")}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>

                            <View style={styles.header}>
                                <AppIcon AntName="user" color="#eee" size={20} />
                            </View>
                            <View style={styles.setting}>
                                <AppIcon AntName="setting" size={20} color="#eee"
                                onPress={nav} />
                            </View>
                            <View style={styles.flash}>
                                <AppIcon
                                    IonName="flash"
                                    size={20}
                                    color="#eee"
                                    onPress={changeFlashMode}
                                />
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={takePicture}
                                    style={{
                                        width: 70,
                                        height: 70,
                                        bottom: 0,
                                        borderRadius: 50,
                                        backgroundColor: "#fff",
                                        marginLeft: 150,
                                        marginBottom: 30,
                                    }}
                                />
                            </View>
                        </Camera>
                    </View>
                );
            }

const styles = StyleSheet.create({
                container: {
                    flex: 1,
                    width: "100%",
                },
                camera: {
                    flex: 1,
                    width: "100%",
                    height: "100%",
                },
                buttonContainer: {
                    flex: 1,
                    backgroundColor: "transparent",
                    flexDirection: "row",
                    margin: 20,
                },
                button: {
                    // flex: 0.1,
                    // alignSelf: 'flex-end',
                    // alignItems: 'center',
                    marginLeft: 300,
                },
                text: {
                    fontSize: 18,
                    color: "white",
                },
                text1: {
                    fontSize: 18,
                    textAlign: "right",
                },
                image: {
                    width: 50,
                    height: 50,
                },
                actionBottom: {
                    position: "absolute",
                    bottom: 20,
                    left: "80%",
                    padding: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                },
                sendBtn: {
                    backgroundColor: "yellow",
                },
                closeBtn: {
                    padding: 10,
                    position: "absolute",
                    top: 5,
                },
                header: {
                    position: "absolute",
                    margin: 20,
                    padding: 10,
                    justifyContent: "space-between",
                    backgroundColor: "black",
                    borderRadius: 50,
                },
                setting: {
                    position: "absolute",
                    margin: 20,
                    padding: 10,
                    top: 50,
                    justifyContent: "space-between",
                    backgroundColor: "black",
                    borderRadius: 50,
                },
                flash: {
                    position: "absolute",
                    margin: 20,
                    padding: 10,
                    top: 100,
                    justifyContent: "space-between",
                    backgroundColor: "black",
                    borderRadius: 50,
                },
            });

        export default HomeScreen;