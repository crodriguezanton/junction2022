import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ExploreScreen} from '../../screens/Explore/ExploreScreen';
import {
  useTheme,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import { MyData } from '../../screens/MyData/MyData';
import { Insights } from '../../screens/Insights/Insights';
import { Wallet } from '../../screens/Wallet/Wallet';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const icons = {
  Explore: {
    icon: 'search',
  },
  'My Data': {
    icon: 'storage',
  },
  Wallet: {
    icon: 'attach-money',
  },
  Insights: {
    icon: 'bar-chart',
  },
};

export const TabNavigator = () => {
  const theme = useTheme();
  const activeColor = 'rgb(6, 193, 103)';
  const inactiveColor = theme['color-basic-100'];

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color}) => {
            return (
              <Icon
                name={icons[route.name].icon}
                size={30}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: activeColor,
          inactiveTintColor: inactiveColor,
          style: {
            //paddingTop: 10,
            //paddingBottom: 15,
            backgroundColor: "black",
          },
        }}>
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="My Data" component={MyData} />
        <Tab.Screen name="Wallet" component={Wallet} />
        <Tab.Screen name="Insights" component={Insights} />
      </Tab.Navigator>
    </>
  );
};




