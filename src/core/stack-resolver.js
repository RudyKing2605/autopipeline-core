export function resolveStack(config) {

  const supported = {
    project_types: [
      "web",
      "api",
      "game",
      "fullstack",
      "mobile"
    ],
    frontend: [
      "react",
      "nextjs",
      "phaser",
      "react-native",
      "flutter",
      "expo",
      "none"
    ],
    backend: [
      "node",
      "bun",
      "supabase",
      "firebase",
      "none"
    ],
    database: [
      "supabase",
      "postgres",
      "firebase",
      "none"
    ],
    hosting: [
      "cloudflare",
      "railway",
      "vercel",
      "expo-eas",
      "firebase-hosting"
    ]
  };

  if (!supported.project_types.includes(config.project_type)) {
    throw new Error("Unsupported project type");
  }

  if (!supported.frontend.includes(config.frontend)) {
    throw new Error("Unsupported frontend stack");
  }

  if (!supported.backend.includes(config.backend)) {
    throw new Error("Unsupported backend stack");
  }

  if (!supported.database.includes(config.database)) {
    throw new Error("Unsupported database");
  }

  if (!supported.hosting.includes(config.hosting)) {
    throw new Error("Unsupported hosting platform");
  }

  return {
    ...config,
    validated: true
  };

}