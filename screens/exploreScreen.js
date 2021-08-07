import React from 'react';
import { FlatList, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Post from '../components/storyPost';
import db from '../dbConfig';
import searchCheck from '../searchCheck';

const REFRESH1 = "Load more stories";
const REFRESH2 = "Loading more stories...";

const RELOAD1 = "Reload stories";
const RELOAD2 = "Reloading...";

const LOADINGSTORIESTEXT = "LOADING STORIES...";

export default class ExploreScreen extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {allStories: [], refreshBtn: REFRESH1, reloadBtn: "Reload", searchInput: "", lastLoadedStory: null};
  }

  componentDidMount()
  {
    this.getStories();
  }

  render()
  {
      return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>
            Explore Stories
          </Text>
        </View>

        <View style={styles.topTxtContainer}>
          <Text style={styles.topTxt}>
            Keep scrolling to load new stories.
          </Text>
          <Text style={styles.topTxt}>
            NOTE: As stories load, duplicate stories might start to come. To reload, click reload.
          </Text>
          <Text style={styles.topTxt}>
          If you don't see recent stories, click reload.
          </Text>
        </View>

        <TouchableOpacity style={styles.btn} onPress={this.reloadStories}>
          <Text style={styles.btnTxt}>
            {this.state.reloadBtn}
          </Text>
        </TouchableOpacity>

        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
          <TextInput
          placeholder="Search..."
          onChangeText={(text) => {this.setState({searchInput: text})}}
          style={styles.searchTxtInput}
          value={this.state.searchInput}
          />
          <TouchableOpacity style={{justifyContent: 'center',
          backgroundColor: '#dddddd',
          width: 50,
          height: 50,
          borderWidth: 2,
          borderRadius: 25,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          alignItems: 'center',
          marginLeft: -2}}
          onPress={() => {
            this.setState({searchInput: ""});
          }}>
            <Text>
              X
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.topTxt, {marginTop: 10}]}>
          {this.state.searchInput.length === 0 ? this.state.allStories.length.toString() + " stories loaded" : "Showing results for \"" + this.state.searchInput + "\":"}
        </Text>

        <FlatList
        data={(this.state.refreshBtn === REFRESH1 ? this.state.allStories : [...this.state.allStories, {loadingMore: true}])}
        renderItem={({item}) => {

          if (item.loadingMore)
          {
            return (
              <Text style={{
                fontSize: 50,
                marginVertical: 100,
                color: '#aaaaaa',
                alignSelf: 'center',
                textAlign: 'center'
              }}>
                {LOADINGSTORIESTEXT}
              </Text>
            );
          }
          else
          {
            if (searchCheck(this.state.searchInput, item.data().title + item.data().author + item.data().story))
            {
              return (
                <Post
                title={item.data().title}
                author={item.data().author}
                story={item.data().story}
                time={item.data().time}
                />
              );
            }
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        style={{maxWidth: "100%"}}
        onEndReached={this.getStories}
        onEndReachedThreshold={0.1}
        >

        </FlatList>
          
      </KeyboardAvoidingView>
      );
  }

  reloadStories = async () =>
  {
    this.setState({reloadBtn: RELOAD2});
    await this.setState({allStories: [], lastLoadedStory: null});
    await this.getStories();
    this.setState({reloadBtn: RELOAD1});
  }

  getStories = async () =>
  {
    if (this.state.refreshBtn !== REFRESH1)
    {
      return;
    }
    this.setState({refreshBtn: REFRESH2});
    var dbStories;
    if (this.state.lastLoadedStory)
    {
      dbStories = (await db.collection("stories").orderBy("time", "desc").startAfter(this.state.lastLoadedStory).limit(5).get()).docs;
      console.log("last story: ", this.state.lastLoadedStory.data().title);
    }
    else
    {
      dbStories = (await db.collection("stories").orderBy("time", "desc")                                       .limit(5).get()).docs;
    }

    console.log("dbStories", dbStories.map(d => d.data().title));

    var o = {}

    let lastStory;
    dbStories.map((doc) =>
    {
      o[doc.id] = doc;
      lastStory = doc;
    });

    let s = [];
    for (var i in o)
    {
      s.push(o[i]);
    }

    s = s.sort((a,b) => b.time-a.time);

    var all = this.state.allStories;

    for (var i in s)
    {
      all.push(s[i]);
    }
    
    this.setState({allStories: all, refreshBtn: REFRESH1, lastLoadedStory: lastStory});

    console.log(all);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: "100%",
    backgroundColor: "#cdcdcd",
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
    fontWeight: 'bold',
    marginTop: 40
  },
  btn: {
    width: 300,
    maxWidth: "95%",
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
    backgroundColor: "#aaaaaa",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  btnTxt: {
    fontSize: 25,
    color: "#444444"
  },
  searchTxtInput: {
    borderWidth: 2,
    borderRadius: 25,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    minHeight: 50,
    height: 50,
    width: 300,
    maxWidth: "95%",
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: '#ededed'
  },
  topTxtContainer: {
    marginBottom: 10,
    marginHorizontal: 10
  },
  topTxt: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#444444',
    marginVertical: 1
  }
});