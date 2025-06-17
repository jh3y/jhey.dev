// Configuration for jhey.dev extension
// These are non-sensitive values that don't need to be configured every time

export const CONFIG = {
  // Repository configuration
  REPO_OWNER: "jhey",
  REPO_NAME: "jhey.dev",
  BRANCH: "main",

  // File paths
  FILE_PATH: "site/src/data/thoughts.json",

  // Default values
  DEFAULT_BRANCH: "main",
} as const;

// Type for the configuration
export type Config = typeof CONFIG;
