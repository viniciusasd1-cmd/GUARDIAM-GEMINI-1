/**
 * REVENUECAT CONFIGURATION
 * De acordo com as decisões do GUARDIAM.MD:
 * Gerenciamento de assinaturas e paywall (Plano Guardiam Pro).
 */

const REVENUECAT_API_KEY = process.env.EXPO_PUBLIC_REVENUECAT_API_KEY || '';

export const revenueCatConfig = {
  apiKey: REVENUECAT_API_KEY,
  entitlementId: 'guardiam_pro',
  isConfigured: Boolean(REVENUECAT_API_KEY),
};

export default revenueCatConfig;
