import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import env from '../environment'
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
        this.post = {}
    }

    uploadImage() {
        return new Promise((resolve, reject) => {
            fetch(env.server + `/requestImageUpload`, {
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
    beginSubmit() {
        this.post = this.props.getPostData()
        if(this.post.ready){
            this.post.data = {
                allergens:this.post.allergens,
                expiration:this.post.expireTime,
                location:this.post.location
            }
            this.submitPost()
            // console.log(this.post)
            // console.log("would have submitted post")
        }

    }
    submitPost() {
        this.uploadImage().then((response) => {
            console.log(response)
            console.log("continue post upload")
            this.props.uploadPost({
              variables: { title: this.post.title, pictureURL: response, data:this.post.data },
            })
              .then((response) => {
                  console.log(response)
                  //this.props.navigate("feed")
                  this.props.handlePost()

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
                onPress={() => this.beginSubmit()}>

                <Text style={styles.buttonText}>Post</Text>
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
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#9d2235',
        bottom: 5,
        width: 100,
        height: 40
    },
    buttonText: {
        color: '#9d2235',
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
