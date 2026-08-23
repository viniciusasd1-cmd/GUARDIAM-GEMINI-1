import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Logo } from '../../src/components/ui/Logo';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { colors } from '../../src/theme/colors';
import { typography } from '../../src/theme/typography';
import { spacing } from '../../src/theme/spacing';
import { useAuth } from '../../src/auth/AuthContext';
import { ApiError } from '../../src/api/apiClient';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLoginPress = async () => {
    setErrorMessage(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMessage('Por favor, informe seu email.');
      return;
    }

    if (!password) {
      setErrorMessage('Por favor, informe sua senha.');
      return;
    }

    try {
      setIsLoading(true);
      await login({
        email: trimmedEmail,
        password,
      });
      // Login com sucesso real
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro ao entrar. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperação de Senha', 'Recuperação de conta será conectada em breve.');
  };

  const handleNavigateToRegister = () => {
    if (isLoading) return;
    router.push('/(auth)/register');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Top Section with Centered Shield Emblem */}
          <View style={styles.topSection}>
            <Logo size="lg" variant="light" showSubtitle={false} />
            <Text style={styles.title}>Acesse sua conta.</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {errorMessage && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{errorMessage}</Text>
              </View>
            )}

            <Input
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errorMessage) setErrorMessage(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errorMessage) setErrorMessage(null);
              }}
              secureTextEntry
              editable={!isLoading}
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Entrar"
                variant="primary"
                size="lg"
                loading={isLoading}
                disabled={isLoading}
                onPress={handleLoginPress}
              />

              <Pressable
                onPress={handleForgotPassword}
                disabled={isLoading}
                style={({ pressed }) => [
                  styles.forgotButton,
                  { opacity: pressed || isLoading ? 0.7 : 1 },
                ]}
              >
                <Text style={styles.forgotText}>Esqueceu a senha?</Text>
              </Pressable>
            </View>
          </View>

          {/* Footer Navigation Link */}
          <View style={styles.footer}>
            <Pressable
              onPress={handleNavigateToRegister}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.signupLinkPressable,
                { opacity: pressed || isLoading ? 0.7 : 1 },
              ]}
            >
              <Text style={styles.signupLinkText}>Criar conta.</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
  },
  topSection: {
    alignItems: 'center',
    paddingTop: spacing.base,
  },
  title: {
    marginTop: spacing.lg,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.light.textPrimary,
    letterSpacing: typography.letterSpacing.tight,
  },
  formContainer: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    gap: spacing.base,
    marginVertical: spacing.xl,
  },
  errorBanner: {
    backgroundColor: colors.status.errorBg,
    borderColor: colors.status.errorBorder,
    borderWidth: 1,
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  errorBannerText: {
    color: colors.status.error,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingTop: spacing.sm,
    gap: spacing.md,
  },
  forgotButton: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  forgotText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.primary.DEFAULT,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  signupLinkPressable: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  signupLinkText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.DEFAULT,
  },
});
