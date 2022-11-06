import { Avatar, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, View } from "react-native";
import { Spacer } from "../../atoms/layout/Spacer";

export const detailComponentFactory = (
  type: string,
  data: any[],
): React.ReactElement => {
  switch (type) {
    case "LastFM":
      return (
        <>
          {data?.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  <Avatar
                    source={
                      item.image
                        ? { uri: item.image }
                        : require("../../media/note.jpg")
                    }
                  />
                  <View
                    style={{
                      paddingLeft: 10,
                    }}>
                    <Text category="h6">{item.name}</Text>
                    <Spacer vertical={"XXS"} />
                    <Text category="s2">{item.artist}</Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.name}
              ItemSeparatorComponent={() => <Spacer vertical="M" />}
            />
          )}
        </>
      );
    case "ios-health":
      return (
        <>
          {data?.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data.reverse()}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  <View>
                    <Text category="h6">{item.heartRate} BPM</Text>
                    <Spacer vertical={"XXS"} />
                    <Text category="s2">
                      {item.timestamp.format("DD/MM/YYYY HH:mm")}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.name}
              ItemSeparatorComponent={() => <Spacer vertical="M" />}
            />
          )}
        </>
      );
    case "FakeBank":
      return (
        <>
          {data?.length > 0 && (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                  }}>
                  <View
                    style={{
                      flexDirection: "column",
                    }}>
                    <Text category="h6">{item.description}</Text>
                    <Spacer vertical={"XS"} />
                    <Text>{item.date}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "flex-end",
                      justifyContent: "center",
                    }}>
                    <Text category="s1">{`${item.amount} ${item.currency}`}</Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={() => <Spacer vertical="M" />}
            />
          )}
        </>
      );
    default:
      return <></>;
  }
};
