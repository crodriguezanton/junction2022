import React, { useState } from "react";
import { Avatar, Input, Layout, Text } from "@ui-kitten/components";
import { Screen } from "../../shared/layout/Screen";
import { FlatList, Image, View } from "react-native";
import { Spacer, SPACING } from "../../atoms/layout/Spacer";
import { PluginCard } from "../../molecules/PluginCard";
import { PluginCardFull } from "../../molecules/PluginCardFull";
import { PluginRepository } from "../../settings/PluginRepository";
import Icon from 'react-native-vector-icons/MaterialIcons';

export const ExploreScreen = () => {
  const [searchText, setSearchText] = useState("");

  const pluginRepository = new PluginRepository();
  const hightlihgtedPlugins = pluginRepository.findHighlighted();
  const plugins = pluginRepository.findAll().sort((a,b) => b.enabled == true ? 0:-1);

  return (
    <Screen edges={["top"]}>
      <View style = {{
          paddingHorizontal: SPACING.M,
          backgroundColor: "black",
          paddingVertical: 10,
          }}>
        <Image 
          style = {{
            height: 24,
            width: 120,
            }}
          source = {require("../../media/dataringlogo.png")}/>
      </View>
      
      <Layout
        style={{
          paddingHorizontal: SPACING.M,
          flexDirection: "row",
          backgroundColor: "black",
        }}>
        {/* <Layout
        style={{backgroundColor: "black",
        }}>
         <Avatar source={require("../../media/elon-musk-2.png")} size = "giant" />
        </Layout> */}
        {/* <Layout
          style={{
            paddingVertical: 10,
            backgroundColor: "black",
          }}>
          <Text category="s1">🤑 Refer and earn</Text>
        </Layout> */}
        
        {/* <Layout
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "flex-end",
            paddingVertical: 10,
            backgroundColor: "black",
          }}>
          <Text category="s1">⚙️ Settings</Text>
          <Spacer horizontal="XS" />
          <Icon name = 'content-copy' size={10} color={"white"}/>
        </Layout> */}
      </Layout>

      <Spacer vertical={"XXS"} />

      <Layout
          style={{
            alignItems: "flex-start",
            paddingHorizontal: SPACING.M,
            backgroundColor: "black",
          }}>
          <Text category="p1">YOUR DATA. YOUR POWER.</Text>
      </Layout>

      <Spacer vertical={"XS"} />

      {/* <Input
        style={{paddingHorizontal: SPACING.M, backgroundColor: "white",}}
        size="large"
        value={searchText}
        placeholder="Search"
        accessoryRight={<Icon name={"search"} size={25}/>}
        onChangeText={nextValue => setSearchText(nextValue)}
      /> */}

      <FlatList
        style={{
          flex: 1,
          marginTop: SPACING.XS,
          paddingHorizontal: SPACING.M
        }}
        ListHeaderComponent={() => {
          return (
            <>
              <Spacer vertical={"M"} />
              <Text category="h6">⚡️ Common data reclaimed</Text>
              <Spacer vertical={"M"} />
              <FlatList
                style={{marginHorizontal: -SPACING.M}}
                contentContainerStyle={{paddingHorizontal: SPACING.M}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={hightlihgtedPlugins}
                renderItem={({ item }) => <PluginCard item={item} />}
                keyExtractor={item => item.name.toString()}
                ItemSeparatorComponent={() => <Spacer horizontal="XS" />}
              />

              <Spacer vertical={"XL"} />
              
              <Text category="h6">🔌 All online services</Text>
              <Spacer vertical={"M"} />

              <Input
                      style={{backgroundColor: "white",}}
                      size="large"
                      value={searchText}
                      placeholder="Search"
                      accessoryRight={<Icon name={"search"} size={25}/>}
                      onChangeText={nextValue => setSearchText(nextValue)}
              />
              
              <Spacer vertical={"M"} />
            </>
          );
        }}
        data={plugins}
        renderItem={({ item }) => <PluginCardFull subtitle={!item.enabled ? "connect" : undefined} item={item} />}
        keyExtractor={item => item.name.toString()}
        ItemSeparatorComponent={() => <Spacer vertical="XS" />}
      />
    </Screen>
  );
};
