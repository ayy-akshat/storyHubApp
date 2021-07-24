import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Post from '../components/storyPost';
import db from '../dbConfig';

export default class ExploreScreen extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {allStories: [], refreshBtn: "Refresh"};
  }

  componentWillMount()
  {
    this.getStories();
    console.log("ok");
  }

  render()
  {
      return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>
            Explore Stories
          </Text>
        </View>

        <Text style={{
          fontStyle: 'italic',
          color: '#444444'
        }}>
          Don't see recent stories? Click the refresh button.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={this.getStories}>
          <Text style={styles.btnTxt}>
            {this.state.refreshBtn}
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.scrollViewStyle2}>

          {this.state.allStories.map((i, index) => (
            <Post
            key={index}
            title={i.title}
            author={i.author}
            story={i.story}
            time={i.time}
            />
          ))}
        </ScrollView>
          
      </View>
      );
  }

  getStories = async () =>
  {
    if (this.state.refreshBtn !== "Refresh")
    {
      return;
    }
    this.setState({refreshBtn: "Getting stories..."});
    var dbStories = (await db.collection("stories").get()).docs;
    var stories = dbStories.map(s => s.data());
    stories.sort((a,b) => b.time-a.time);
    this.setState({allStories: stories, refreshBtn: "Refresh"});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: "100%",
    backgroundColor: "#cdcdcd"
  },
  scrollViewStyle: {
    width: "100%",
    borderTopWidth: 2
  },
  scrollViewStyle2: {
    alignItems: 'center'
  },
  header: {
    height: 200,
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
  btn: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: "#aaaaaa",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  btnTxt: {
    fontSize: 30,
    color: "#444444"
  }
});