import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExS from './screens/exploreScreen';
import WrS from './screens/writeScreen';
import LS from './logInScreen';

export default class App extends React.Component
{
  render()
  {
    return (
      <View style={styles.container}>
        <FullNav/>
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

const nav = createSwitchNavigator({
  Login: {
    screen: LS
  },
  MainApp: {
    screen: () => <AppNav/>
  }
});

const FullNav = createAppContainer(nav);