import React from 'react';
import {View, ViewProps} from 'react-native';

export enum SPACING {
  XXS = 4,
  XS = 8,
  S = 16,
  M = 24,
  L = 32,
  XL = 40,
  XXL = 64,
  XXXL = 96,
  FULL = '100%',
}

export type SpacingValues = keyof typeof SPACING;

export const Spacer = ({
  vertical,
  horizontal,
  style,
  ...props
}: {
  vertical?: SpacingValues | number;
  horizontal?: SpacingValues | number;
} & ViewProps) => (
  <View
    style={[
      {
        width:
          typeof horizontal === 'number'
            ? horizontal
            : SPACING[(horizontal as SpacingValues) || 'FULL'],
        height:
          typeof vertical === 'number' ? vertical : SPACING[vertical || 'FULL'],
      },
      style,
    ]}
    {...props}
  />
);
