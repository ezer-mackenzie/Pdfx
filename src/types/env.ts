export interface GlobalEnv {
  window?: unknown;
  document?: unknown;
  process?: { versions?: { node?: string }; release?: { name?: string } };
  Bun?: unknown;
  Deno?: unknown;
  URL?: { createObjectURL: (blob: Blob) => string; revokeObjectURL: (url: string) => void };
}

export interface MinimalAnchor {
  href: string;
  download: string;
  click: () => void;
}

export interface MinimalDocument {
  createElement: (tag: 'a') => MinimalAnchor;
  body: {
    appendChild: (el: MinimalAnchor) => void;
    removeChild: (el: MinimalAnchor) => void;
  };
}
