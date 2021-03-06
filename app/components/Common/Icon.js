import Svg,{

    Path,
    Polygon,

} from 'react-native-svg';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
export default class Icon extends React.Component {
    constructor(props){
        super(props)
    }
    renderCompose = (size,color) => {
        return(
            <View style={styles.iconContainer}>
            <Svg width={48} height={48} >
                <Path fill="none" d="M0 0h24v24H0V0z"/>
                <Path
                    scale={2}
                    d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"                    stroke={color}
                    fill={color}
                    strokeWidth={.05} />
            </Svg>
            </View>
        )
    }
    renderFeed = (size,color) => {
        return(
            <View style={styles.iconContainer}>

            <Svg width={60} height={60} >
                <Path fill="none" d="M0 0h24v24H0V0z"/>
                <Path
                    scale={2.5}
                    d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
                    stroke={color}
                    fill={color}
                    strokeWidth={.02} />
            </Svg>
            </View>
        )
    }
    renderSettings = (size,color) => {

        return(
            <View style={styles.iconContainer}>

            <Svg  width={48} height={48}>
                <Path fill="none" d="M0 0h24v24H0V0z"/>
                <Path scale={2} d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
                      stroke={color} fill={color} strokeWidth={.05} />
            </Svg>
            </View>
        )
    }
    renderBackArrow = (size,color) => {
        return(
            <View style={styles.iconContainer}>

            <Svg  width={48} height={48}>
                <Path fill="none" d="M0 0h24v24H0V0z"/>
                <Path scale={2} d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
                      stroke={color} fill={color} strokeWidth={.05} />
            </Svg>
            </View>
        )
    }
    render() {
        let {icon,size,color} = this.props;
        if(color === undefined){
            color = "#8f8f8f"
        }
        if(icon === "compose"){
            return this.renderCompose(size,color)
        }
        else if(icon === "feed"){
            return this.renderFeed(size,color)
        }
        else if(icon === "settings"){
            return this.renderSettings(size,color)
        }
        else if(icon === "backArrow"){
            return this.renderBackArrow(size,color)
        }
        else{
            return null
        }
    }
}
const styles = StyleSheet.create({
    iconContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    }
})
