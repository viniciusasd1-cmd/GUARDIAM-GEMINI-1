import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
  style?: ViewStyle;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  showSubtitle = true,
  style,
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: { container: 36, text: 16, subText: 10, radius: borderRadius.md },
    md: { container: 48, text: 22, subText: 12, radius: borderRadius.lg },
    lg: { container: 64, text: 28, subText: 14, radius: borderRadius.xl },
  };

  const dim = iconSizes[size];

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconBox,
          {
            width: dim.container,
            height: dim.container,
            borderRadius: dim.radius,
            backgroundColor: isDark ? colors.dark.surfaceSubtle : colors.primary[50],
            borderColor: isDark ? colors.dark.accent : colors.primary[200],
          },
        ]}
      >
        <Text
          style={[
            styles.shieldSymbol,
            {
              fontSize: dim.text,
              color: isDark ? colors.dark.accent : colors.primary[600],
            },
          ]}
        >
          🛡️
        </Text>
      </View>

      <Text
        style={[
          styles.title,
          {
            fontSize: dim.text,
            color: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
          },
        ]}
      >
        GUARDIAM
      </Text>

      {showSubtitle && (
        <Text
          style={[
            styles.subtitle,
            {
              fontSize: dim.subText,
              color: isDark ? colors.dark.textSecondary : colors.light.textSecondary,
            },
          ]}
        >
          Proteção Pessoal em Tempo Real
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginBottom: spacing.xs,
  },
  shieldSymbol: {
    textAlign: 'center',
  },
  title: {
    fontWeight: typography.fontWeight.extrabold,
    letterSpacing: typography.letterSpacing.widest,
  },
  subtitle: {
    fontWeight: typography.fontWeight.medium,
  },
});
