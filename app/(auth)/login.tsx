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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginPress = () => {
    // Fase 3: Apenas estático. Sem auth real, sem token fake, sem navegação para home.
    Alert.alert('Autenticação', 'Auth será conectado na Fase 4');
    console.log('Auth será conectado na Fase 4');
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperação de Senha', 'Recuperação de conta será conectada na Fase 4');
  };

  const handleNavigateToRegister = () => {
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
                title="Entrar"
                variant="primary"
                size="lg"
                onPress={handleLoginPress}
              />

              <Pressable
                onPress={handleForgotPassword}
                style={({ pressed }) => [
                  styles.forgotButton,
                  { opacity: pressed ? 0.7 : 1 },
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
              style={({ pressed }) => [
                styles.signupLinkPressable,
                { opacity: pressed ? 0.7 : 1 },
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
