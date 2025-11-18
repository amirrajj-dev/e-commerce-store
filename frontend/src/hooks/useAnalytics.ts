import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../stores/hook';
import { getAnalytics } from '../stores/reducers/analytics/analytics.thunks';

export const useAnalytics = () => {
  const dispatch = useAppDispatch();
  const analytics = useAppSelector((state) => state.analytics);

  const fetchAnalytics = useCallback(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  const refreshAnalytics = useCallback(() => {
    dispatch(getAnalytics());
  }, [dispatch]);

  return {
    ...analytics,
    fetchAnalytics,
    refreshAnalytics,
  };
};