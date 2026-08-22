import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing, borderRadius } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

export interface CardProps extends ViewProps {
  variant?: 'light' | 'dark' | 'emergency' | 'outlined';
  elevated?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'light',
  elevated = true,
  style,
  children,
  ...viewProps
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return {
          backgroundColor: colors.dark.surface,
          borderColor: colors.dark.surfaceBorder,
        };
      case 'emergency':
        return {
          backgroundColor: colors.emergency.surface,
          borderColor: colors.emergency.surfaceBorder,
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          borderColor: colors.light.surfaceBorder,
        };
      case 'light':
      default:
        return {
          backgroundColor: colors.light.surface,
          borderColor: colors.light.surfaceBorder,
        };
    }
  };

  const vStyles = getVariantStyles();

  return (
    <View
      style={[
        styles.base,
        vStyles,
        elevated && variant === 'light' ? shadows.sm : undefined,
        style,
      ]}
      {...viewProps}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.base,
  },
});
