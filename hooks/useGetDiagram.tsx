import { useQuery } from '@tanstack/react-query';
import getDiagram from '../services/get-diagram/api';

// Define the response type for better TypeScript support
interface DiagramResponse {
  // Add specific types based on your API response
  // For now, using any to be flexible
  [key: string]: any;
}

interface UseGetDiagramOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

/**
 * Custom hook for fetching diagram data using React Query
 * @param options - Query options for React Query
 * @returns Query result with diagram data
 */
const useGetDiagram = (options: UseGetDiagramOptions = {}) => {
  const {
    enabled = true,
    refetchOnWindowFocus = true,
    refetchOnMount = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
  } = options;

  return useQuery<DiagramResponse>({
    queryKey: ['diagram'],
    queryFn: getDiagram,
    enabled,
    refetchOnWindowFocus,
    refetchOnMount,
    staleTime,
    gcTime: cacheTime, // React Query v5 uses gcTime instead of cacheTime
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export default useGetDiagram;
