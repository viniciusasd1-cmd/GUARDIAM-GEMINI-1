import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
  leftAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  rightAction?: {
    icon: React.ReactNode;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'GUARDIAM',
  subtitle,
  variant = 'light',
  leftAction,
  rightAction,
  style,
}) => {
  const isDark = variant === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.dark.background : colors.light.background,
          borderBottomColor: isDark
            ? colors.dark.surfaceBorder
            : colors.light.surfaceBorder,
        },
        style,
      ]}
    >
      <View style={styles.actionBox}>
        {leftAction ? (
          <Pressable
            onPress={leftAction.onPress}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: isDark
                  ? colors.dark.surfaceSubtle
                  : colors.light.surface,
                borderColor: isDark
                  ? colors.dark.surfaceBorder
                  : colors.light.surfaceBorder,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            {leftAction.icon}
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      <View style={styles.titleContainer}>
        <Text
          style={[
            styles.title,
            {
              color: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
            },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[
              styles.subtitle,
              {
                color: isDark
                  ? colors.dark.textSecondary
                  : colors.light.textSecondary,
              },
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.actionBox}>
        {rightAction ? (
          <Pressable
            onPress={rightAction.onPress}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: isDark
                  ? colors.dark.surfaceSubtle
                  : colors.light.surface,
                borderColor: isDark
                  ? colors.dark.surfaceBorder
                  : colors.light.surfaceBorder,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            {rightAction.icon}
          </Pressable>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
  },
  actionBox: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.base,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.extrabold,
    letterSpacing: typography.letterSpacing.wide,
  },
  subtitle: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    marginTop: 2,
  },
});
