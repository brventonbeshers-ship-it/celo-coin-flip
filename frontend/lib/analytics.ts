export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  console.debug("[analytics]", name, props);
}

// analytics: 1776459739454
