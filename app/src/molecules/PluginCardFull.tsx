import React, { useState } from 'react';
import {Text, Toggle} from '@ui-kitten/components';
import {Image, ImageBackgroundComponent, View} from 'react-native';
import {Plugin, textKeys} from '../models/Plugin';
import {Spacer} from '../atoms/layout/Spacer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export const PluginCardFull = ({item, subtitle}: {item: Plugin, subtitle?: textKeys}) => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(true);

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
          height: 90,
          padding: 24,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexDirection: 'row',
        }}>
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={item.logo}
        />
        <Spacer horizontal={'S'} />
        <View>
          <Text category="h6">{item.name}</Text>
          {subtitle ? <Text category="s1">{item.texts[subtitle]}</Text> : null}
        </View>
        <Spacer style={{flex: 1}} horizontal={'S'} />
        <Toggle disabled = {true} checked={item.enabled} style = {{backgroundColor: "white", borderRadius: 20}}/>
      </View>
    </TouchableOpacity>
  );
};
