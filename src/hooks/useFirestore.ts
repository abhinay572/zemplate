import { useState, useEffect, useCallback } from "react";

/**
 * Generic hook for Firestore data fetching with loading/error states.
 * Wraps any async function and manages its lifecycle.
 */
export function useFirestoreQuery<T>(
  queryFn: () => Promise<T>,
  deps: any[] = []
): { data: T | null; loading: boolean; error: string | null; refetch: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      setData(result);
    } catch (err: any) {
      console.error("Firestore query error:", err);
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}

/**
 * Hook for Firestore mutations (create, update, delete) with loading/error.
 */
export function useFirestoreMutation<TArgs extends any[], TResult>(
  mutationFn: (...args: TArgs) => Promise<TResult>
): {
  mutate: (...args: TArgs) => Promise<TResult | null>;
  loading: boolean;
  error: string | null;
} {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (...args: TArgs): Promise<TResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const result = await mutationFn(...args);
      return result;
    } catch (err: any) {
      console.error("Firestore mutation error:", err);
      setError(err.message || "Operation failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
