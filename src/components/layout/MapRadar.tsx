import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing, borderRadius } from '../../theme/spacing';

export interface MapRadarProps {
  variant?: 'light' | 'dark' | 'emergency';
  isActive?: boolean;
  statusText?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  style?: ViewStyle;
}

export const MapRadar: React.FC<MapRadarProps> = ({
  variant = 'light',
  isActive = false,
  statusText,
  latitude = -23.561684,
  longitude = -46.655981,
  accuracy = 5,
  style,
}) => {
  const isDark = variant === 'dark';
  const isEmergency = variant === 'emergency';

  const getBorderColor = () => {
    if (isEmergency) return colors.emergency.accentBorder;
    if (isDark) return colors.dark.surfaceBorder;
    return colors.light.surfaceBorder;
  };

  const getBgColor = () => {
    if (isEmergency) return colors.emergency.surface;
    if (isDark) return colors.dark.surface;
    return colors.light.surface;
  };

  const getCircleColor = () => {
    if (isEmergency) return 'rgba(220, 38, 38, 0.2)';
    if (isDark) return 'rgba(56, 189, 248, 0.15)';
    return 'rgba(21, 101, 192, 0.1)';
  };

  const getDotColor = () => {
    if (isEmergency) return colors.emergency.accent;
    if (isDark) return colors.dark.accent;
    return colors.primary.DEFAULT;
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: getBgColor(),
          borderColor: getBorderColor(),
        },
        style,
      ]}
    >
      <View style={styles.radarContainer}>
        {/* Outer Ring */}
        <View
          style={[
            styles.ring,
            {
              width: 140,
              height: 140,
              borderRadius: 70,
              borderColor: getCircleColor(),
            },
          ]}
        />
        {/* Middle Ring */}
        <View
          style={[
            styles.ring,
            {
              width: 90,
              height: 90,
              borderRadius: 45,
              borderColor: getCircleColor(),
            },
          ]}
        />
        {/* Inner Center Dot with Pulse Accent */}
        <View
          style={[
            styles.centerPulse,
            {
              backgroundColor: getCircleColor(),
            },
          ]}
        >
          <View
            style={[
              styles.centerDot,
              {
                backgroundColor: getDotColor(),
              },
            ]}
          />
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text
          style={[
            styles.statusLabel,
            {
              color: isDark || isEmergency
                ? colors.dark.textPrimary
                : colors.light.textPrimary,
            },
          ]}
        >
          {statusText || (isActive ? 'Sinal GPS Ativo (Satélite)' : 'Radar GPS Pronto')}
        </Text>
        <Text
          style={[
            styles.coordsLabel,
            {
              color: isDark || isEmergency
                ? colors.dark.textSecondary
                : colors.light.textSecondary,
            },
          ]}
        >
          {latitude.toFixed(4)}, {longitude.toFixed(4)} (±{accuracy}m)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    padding: spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  radarContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  centerPulse: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
    gap: 2,
  },
  statusLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  coordsLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.regular,
  },
});
