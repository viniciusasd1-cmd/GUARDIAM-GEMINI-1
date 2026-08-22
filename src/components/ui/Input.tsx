import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'light' | 'dark';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  variant = 'light',
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  const isDark = variant === 'dark';

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
            },
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: isDark
              ? colors.dark.surfaceSubtle
              : colors.light.surface,
            borderColor: error
              ? colors.status.error
              : isDark
              ? colors.dark.surfaceBorder
              : colors.light.surfaceBorder,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconBox}>{leftIcon}</View>}

        <TextInput
          placeholderTextColor={
            isDark ? colors.dark.textMuted : colors.light.textMuted
          }
          style={[
            styles.input,
            {
              color: isDark ? colors.dark.textPrimary : colors.light.textPrimary,
            },
            inputStyle,
          ]}
          {...textInputProps}
        />

        {rightIcon && <View style={styles.iconBox}>{rightIcon}</View>}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text
          style={[
            styles.helperText,
            {
              color: isDark ? colors.dark.textSecondary : colors.light.textSecondary,
            },
          ]}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: spacing.xs,
    width: '100%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: borderRadius.base,
    paddingHorizontal: spacing.md,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    paddingVertical: spacing.sm,
  },
  iconBox: {
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    color: colors.status.error,
    fontWeight: typography.fontWeight.medium,
  },
  helperText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
  },
});
