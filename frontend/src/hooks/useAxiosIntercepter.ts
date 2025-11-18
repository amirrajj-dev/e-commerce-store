import { useEffect } from "react";
import { refreshToken, logoutUser } from "../stores/reducers/user/user.thunks";
import api from "../utils/axios";
import { useAppDispatch, useAppSelector } from "../stores/hook";

export const useAxiosInterceptor = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If there's no response, network error occurred
        if (!error.response) {
          return Promise.reject(error);
        }

        const status = error.response.status;
        const message = error.response.data?.message;

        // Handle expired access token
        if (
          status === 401 &&
          message === "No access token. Please log in." &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true; // prevent infinite loop

          try {
            // Try refreshing the token
            const refreshAction = await dispatch(refreshToken());

            if (refreshAction.meta.requestStatus === "fulfilled") {
              // Retry the original request with new access token
              return api(originalRequest);
            } else {
              // Refresh failed, log the user out
              await dispatch(logoutUser());
              return Promise.reject(error);
            }
          } catch (refreshError) {
            await dispatch(logoutUser());
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, [dispatch, isAuthenticated]);
};
