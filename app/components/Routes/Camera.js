import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
  } from 'react-native';
import {RNCamera} from 'react-native-camera';

const landmarkSize = 2;

const flashModeOrder = {
  off: 'on',
  on: 'auto',
  auto: 'torch',
  torch: 'off',
};

const wbOrder = {
  auto: 'sunny',
  sunny: 'cloudy',
  cloudy: 'shadow',
  shadow: 'fluorescent',
  fluorescent: 'incandescent',
  incandescent: 'auto',
};

export default class RNCameraScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            ...this.state,
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            depth: 0,
            type: 'back',
            whiteBalance: 'auto',
            ratio: '16:9',
            ratios: [],
            photoId: 1,
            showGallery: false,
            photos: [],
            isRecording: false,
            photoURI: ''
        }
    }

  getRatios = async function() {
    const ratios = await this.refs.camera.getSupportedRatios();
    return ratios;
  };

  toggleView() {
    this.setState({
      showGallery: !this.state.showGallery,
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  toggleFlash() {
    this.setState({
      flash: flashModeOrder[this.state.flash],
    });
  }

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

  toggleWB() {
    this.setState({
      whiteBalance: wbOrder[this.state.whiteBalance],
    });
  }

  toggleFocus() {
    this.setState({
      autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
    });
  }

  zoomOut() {
    this.setState({
      zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
    });
  }

  zoomIn() {
    this.setState({
      zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
    });
  }

  goBack() {
    this.props.navigate('Compose');
  }

  setFocusDepth(depth) {
    this.setState({
      depth,
    });
  }

  takePicture = async function() {
      //console.log(this.camera)
    if (this.camera) {
        //console.log("picture sizes",this.camera.getAvailablePictureSizes())

      this.camera.takePictureAsync().then(data => {
        //console.log('data: ', data);
        this.state.photoURI = data.uri;
        //console.log('hi', this.state.photoURI);
        this.props._handlePictureTaken(this.state.photoURI);
        this.props.navigate('Picture');
      });

    }
    else{
        this.props.navigate('Picture')
    }
  };

  renderCamera() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;

        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        permissionDialogTitle={'Permission to use camera'}
        permissionDialogMessage={'We need your permission to use your camera phone'}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            margin:20,
            // justifyContent: 'space-around',
          }}
        >
          {/* <TouchableOpacity style={styles.flipButton} onPress={this.toggleFacing.bind(this)}>
            <Text style={styles.flipText}> FLIP </Text>
          </TouchableOpacity> */}

          {/*<TouchableOpacity style={styles.flipButton} onPress={this.goBack.bind(this)}>*/}
            {/*<Text style={{color:'white', fontSize:30}}>  &#8629; </Text>*/}
          {/*</TouchableOpacity>*/}

          <TouchableOpacity style={styles.flipButton} onPress={this.toggleFlash.bind(this)}>
            <Text style={styles.flipText}> FLASH: {this.state.flash} </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.flipButton} onPress={this.toggleWB.bind(this)}>
            <Text style={styles.flipText}> WB: {this.state.whiteBalance} </Text>
          </TouchableOpacity> */}
        </View>
        <View
          style={{
            flex: 0.4,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
          {/* <Slider
            style={{ width: 150, marginTop: 15, alignSelf: 'flex-end' }}
            onValueChange={this.setFocusDepth.bind(this)}
            step={0.1}
            disabled={this.state.autoFocus === 'on'}
          /> */}
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'flex-end',
          }}
        >
        </View>
        <View
          style={{
            flex: 0.1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignSelf: 'center',
              marginBottom:'10%'
          }}
        >
          {/* <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomIn.bind(this)}
          >
            <Text style={styles.flipText}> + </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.flipButton, { flex: 0.1, alignSelf: 'flex-end' }]}
            onPress={this.zoomOut.bind(this)}
          >
            <Text style={styles.flipText}> - </Text>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleFocus.bind(this)}
          >
            <Text style={styles.flipText}> AF : {this.state.autoFocus} </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'center' }]}
            onPress={this.takePicture.bind(this)}
          >
            <Text style={styles.flipText}> SNAP </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={[styles.flipButton, styles.galleryButton, { flex: 0.25, alignSelf: 'flex-end' }]}
            onPress={this.toggleView.bind(this)}
          >
            <Text style={styles.flipText}> Gallery </Text>
          </TouchableOpacity> */}
        </View>
      </RNCamera>
    );
  }

  render() {


    // const { onUserInputChange } = this.props;
    return <View style={styles.container}>{this.renderCamera()}</View>;
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: '#000',
    },
    navigation: {
      flex: 1,
    },
    gallery: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    backButton: {
      flex: 0.3,
      height: 40,
      width: 20,
      marginHorizontal: 2,
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 8,
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    flipButton: {
      flex: 0.3,
      height: 50,
        width:50,
      marginHorizontal: 2,
      marginBottom: 25,
      marginTop: 20,
      borderRadius: 25,
      borderColor: 'white',
      borderWidth: 1,
      padding: 5,
      alignItems: 'center',
      justifyContent: 'center',
        backgroundColor:'white',
    },
    flipText: {
      color: '#9d2235',
      fontSize: 15,
    },
    item: {
      margin: 4,
      backgroundColor: 'indianred',
      height: 35,
      width: 80,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    picButton: {
      backgroundColor: '#fff',
    },
    galleryButton: {
      backgroundColor: 'indianred',
    },
    facesContainer: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      top: 0,
    },
    face: {
      padding: 10,
      borderWidth: 2,
      borderRadius: 2,
      position: 'absolute',
      borderColor: '#FFD700',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    landmark: {
      width: landmarkSize,
      height: landmarkSize,
      position: 'absolute',
      backgroundColor: 'red',
    },
    faceText: {
      color: '#FFD700',
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      backgroundColor: 'transparent',
    },
    row: {
      flexDirection: 'row',
    },
  });
