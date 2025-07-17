import { useAuthStore } from '../auth/useAuthStore'; // cập nhật path cho đúng

export const hasPermissions = (requiredRoles: string[]): boolean => {
  const user = useAuthStore.getState().loggedInUser;
  if (!user || !user.roles) return false;

  return requiredRoles.every((required) =>
    user.roles.some((role) => role.name === required)
  );
};
