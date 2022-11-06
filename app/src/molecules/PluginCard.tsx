import React from 'react';
import {Text} from '@ui-kitten/components';
import {Image, View} from 'react-native';
import {Plugin} from '../models/Plugin';
import {Spacer} from '../atoms/layout/Spacer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export const PluginCard = ({item}: {item: Plugin}) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('PluginDetailScreen', {
      key: item.key,
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: item.backgroundColor,
          borderWidth: 0,
          borderRadius: 15,
          width: 168,
          height: 90,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={item.logo}
        />
        <Spacer vertical={'XS'} />
        <Text category="h6">{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
