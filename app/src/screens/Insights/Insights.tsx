import React, {ReactNode} from 'react';
import {Text} from '@ui-kitten/components';
import {Screen} from '../../shared/layout/Screen';
import { View, Image, ScrollView } from "react-native";
import { Spacer, SPACING } from '../../atoms/layout/Spacer';
import Icon from 'react-native-vector-icons/MaterialIcons';

const InsightCard = ({children}: {children: ReactNode}) => {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: "gray",
        padding: 10,
        borderRadius: 10,
        minHeight: 80,
        justifyContent: "center",
      }}
    >
      {children}
    </View>
  );
}

export const Insights = () => {
  return (
    <Screen edges={["top"]} style={{ paddingTop: 10, paddingHorizontal: SPACING.M, flex: 1}}>
      <ScrollView>
        <Text category="h1">Insights</Text>

        <Spacer vertical={"M"} />

        <InsightCard>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View style={{
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}>
              <Image
                style={{
                  width: 55,
                  height: 55,
                }}
                source={require("../../media/cover-imblue.jpg")}
              />
            </View>
            <View>
              <Text category='s1'>Most played song</Text>
              <Spacer vertical={"XXS"} />
              <Text category='c1'>I'm Good (Blue)</Text>
              <Text category='c1'>David Guetta & Bebe Rexha</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end"
            }}>
              <Text category='h6'>21 times</Text>
            </View>
          </View>
        </InsightCard>

        <Spacer vertical={"M"} />

        <InsightCard>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View style={{
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}>
              <Icon
                name={"shopping-bag"}
                size={40}
                style={{
                  color: "#4C84F5"
                }}
              />
            </View>
            <View>
              <Text category='s1'>Shopping Expenses</Text>
              <Spacer vertical={"XS"} />
              <Text category='c1'>35% higher than last month</Text>
              {/* <Text category='s2'>David Guetta & Bebe Rexha</Text> */}
            </View>
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end"
            }}>
              <Text category='h6'>€257</Text>
            </View>
          </View>
        </InsightCard>

        <Spacer vertical={"M"} />

        <Text category='h5'>Mixed Insights</Text>
        
        <Spacer vertical={"S"} />

        <InsightCard>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View style={{
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}>
              <Icon
                name={"favorite"}
                size={40}
                style={{
                  color: "#F70260"
                }}
              />
            </View>
            <View>
              <Text category='s1'>Your heart rate decreases 15% when listening to Enya on Spotify</Text>
            </View>
            {/* <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end"
            }}>
              <Text category='h6'>€257</Text>
            </View> */}
          </View>
        </InsightCard>

        <Spacer vertical={"M"} />

        <InsightCard>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <View style={{
              justifyContent: "center",
              alignItems: "flex-end",
              paddingRight: 10,
            }}>
              <Icon
                name={"public"}
                size={40}
                style={{
                  color: "#35AB3D"
                }}
              />
            </View>
            <View>
              <Text category='s1'>Your CO2 footprint has decreased by</Text>
              <Text category='s1'>20% this year</Text>
            </View>
            {/* <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "flex-end"
            }}>
              <Text category='h6'>€257</Text>
            </View> */}
          </View>
        </InsightCard>

        <Spacer vertical={"M"} />

      </ScrollView>
    </Screen>
  );
};
