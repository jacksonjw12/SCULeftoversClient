import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

// const GET_SIGNED_URL = gql`
// {
//     User{
//       id
//       email
//       signed_url
//     }
//   }
// `;


const UPLOAD_POST = gql`
mutation createPost($title: String, $pictureURL:String!) {
  createPost(
    title: $title,
    pictureURL: $pictureURL
   
  ) {
    id
   
  }
}`

class SubmitPostComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
        }
    }

    uploadImage() {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:8000/requestImageUpload`, {
                credentials: 'same-origin',
            }).then(response => response.json())
                .then((response) => {
                    console.log(response)
                    const xhr = new XMLHttpRequest()
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                console.log('image uploaded successfully')
                                resolve(xhr._url.split("?")[0])
                            } else {
                                console.log(xhr)
                                console.log('image failed to upload')
                                reject(new Error('image failed to upload'));
                            }
                        }
                    }
                    xhr.open('PUT', response.url)
                    xhr.setRequestHeader('Content-Type', 'image/jpg')
                    //xhr.setRequestHeader('x-amz-acl', 'authenticated-read');
                    xhr.send({uri: this.props.pictureURI, type: 'image/jpg', name: response.key})
                    //xhr.send(this.props.pictureURI)

                   // resolve(response)
                })

        })
    }

    submitPost() {
        this.uploadImage().then((response) => {
            console.log(response)
            console.log("continue post upload")
            this.props.uploadPost({
              variables: { title: "Test Title", pictureURL: response },
            })
              .then((response) => {
                  console.log(response)
                  this.props.navigate("feed")

              })
        })
    }

    //   async uploadImage() {
    //
    //     const presignedUrl = this.props.getSignedURL.signed_url;
    //
    //     console.log('presigned url:', presignedUrl);
    //     console.log('file path: ', this.props.pictureURI);
    //     const xhr = new XMLHttpRequest()
    //     xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //       if (xhr.status === 200) {
    //         console.log('image uploaded successfully')
    //       } else {
    //         console.log('image failed to upload')
    //       }
    //     }
    //     }
    //     xhr.open('PUT', presignedUrl)
    //     xhr.setRequestHeader('Content-Type', 'image/jpeg')
    //     xhr.send({ uri: this.props.pictureURI, type: 'image/jpeg', name: 'photo.jpeg' })
    // };

    render() {
        return (
            <TouchableOpacity
                style={styles.submitButton}
                onPress={() => this.submitPost()}>

                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        );

    }
}

const SubmitPost = compose(
    graphql(UPLOAD_POST, {name: 'uploadPost'}),
)(SubmitPostComponent)
export default SubmitPost


const styles = StyleSheet.create({
    plusButton: {
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#9d2235',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        height: 30,
        top: 12
    },
    submitButton: {
        marginRight: 40,
        marginLeft: 40,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#9d2235',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        bottom: 5,
        width: 100,
        height: 40
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    tagItem: {
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#ADD8E6',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'gray',
        height: 30,
        top: 12
    }
});
