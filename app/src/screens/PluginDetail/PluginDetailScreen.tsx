import React, { useEffect, useState } from "react";
import { Text, Toggle } from "@ui-kitten/components";
import { Screen } from "../../shared/layout/Screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Image, View } from "react-native";
import { Spacer, SPACING } from "../../atoms/layout/Spacer";
import { detailComponentFactory } from "./detailComponentFactory";
import Icon from "react-native-vector-icons/MaterialIcons";
import { appController } from "../../logic/AppController";

export const PluginDetailScreen = props => {
  const [checked, setChecked] = useState(
    appController.canSellData(props.route.params.key),
  );

  const [data, setData] = useState<any>([]);

  const provider = appController.getProvider(props.route.params.key);

  const onPressBack = () => {
    props.navigation.goBack();
  };

  const onPressSettings = () => {
    props.navigation.navigate("PluginSettingsScreen", {
      key: props.route.params.key,
    });
  };

  const setup = (key: string) => {
    appController.subscribePluginView(key, delta => {
      console.log("PluginDetailScreen: delta", {data, delta});
      const newData = [...(delta || []), ...(data || [])].reverse();
      setData(newData);
    });
  };

  useEffect(() => {
    setup(props.route.params.key);
  }, []);

  return (
    <Screen
      edges={["top"]}
      style={{ paddingTop: 10, paddingHorizontal: SPACING.M, flex: 1 }}>
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
        }}>
        <TouchableOpacity onPress={onPressBack}>
          <Icon style={{ color: "white" }} size={30} name="arrow-back" />
        </TouchableOpacity>

        <Spacer style={{ flex: 1 }} horizontal={"S"} />

        <TouchableOpacity onPress={onPressSettings}>
          <Icon style={{ color: "white" }} size={30} name="settings" />
        </TouchableOpacity>
      </View>

      <Spacer vertical={"L"} />

      <View
        style={{
          backgroundColor: provider.backgroundColor,
          padding: 20,
          borderRadius: 15,
        }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}>
          <Image
            source={provider.logo}
            style={{
              width: 37,
              height: 37,
            }}
          />
          <Spacer horizontal={"S"} />
          <Text category="h4">{provider.name}</Text>
        </View>

        <Spacer vertical={"M"} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}>
        <Text category="s1">{provider.texts.monetize}</Text>
        </View>
      </View>

      <Spacer vertical={"M"} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <Text>{checked ? "Active Monetization" : "Start monetizing"}</Text>
        <Spacer horizontal={"S"} />
        <Toggle
          checked={checked}
          onChange={value => {
            appController.enable(props.route.params.key, value);
            setChecked(value);
          }}
        />
      </View>
      <Spacer vertical={"L"} />
      <Spacer vertical={"M"} />
      {detailComponentFactory(props.route.params.key, data)}
    </Screen>
  );
};
