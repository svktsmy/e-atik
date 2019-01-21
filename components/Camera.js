import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, StatusBar, ActivityIndicator, Dimensions, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import { Camera as ExpoCamera, Permissions, ImagePicker, BlurView } from 'expo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
export default class Camera extends React.Component {
    constructor(props) {
        super(props)
        this.scroller = null;
        this.state = {
            permissions: null,
            hasCameraPermission: null,
            hasLocationPermission: null,
            type: ExpoCamera.Constants.Type.back,
            base64: null,
            buttonDisabled: false,
        }
    }

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const location = await Permissions.askAsync(Permissions.LOCATION);
        this.setState({
            hasCameraPermission: camera.status === 'granted',
            hasLocationPermission: location.status === 'granted',

        });



    }
    snapPhoto() {

        if (this.camera && !this.state.buttonDisabled) {
            this.setState({ buttonDisabled: true })
            this.camera.takePictureAsync({
                onPictureSaved: photo => this.setState({ base64: photo.uri }),
                base64: false,
                quality: 0,
                skipProcessing: false
            });
            setTimeout(() => this.forceUpdate(), 1);

        }

    }
    close() {
        this.setState({ buttonDisabled: false, base64: null })
    }

    render() {
        var { height, width } = Dimensions.get('window')
        const { hasCameraPermission, hasLocationPermission } = this.state;
        if (hasCameraPermission === null && hasLocationPermission === null) {
            return <View></View>;
        } else if (hasCameraPermission === false && hasLocationPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar hidden />
                    <ExpoCamera ref={ref => { this.camera = ref; }} style={styles.container} type={this.state.type} autoFocus={ExpoCamera.Constants.AutoFocus.on}>

                        {
                            this.state.base64 ?
                                <BlurView style={{ flex: 1 }} tint="dark" intensity={100}>
                                    <StatusBar hidden={false} />

                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width }} activeOpacity={0.8}>
                                        <ImageBackground source={{ uri: this.state.base64 }} resizeMode='contain' style={{
                                            height:(width*1.77)*0.9,
                                            justifyContent: 'space-between',
                                            alignItems: 'center',

                                        }} >

                                            <View style={{ flex: .1, flexDirection: 'row' }} intensity={100} >

                                                <TouchableOpacity onPress={() => this.close()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Ionicons name="md-close" size={26} color="white" />
                                                </TouchableOpacity>
                                                <View style={{ width: width * .7 }}></View>

                                            </View>

                                            <View style={{ flex: .08, flexDirection: 'row', justifyContent: 'center',paddingBottom:13 }}>
                                                
                                                <TextInput placeholder='Not Eklemek ister misiniz?' style={{ height:height*.06,width: width * .68, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderTopLeftRadius: 8,borderBottomLeftRadius:8 ,paddingLeft:10,fontSize:20 }}/>
                                                <TouchableOpacity style={{ height:height*.06,justifyContent: 'center', alignItems: 'center', width: width * .15, backgroundColor: 'green', borderTopRightRadius: 8,borderBottomRightRadius:8 }}>
                                                    <Ionicons name="ios-send" size={30} color="white" />
                                                </TouchableOpacity>
                                            </View>



                                        </ImageBackground>

                                    </View>




                                </BlurView> :
                                <SafeAreaView style={styles.cameraContainer}>
                                    <TouchableOpacity style={styles.button} onPress={() => this.snapPhoto()} disabled={this.state.buttonDisabled} activeOpacity={0.8}>
                                        <View style={{ borderWidth: 4, borderRadius: 100, width: width * .18, height: width * .18, borderColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                            {!this.state.buttonDisabled ?
                                                <View style={{ width: width * .13, height: width * .13, backgroundColor: 'white', borderRadius: 100 }} ></View>
                                                :
                                                <ActivityIndicator size="small" color="white" />

                                            }
                                        </View>
                                    </TouchableOpacity>
                                </SafeAreaView>
                        }

                    </ExpoCamera>
                </View >


            );
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    cameraContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',

    },
    button: {
        flex: 0.1,
        alignItems: 'center',
        marginBottom: 30,
        opacity: 0.8
    },
    buttonText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    }
});