import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import db from '../dbConfig';
import firebase from 'firebase';

export default class WriteScreen extends React.Component
{
    constructor()
    {
        super();
        this.state = {
            titleInputTxt: "",
            authorInputTxt: "",
            storyInputTxt: ""
        }
    }

    render()
    {
        return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>
                    Post a Story
                </Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={[styles.titleInput, styles.input]}
                placeholder="Story Title"
                onChangeText={
                    (text) => {
                        this.setState({titleInputTxt: text});
                    }
                }
                />
                <TextInput style={[styles.authorInput, styles.input]}
                placeholder="Story Author"
                onChangeText={
                    (text) => {
                        this.setState({authorInputTxt: text});
                    }
                }
                />
                
                <TextInput style={[styles.storyInput, styles.input]}
                placeholder="Write your story here..."
                multiline={true}
                onChangeText={
                    (text) => {
                        this.setState({storyInputTxt: text});
                    }
                }
                />
                
                <TouchableOpacity style={styles.postBtn} onPress={this.postStory}>
                    <Text style={styles.postBtnTxt}>
                        Post Story
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    postStory = async () =>
    {
        db.collection("stories").add(
            {
                title: this.state.titleInputTxt,
                author: this.state.authorInputTxt,
                story: this.state.storyInputTxt,
                time: firebase.firestore.Timestamp.now().toDate().getTime()
            }
        )
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#cdcdcd"
  },
  header: {
      height: 100,
      width: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#bcbcbc",
      marginBottom: 20,
  },
  headerTxt: {
      fontSize: 30,
      fontWeight: 'bold'
  },
  inputContainer: {
      borderWidth: 2,
      borderColor: 'silver',
      padding: 50,
      width: 800,
      alignItems: 'center',
      maxWidth: "100%",
      backgroundColor: "#eeeeee"
  },
  input: {
      backgroundColor: "white"
  },
  titleInput: {
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 20,
      width: 500,
      height: 50,
      maxWidth: "100%",
      paddingHorizontal: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      alignSelf: 'center',
  },
  authorInput: {
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 20,
      width: 450,
      height: 50,
      maxWidth: "90%",
      paddingHorizontal: 20,
      marginTop: -2,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      alignSelf: 'center',
  },
  storyInput: {
      borderWidth: 2,
      borderRadius: 20,
      padding: 50,
      paddingVertical: 20,
      width: 500,
      height: 400,
      marginVertical: 20,
      maxWidth: "100%",
      textAlign: 'left',
      textAlignVertical: 'top'
  },
  postBtn: {
      width: 500,
      maxWidth: "100%",
      height: 100,
      backgroundColor: "silver",
      padding: 30,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center'
  },
  postBtnTxt: {
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
  }
});