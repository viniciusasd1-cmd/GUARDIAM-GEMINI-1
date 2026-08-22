import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'activeDark';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'neutral',
  size = 'md',
  style,
  textStyle,
  icon,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          bg: colors.status.successBg,
          border: colors.status.successBorder,
          text: colors.status.success,
        };
      case 'warning':
        return {
          bg: colors.status.warningBg,
          border: colors.status.warningBorder,
          text: colors.status.warning,
        };
      case 'error':
        return {
          bg: colors.status.errorBg,
          border: colors.status.errorBorder,
          text: colors.status.error,
        };
      case 'info':
        return {
          bg: colors.status.infoBg,
          border: colors.status.infoBorder,
          text: colors.status.info,
        };
      case 'activeDark':
        return {
          bg: 'rgba(56, 189, 248, 0.15)',
          border: 'rgba(56, 189, 248, 0.4)',
          text: colors.dark.accentLight,
        };
      case 'neutral':
      default:
        return {
          bg: colors.light.surfaceSubtle,
          border: colors.light.surfaceBorder,
          text: colors.light.textSecondary,
        };
    }
  };

  const v = getVariantStyles();
  const isSm = size === 'sm';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          paddingVertical: isSm ? 2 : spacing.xs,
          paddingHorizontal: isSm ? spacing.xs + 2 : spacing.sm + 2,
        },
        style,
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          {
            color: v.text,
            fontSize: isSm ? typography.fontSize.xs : typography.fontSize.sm,
          },
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: typography.fontWeight.semibold,
  },
});
