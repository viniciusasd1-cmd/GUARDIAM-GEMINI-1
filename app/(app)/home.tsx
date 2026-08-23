import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/auth/AuthContext';
import { SafeTrip } from '../../src/domain/safeTrip';
import { safeTripsApi } from '../../src/api/safeTripsApi';
import { ApiError } from '../../src/api/apiClient';

export default function HomeScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const [activeTrip, setActiveTrip] = useState<SafeTrip | null>(null);
  const [isLoadingTrip, setIsLoadingTrip] = useState<boolean>(true);
  const [isStartingProtection, setIsStartingProtection] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const userName = user?.name ? user.name.split(' ')[0] : 'Vinicius';

  const isProtectionActive =
    activeTrip !== null &&
    (activeTrip.status === 'ACTIVE' ||
      activeTrip.status === 'PREPARING' ||
      activeTrip.status === 'ALERT_TRIGGERED');

  const fetchActiveTrip = useCallback(async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoadingTrip(true);
      }
      setActionError(null);

      const trip = await safeTripsApi.getActiveTrip();
      setActiveTrip(trip);
    } catch (error) {
      if (error instanceof ApiError) {
        setActionError(error.message);
      } else {
        setActionError('Não foi possível verificar o status da proteção.');
      }
    } finally {
      setIsLoadingTrip(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchActiveTrip();
  }, [fetchActiveTrip]);

  const handleActivateProtection = async () => {
    if (isStartingProtection || isLoadingTrip) return;

    if (isProtectionActive) {
      Alert.alert(
        'Proteção Ativa',
        'Tela de proteção ativa será conectada em fase posterior.'
      );
      return;
    }

    try {
      setIsStartingProtection(true);
      setActionError(null);

      // 1. Criar SafeTrip
      const createdTrip = await safeTripsApi.createSafeTrip({ tripType: 'RIDE_APP' });

      // 2. Iniciar SafeTrip com o ID real
      const startedTrip = await safeTripsApi.startSafeTrip(createdTrip.id);

      // 3. Atualizar estado local com a viagem iniciada
      setActiveTrip(startedTrip);
    } catch (error) {
      let message = 'Não foi possível ativar a proteção. Tente novamente.';
      if (error instanceof ApiError) {
        message = error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }
      setActionError(message);
      Alert.alert('Erro ao Ativar Proteção', message);
    } finally {
      setIsStartingProtection(false);
    }
  };

  const handleSOSPress = () => {
    Alert.alert('Alerta SOS', 'SOS será conectado na Fase 11');
  };

  const handleCardPress = (title: string, phase: string) => {
    Alert.alert(title, `${title} será conectado na ${phase}`);
  };

  const handleLogout = async () => {
    setMenuVisible(false);
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable
          onPress={() => setMenuVisible(true)}
          style={({ pressed }) => [styles.headerIconBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.headerIconText}>☰</Text>
        </Pressable>

        <View style={styles.headerCenter}>
          <View style={styles.headerLogoBox}>
            <Text style={styles.headerLogoEmoji}>🛡️</Text>
          </View>
          <Text style={styles.headerBrandText}>GUARDIAM</Text>
        </View>

        <Pressable
          onPress={() => Alert.alert('Notificações', 'Nenhuma nova notificação')}
          style={({ pressed }) => [styles.headerIconBtn, { opacity: pressed ? 0.7 : 1 }]}
        >
          <Text style={styles.headerIconText}>🔔</Text>
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchActiveTrip(true)}
            colors={['#1565C0']}
            tintColor="#1565C0"
          />
        }
      >
        {/* User Greeting & Status Banner */}
        <View style={styles.greetingSection}>
          <View>
            <Text style={styles.greetingTitle}>Olá, {userName}</Text>
            <Text style={styles.greetingSubtitle}>
              {isProtectionActive
                ? 'Seu trajeto está sendo monitorado'
                : 'Sua segurança é nossa prioridade'}
            </Text>
          </View>

          {isLoadingTrip ? (
            <View style={styles.badgeLoading}>
              <ActivityIndicator size="small" color="#64748B" />
            </View>
          ) : isProtectionActive ? (
            <View style={styles.badgeActive}>
              <View style={styles.badgeDotActive} />
              <Text style={styles.badgeActiveText}>Proteção ativa</Text>
            </View>
          ) : (
            <View style={styles.badgeInactive}>
              <View style={styles.badgeDotInactive} />
              <Text style={styles.badgeInactiveText}>Proteção desativada</Text>
            </View>
          )}
        </View>

        {actionError && (
          <View style={styles.errorBanner}>
            <Text style={styles.errorBannerText}>{actionError}</Text>
          </View>
        )}

        {/* Map Radar Visual */}
        <View style={[styles.radarCard, isProtectionActive && styles.radarCardActive]}>
          <View style={styles.radarContainer}>
            <View
              style={[
                styles.radarRing,
                { width: 140, height: 140, borderRadius: 70 },
                isProtectionActive && styles.radarRingActive,
              ]}
            />
            <View
              style={[
                styles.radarRing,
                { width: 90, height: 90, borderRadius: 45 },
                isProtectionActive && styles.radarRingActive,
              ]}
            />
            <View
              style={[
                styles.radarPulse,
                isProtectionActive && styles.radarPulseActive,
              ]}
            >
              <View
                style={[
                  styles.radarDot,
                  isProtectionActive && styles.radarDotActive,
                ]}
              />
            </View>
          </View>

          <View style={styles.radarInfo}>
            <Text
              style={[
                styles.radarStatusText,
                isProtectionActive && styles.radarStatusTextActive,
              ]}
            >
              {isProtectionActive ? 'Monitoramento Ativo' : 'Radar GPS Pronto'}
            </Text>
            <Text style={styles.radarCoordsText}>
              {isProtectionActive
                ? `Viagem: ${activeTrip?.tripType || 'EM ANDAMENTO'}`
                : 'Modo de espera • Pronto para monitorar'}
            </Text>
          </View>
        </View>

        {/* Main CTA Section */}
        <View style={styles.actionSection}>
          <Pressable
            onPress={handleActivateProtection}
            disabled={isStartingProtection}
            style={({ pressed }) => [
              isProtectionActive ? styles.activeTripButton : styles.activateButton,
              { opacity: pressed || isStartingProtection ? 0.85 : 1 },
            ]}
          >
            {isStartingProtection ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.activateButtonIcon}>🛡️</Text>
            )}
            <Text style={styles.activateButtonText}>
              {isStartingProtection
                ? 'Ativando Proteção...'
                : isProtectionActive
                ? 'Ver Proteção Ativa'
                : 'Ativar Proteção'}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleSOSPress}
            style={({ pressed }) => [
              styles.sosButton,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={styles.sosButtonText}>SOS DE EMERGÊNCIA</Text>
          </Pressable>
        </View>

        {/* 2x2 Feature Grid */}
        <View style={styles.gridSection}>
          <Text style={styles.sectionTitle}>Recursos de Segurança</Text>

          <View style={styles.gridRow}>
            {/* Modo Passageiro */}
            <Pressable
              onPress={() => handleCardPress('Modo Passageiro', 'Fase 8')}
              style={({ pressed }) => [
                styles.gridCard,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <View style={[styles.cardIconBox, { backgroundColor: '#EFF6FF' }]}>
                <Text style={styles.cardIconText}>🚗</Text>
              </View>
              <Text style={styles.cardTitle}>Modo Passageiro</Text>
              <Text style={styles.cardDescription}>Monitoramento de corridas e trajetos</Text>
            </Pressable>

            {/* Locais Seguros */}
            <Pressable
              onPress={() => handleCardPress('Locais Seguros', 'Fase 9')}
              style={({ pressed }) => [
                styles.gridCard,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <View style={[styles.cardIconBox, { backgroundColor: '#F0FDF4' }]}>
                <Text style={styles.cardIconText}>📍</Text>
              </View>
              <Text style={styles.cardTitle}>Locais Seguros</Text>
              <Text style={styles.cardDescription}>Zonas de confiança e geofencing</Text>
            </Pressable>
          </View>

          <View style={styles.gridRow}>
            {/* Contatos de Emergência */}
            <Pressable
              onPress={() => handleCardPress('Contatos de Emergência', 'Fase 10')}
              style={({ pressed }) => [
                styles.gridCard,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <View style={[styles.cardIconBox, { backgroundColor: '#FEF3C7' }]}>
                <Text style={styles.cardIconText}>👥</Text>
              </View>
              <Text style={styles.cardTitle}>Contatos</Text>
              <Text style={styles.cardDescription}>Rede de guardiões cadastrados</Text>
            </Pressable>

            {/* Dossiês / Logs */}
            <Pressable
              onPress={() => handleCardPress('Dossiês / Logs', 'Fase 12')}
              style={({ pressed }) => [
                styles.gridCard,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <View style={[styles.cardIconBox, { backgroundColor: '#F3E8FF' }]}>
                <Text style={styles.cardIconText}>📋</Text>
              </View>
              <Text style={styles.cardTitle}>Dossiês / Logs</Text>
              <Text style={styles.cardDescription}>Histórico de viagens e alertas</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Side Menu Drawer Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackdrop}
            onPress={() => setMenuVisible(false)}
          />
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}>
                <Text style={styles.drawerAvatarText}>
                  {userName.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View>
                <Text style={styles.drawerUserName}>{user?.name || 'Vinicius'}</Text>
                <Text style={styles.drawerUserEmail}>{user?.email || 'seu@email.com'}</Text>
              </View>
            </View>

            <View style={styles.drawerDivider} />

            <View style={styles.drawerMenu}>
              <Pressable
                onPress={() => {
                  setMenuVisible(false);
                  Alert.alert('Meu Perfil', 'Perfil será conectado em fase posterior.');
                }}
                style={styles.drawerMenuItem}
              >
                <Text style={styles.drawerMenuIcon}>👤</Text>
                <Text style={styles.drawerMenuText}>Meu Perfil</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setMenuVisible(false);
                  Alert.alert('Configurações', 'Configurações de segurança');
                }}
                style={styles.drawerMenuItem}
              >
                <Text style={styles.drawerMenuIcon}>⚙️</Text>
                <Text style={styles.drawerMenuText}>Configurações</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setMenuVisible(false);
                  Alert.alert('Sobre o Guardiam', 'Versão 1.0.0 — SDK 57 Nativo');
                }}
                style={styles.drawerMenuItem}
              >
                <Text style={styles.drawerMenuIcon}>ℹ️</Text>
                <Text style={styles.drawerMenuText}>Sobre o App</Text>
              </Pressable>
            </View>

            <View style={styles.drawerFooter}>
              <Pressable onPress={handleLogout} style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>Sair da Conta</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 18,
    color: '#0F172A',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLogoBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  headerLogoEmoji: {
    fontSize: 16,
  },
  headerBrandText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#1565C0',
    letterSpacing: 1.2,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 16,
  },
  greetingSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  greetingSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  badgeLoading: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  badgeInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    gap: 6,
  },
  badgeDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#94A3B8',
  },
  badgeInactiveText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  badgeActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    gap: 6,
  },
  badgeDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  badgeActiveText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
  errorBanner: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  errorBannerText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  radarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  radarCardActive: {
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  radarContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  radarRing: {
    position: 'absolute',
    borderWidth: 1.5,
    borderColor: 'rgba(21, 101, 192, 0.12)',
    borderStyle: 'dashed',
  },
  radarRingActive: {
    borderColor: 'rgba(16, 185, 129, 0.25)',
  },
  radarPulse: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 101, 192, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radarPulseActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
  },
  radarDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#1565C0',
  },
  radarDotActive: {
    backgroundColor: '#10B981',
  },
  radarInfo: {
    alignItems: 'center',
    marginTop: 6,
    gap: 2,
  },
  radarStatusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  radarStatusTextActive: {
    color: '#047857',
  },
  radarCoordsText: {
    fontSize: 12,
    color: '#64748B',
  },
  actionSection: {
    gap: 12,
  },
  activateButton: {
    backgroundColor: '#1565C0',
    borderRadius: 14,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activeTripButton: {
    backgroundColor: '#047857',
    borderRadius: 14,
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#047857',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  activateButtonIcon: {
    fontSize: 18,
  },
  activateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sosButton: {
    backgroundColor: '#DC2626',
    borderRadius: 14,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  gridSection: {
    gap: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  gridRow: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 6,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  cardIconText: {
    fontSize: 18,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardDescription: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.4)',
  },
  drawerContainer: {
    width: '75%',
    maxWidth: 300,
    backgroundColor: '#FFFFFF',
    height: '100%',
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  drawerAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#1565C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerAvatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  drawerUserName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  drawerUserEmail: {
    fontSize: 12,
    color: '#64748B',
  },
  drawerDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },
  drawerMenu: {
    flex: 1,
    gap: 8,
  },
  drawerMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  drawerMenuIcon: {
    fontSize: 18,
  },
  drawerMenuText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  drawerFooter: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  logoutButton: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },
});
