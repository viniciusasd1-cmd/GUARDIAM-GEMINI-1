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
import { spacing } from '../../theme/spacing';

export interface TabItem {
  key: string;
  label: string;
  icon: (focused: boolean) => React.ReactNode;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (key: string) => void;
  variant?: 'light' | 'dark';
  style?: ViewStyle;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
  variant = 'light',
  style,
}) => {
  const isDark = variant === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? colors.dark.surface : colors.light.surface,
          borderTopColor: isDark
            ? colors.dark.surfaceBorder
            : colors.light.surfaceBorder,
        },
        style,
      ]}
    >
      {tabs.map((tab) => {
        const isFocused = activeTab === tab.key;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={({ pressed }) => [
              styles.tabButton,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            {tab.icon(isFocused)}
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused
                    ? isDark
                      ? colors.dark.accent
                      : colors.primary.DEFAULT
                    : isDark
                    ? colors.dark.textMuted
                    : colors.light.textMuted,
                  fontWeight: isFocused
                    ? typography.fontWeight.bold
                    : typography.fontWeight.medium,
                },
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.base,
    borderTopWidth: 1,
    minHeight: 60,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    gap: 4,
    minWidth: 64,
  },
  tabLabel: {
    fontSize: typography.fontSize.xs,
  },
});
