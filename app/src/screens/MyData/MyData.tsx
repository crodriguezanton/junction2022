import React, { useCallback, useState } from "react";
import { Text } from "@ui-kitten/components";
import { Screen } from "../../shared/layout/Screen";
import { SectionList } from "react-native";
import { Spacer, SPACING } from "../../atoms/layout/Spacer";
import { PluginCardFull } from "../../molecules/PluginCardFull";
import { PluginRepository } from "../../settings/PluginRepository";
import { useFocusEffect } from "@react-navigation/native";

export const MyData = () => {
  const [plugins, setPlugins] = useState(
    new PluginRepository()
      .findAll()
      .filter(plugin => plugin.connectedByCurrentUser),
  );

  useFocusEffect(
    useCallback(() => {
      setPlugins(
        new PluginRepository()
          .findAll()
          .filter(plugin => plugin.connectedByCurrentUser),
      );
    }, []),
  );

  return (
    <Screen
      edges={["top"]}
      style={{ paddingTop: 10, paddingHorizontal: SPACING.M, flex: 1 }}>
      <Text category="h1">My Data</Text>
      <Spacer vertical={"L"} />
      <Text category="h5">Manage all services you've reclaimed data ownership from:</Text>
      <Spacer vertical={"L"} />

      <SectionList
        style={{ flex: 1, width: "100%" }}
        sections={[
          {
            title: "not monetizing",
            data: plugins.filter(plugin => !plugin.enabled),
          },
          {
            title: "monetizing 💲💲💲",
            data: plugins.filter(plugin => plugin.enabled),
          },
        ]}

        renderSectionHeader={({ section }) => (
          <>
            <Text category="h6">{`${section.data.length} service(s) ${section.title}`}</Text>
            <Spacer vertical={"S"} />
          </>
        )}
        renderSectionFooter={({ section }) => <Spacer vertical={"L"} />}
        renderItem={({ item }) => (
          <PluginCardFull
            item={item}
            subtitle={!item.enabled ? "monetize" : undefined}
          />
        )}
        keyExtractor={item => item.name.toString()}
        ItemSeparatorComponent={() => <Spacer vertical="XS" />}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
      />
    </Screen>
  );
};
