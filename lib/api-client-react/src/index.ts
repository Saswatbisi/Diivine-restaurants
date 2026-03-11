import { useQuery, useMutation, type UseQueryOptions, type UseMutationOptions } from '@tanstack/react-query';
import { customFetch } from './custom-fetch';
import type {
  MenuItem,
  Order,
  CreateOrderRequest,
  Reservation,
  CreateReservationRequest,
} from './generated/api.schemas';

const BASE_URL = '/api';

// ===== Menu =====

export const getMenuItems = () =>
  customFetch<MenuItem[]>(`${BASE_URL}/menu`);

export const getMenuItemsQueryKey = () => ['getMenuItems'] as const;

export const useGetMenuItems = <TData = MenuItem[]>(
  options?: Partial<UseQueryOptions<MenuItem[], Error, TData>>,
) =>
  useQuery({
    queryKey: getMenuItemsQueryKey(),
    queryFn: () => getMenuItems(),
    ...options,
  });

export const getMenuItem = (id: number) =>
  customFetch<MenuItem>(`${BASE_URL}/menu/${id}`);

export const useGetMenuItem = (id: number, options?: Partial<UseQueryOptions<MenuItem>>) =>
  useQuery({
    queryKey: ['getMenuItem', id],
    queryFn: () => getMenuItem(id),
    ...options,
  });

// ===== Orders =====

export const getOrders = () =>
  customFetch<Order[]>(`${BASE_URL}/orders`);

export const useGetOrders = (options?: Partial<UseQueryOptions<Order[]>>) =>
  useQuery({
    queryKey: ['getOrders'],
    queryFn: () => getOrders(),
    ...options,
  });

export const getOrder = (id: number) =>
  customFetch<Order>(`${BASE_URL}/orders/${id}`);

export const useGetOrder = (
  id: number,
  options?: { query?: Partial<UseQueryOptions<Order>> },
) =>
  useQuery({
    queryKey: ['getOrder', id],
    queryFn: () => getOrder(id),
    ...options?.query,
  });

export const createOrder = (data: CreateOrderRequest) =>
  customFetch<Order>(`${BASE_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const useCreateOrder = (
  options?: UseMutationOptions<Order, Error, { data: CreateOrderRequest }>,
) =>
  useMutation({
    mutationFn: ({ data }: { data: CreateOrderRequest }) => createOrder(data),
    ...options,
  });

// ===== Reservations =====

export const getReservations = () =>
  customFetch<Reservation[]>(`${BASE_URL}/reservations`);

export const useGetReservations = (options?: Partial<UseQueryOptions<Reservation[]>>) =>
  useQuery({
    queryKey: ['getReservations'],
    queryFn: () => getReservations(),
    ...options,
  });

export const getReservation = (id: number) =>
  customFetch<Reservation>(`${BASE_URL}/reservations/${id}`);

export const useGetReservation = (id: number, options?: Partial<UseQueryOptions<Reservation>>) =>
  useQuery({
    queryKey: ['getReservation', id],
    queryFn: () => getReservation(id),
    ...options,
  });

export const createReservation = (data: CreateReservationRequest) =>
  customFetch<Reservation>(`${BASE_URL}/reservations`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const useCreateReservation = (
  options?: UseMutationOptions<Reservation, Error, { data: CreateReservationRequest }>,
) =>
  useMutation({
    mutationFn: ({ data }: { data: CreateReservationRequest }) => createReservation(data),
    ...options,
  });

export const cancelReservation = (id: number) =>
  customFetch<Reservation>(`${BASE_URL}/reservations/${id}`, {
    method: 'DELETE',
  });

export const useCancelReservation = (
  options?: UseMutationOptions<Reservation, Error, number>,
) =>
  useMutation({
    mutationFn: (id: number) => cancelReservation(id),
    ...options,
  });
