import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';
import { shadows } from '../../theme/shadows';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'activeDark';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
        };
      case 'danger':
        return {
          container: styles.dangerContainer,
          text: styles.dangerText,
        };
      case 'outline':
        return {
          container: styles.outlineContainer,
          text: styles.outlineText,
        };
      case 'ghost':
        return {
          container: styles.ghostContainer,
          text: styles.ghostText,
        };
      case 'activeDark':
        return {
          container: styles.activeDarkContainer,
          text: styles.activeDarkText,
        };
      case 'primary':
      default:
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: spacing.xs + 2,
          paddingHorizontal: spacing.md,
          fontSize: typography.fontSize.sm,
          height: 36,
        };
      case 'lg':
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.xl,
          fontSize: typography.fontSize.lg,
          height: 54,
        };
      case 'md':
      default:
        return {
          paddingVertical: spacing.sm + 2,
          paddingHorizontal: spacing.base,
          fontSize: typography.fontSize.base,
          height: 46,
        };
    }
  };

  const vStyles = getVariantStyles();
  const sStyles = getSizeStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.baseContainer,
        vStyles.container,
        {
          paddingVertical: sStyles.paddingVertical,
          paddingHorizontal: sStyles.paddingHorizontal,
          minHeight: sStyles.height,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'outline' || variant === 'ghost'
              ? colors.primary.DEFAULT
              : '#FFFFFF'
          }
          size="small"
        />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.baseText,
              vStyles.text,
              { fontSize: sStyles.fontSize },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.base,
    gap: spacing.sm,
    ...shadows.sm,
  },
  baseText: {
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
  primaryContainer: {
    backgroundColor: colors.primary.DEFAULT,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryContainer: {
    backgroundColor: colors.light.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.light.surfaceBorder,
  },
  secondaryText: {
    color: colors.light.textPrimary,
  },
  dangerContainer: {
    backgroundColor: colors.emergency.accent,
  },
  dangerText: {
    color: '#FFFFFF',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.primary.DEFAULT,
  },
  outlineText: {
    color: colors.primary.DEFAULT,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  ghostText: {
    color: colors.light.textSecondary,
  },
  activeDarkContainer: {
    backgroundColor: colors.dark.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.dark.accent,
  },
  activeDarkText: {
    color: colors.dark.accent,
  },
});
