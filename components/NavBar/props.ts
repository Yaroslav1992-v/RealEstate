export interface MenuItemProps {
  text: string;
  requiresAuth?: boolean;
  action: (() => void) | string;
}
export interface AuthProvider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}
export interface MenuItems extends MenuItemProps {
  action: string;
}
