import React, {ReactNode} from 'react';
import {View, ViewStyle} from 'react-native';
import {Layout, StyleService, useStyleSheet} from '@ui-kitten/components';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  children?: ReactNode;
  edges?: Edge[];
  style?: ViewStyle;
}

export const Screen = ({children, edges=["top", "bottom"], style}: Props) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={[styles.container, style]}>
      <SafeAreaView
        edges={edges}
        style={{
          flex: 1,
        }}>
        <View style={styles.container}>{children}</View>
      </SafeAreaView>
    </Layout>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});
