/**
 * Super Admin configuration
 * The admin panel is accessed via a secret URL path known only to the admin.
 * Set VITE_ADMIN_SECRET_PATH in .env to customize the path.
 */

const SECRET_PATH = import.meta.env.VITE_ADMIN_SECRET_PATH || "zem-ctrl-x7k9m2";

export const ADMIN_BASE = `/${SECRET_PATH}`;

export function adminPath(sub?: string): string {
  return sub ? `${ADMIN_BASE}/${sub}` : ADMIN_BASE;
}
