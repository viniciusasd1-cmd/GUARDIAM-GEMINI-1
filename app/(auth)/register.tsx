import React, { useState } from 'react';
import {
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

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegisterPress = async () => {
    setErrorMessage(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Por favor, informe seu email.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('A senha deve conter no mínimo 6 caracteres.');
      return;
    }

    try {
      setIsLoading(true);
      await register({
        name: trimmedName,
        email: trimmedEmail,
        password,
        phone: trimmedPhone || undefined,
      });
      // Cadastro com sucesso real
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    if (isLoading) return;
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(auth)/login');
    }
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
            <Text style={styles.title}>Crie sua proteção.</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {errorMessage && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorBannerText}>{errorMessage}</Text>
              </View>
            )}

            <Input
              label="Nome"
              placeholder="Seu nome completo"
              value={name}
              onChangeText={(text) => {
                setName(text);
                if (errorMessage) setErrorMessage(null);
              }}
              autoCapitalize="words"
              editable={!isLoading}
            />

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
              label="Telefone (opcional)"
              placeholder="(11) 99999-9999"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
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
                title="Criar Conta"
                variant="primary"
                size="lg"
                loading={isLoading}
                disabled={isLoading}
                onPress={handleRegisterPress}
              />
            </View>
          </View>

          {/* Footer Navigation Link */}
          <View style={styles.footer}>
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Já tem conta? </Text>
              <Pressable
                onPress={handleNavigateToLogin}
                disabled={isLoading}
                style={({ pressed }) => [
                  styles.loginLinkPressable,
                  { opacity: pressed || isLoading ? 0.7 : 1 },
                ]}
              >
                <Text style={styles.loginLinkText}>Entrar.</Text>
              </Pressable>
            </View>
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
    paddingTop: spacing.sm,
  },
  title: {
    marginTop: spacing.md,
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.light.textPrimary,
    letterSpacing: typography.letterSpacing.tight,
  },
  formContainer: {
    width: '100%',
    maxWidth: 360,
    alignSelf: 'center',
    gap: spacing.md,
    marginVertical: spacing.lg,
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
    paddingTop: spacing.xs,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.xs,
    color: colors.light.textSecondary,
  },
  loginLinkPressable: {
    paddingVertical: spacing.xs,
  },
  loginLinkText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    color: colors.primary.DEFAULT,
  },
});
