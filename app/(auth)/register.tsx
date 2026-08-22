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

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterPress = () => {
    // Fase 3: Apenas estático. Sem auth real, sem token fake, sem navegação para home.
    Alert.alert('Autenticação', 'Auth será conectado na Fase 4');
    console.log('Auth será conectado na Fase 4');
  };

  const handleNavigateToLogin = () => {
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
            <Input
              label="Nome"
              placeholder="Seu nome completo"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <Input
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Input
              label="Senha"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Criar Conta"
                variant="primary"
                size="lg"
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
                style={({ pressed }) => [
                  styles.loginLinkPressable,
                  { opacity: pressed ? 0.7 : 1 },
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
