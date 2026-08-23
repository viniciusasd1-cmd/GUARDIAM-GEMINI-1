import { request, ApiError } from './apiClient';
import { ApiResourceResponse, CreateSafeTripInput, SafeTrip } from '../domain/safeTrip';

export const safeTripsApi = {
  async getActiveTrip(): Promise<SafeTrip | null> {
    try {
      const response = await request<ApiResourceResponse<SafeTrip>>('/safe-trips/active', {
        method: 'GET',
        requiresAuth: true,
      });

      if (response && response.data) {
        return response.data;
      }
      return null;
    } catch (error) {
      if (error instanceof ApiError && error.status === 404) {
        return null;
      }
      throw error;
    }
  },

  async createSafeTrip(input: CreateSafeTripInput = { tripType: 'RIDE_APP' }): Promise<SafeTrip> {
    const response = await request<ApiResourceResponse<SafeTrip>>('/safe-trips', {
      method: 'POST',
      body: {
        tripType: input.tripType || 'RIDE_APP',
        originAddress: input.originAddress,
        destinationAddress: input.destinationAddress,
        notes: input.notes,
      },
      requiresAuth: true,
    });

    if (!response || !response.data) {
      throw new Error('Resposta inválida do servidor ao criar viagem de proteção.');
    }

    return response.data;
  },

  async startSafeTrip(id: string): Promise<SafeTrip> {
    const response = await request<ApiResourceResponse<SafeTrip>>(`/safe-trips/${id}/start`, {
      method: 'POST',
      requiresAuth: true,
    });

    if (!response || !response.data) {
      throw new Error('Resposta inválida do servidor ao iniciar viagem de proteção.');
    }

    return response.data;
  },
};
