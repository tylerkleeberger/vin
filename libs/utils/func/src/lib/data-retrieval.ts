export const get =
  <T, K extends keyof T>(key: K) =>
    (value: T): T[K] =>
      value[key];

export const tryGet =
  <T, K extends keyof T>(key: K) =>
    (value?: T): T[K] | undefined =>
      value?.[key];

