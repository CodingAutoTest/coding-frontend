import { useState, useEffect } from 'react';
import { UserType, fetchUserById } from '../api/userApi';

type UseUserReturnType = {
  user: UserType | null;
  loading: boolean;
  error: string | null;
};

export const useUser = (userId: number | null): UseUserReturnType => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await fetchUserById(userId);
        setUser(userData);
        setError(null);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('사용자 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
}; 