export function trackEvent(name: string, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  console.debug("[analytics]", name, props);
}

// analytics: 1776459739454

// analytics: 1776479078927

// analytics: 1776493262378

// analytics: 1776517767957

// analytics: 1776549301488

// analytics: 1776584759560
