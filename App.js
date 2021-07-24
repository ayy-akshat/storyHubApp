import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExS from './screens/exploreScreen';
import WrS from './screens/writeScreen';

export default class App extends React.Component
{
  render()
  {
    return (
      <View style={styles.container}>
        <AppNav/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const tabNav = createBottomTabNavigator({
  Explore: {
    screen: ExS
  },
  Write: {
    screen: WrS
  }
},
{
  defaultNavigationOptions: ({navigation}) => ({
    tabBarIcon: () => {
      const routeName = navigation.state.routeName;
      
      if (routeName === "Explore")
      {
        return (
          <Image
          source={
            require("./assets/read.png")
          }
          style={{
            width: 40,
            height: 40
          }}
          />
        )
      }
      else if (routeName === "Write")
      {
        return (
          <Image
          source={
            require("./assets/write.png")
          }
          style={{
            width: 40,
            height: 40
          }}
          />
        )
      }
    }
  })
});

const AppNav = createAppContainer(tabNav);