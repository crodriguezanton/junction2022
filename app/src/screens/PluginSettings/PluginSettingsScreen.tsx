import React, {  } from "react";
import { Text, CheckBox } from "@ui-kitten/components";
import { Screen } from "../../shared/layout/Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { Spacer, SPACING } from "../../atoms/layout/Spacer";
import { PluginRepository } from "../../settings/PluginRepository";
import Icon from 'react-native-vector-icons/MaterialIcons';

export const PluginSettingsScreen = props => {
  const repository = new PluginRepository();
  const provider = repository.findOne(props.route.params.key);

  const onPressBack = () => {
    props.navigation.goBack();
  };

  return (
    <Screen
      edges={["top"]}
      style={{ paddingTop: 10, paddingHorizontal: SPACING.M, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
        }}>
        <TouchableOpacity onPress={onPressBack}>
          <Icon style={{color: "white"}} size={30} name="arrow-back" />
        </TouchableOpacity>
      </View>

      <Spacer vertical={"S"} />

      <Text category="h1">{provider?.name}</Text>
      
      <Spacer vertical={"L"} />

      <View
        style={{
          alignItems: 'flex-start'
        }}
      >
        {provider.settings.map(setting => {
          return (
            <>
              <CheckBox
                checked={setting?.enabled}>
                  {setting.text}
              </CheckBox>
              <Spacer vertical={"M"} />
            </>
          );
        })}
      </View>

      <Spacer vertical={"XXXL"} />
      <View
        style = {{
          alignItems: "center",
        }}>
        <Text style = {{color: "red"}} category="s1">Stop owning my data</Text>
      </View>


    </Screen>
  );
};
