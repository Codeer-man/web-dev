import type { UserRole } from "shared";

export type rbacRule = {
  method: string;
  path: string;
  role: UserRole[];
};

export const publicRoute = [
  {
    method: "POST",
    path: "/auth/regster",
  },
  {
    method: "POST",
    path: "/auth/login",
  },
] as const;

const rbaceRule: rbacRule[] = [
  {
    method: "GET",
    path: "/auth/me",
    role: ["USER", "ADMIN"],
  },
];

function matchPath(pattern: string, actual: string): boolean {
  if (pattern === actual) {
    return true;
  }

  const patterParts = pattern.split("/");
  const actualParts = actual.split("/");

  if (patterParts.length !== actualParts.length) {
    return false;
  }

  return patterParts.every(
    (part, index) => part.startsWith(":") || part === actualParts[index],
  );
}

export function isPublicRoute(method: string, path: string) {
  return publicRoute.some(
    (route) => route.method === method && matchPath(route.path, path),
  );
}

export function getAllowedRole(method: string, path: string) {
  const rule = rbaceRule.find(
    (currentItem) =>
      currentItem.method === method && matchPath(currentItem.path, path),
  );

  return rule?.role;
}
