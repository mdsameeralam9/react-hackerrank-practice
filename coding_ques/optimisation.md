# Performance Course Timestamps (No Links)

1. Code Splitting/Bundle Splitting:
  a. Route spliting, 
  b. Component label spliting 
  c. Import On Interaction, 
  d. Import On Visibility
   - https://www.youtube.com/watch?v=zAEy0jchvH8&t=3042s
   
  
3. Prefetch and Preload
4. Tree Shaking
5.  Core Web Vitals & Largest Contentful Paint (LCP) & Interaction To Next Paint (INP) & Cumulative Layout Shift (CLS) 
6.  Assets Optimisation and Compression(like image, fonts)
7.  Api optimisation - like caching
8.  optimisation with React hooks(useMemo, useCallbcak, memo, lazy, suspense, Componeny otimisation with hooks state, and componet rules to follow for optimsation, etc...)
9.  List optimisation - Pagination(Frontend/backend), Infnite Scroll, Virtual List, key props, 


# Sources of learing
Code Splitting
1. https://www.patterns.dev/vanilla/bundle-splitting/
2. https://javascriptpatterns.vercel.app/patterns/performance-patterns/introduction
3. https://dev.to/franklin030601/code-splitting-in-react-js-4o2g

Compression
1. https://www.digitalocean.com/communit...
2. https://www.digitalocean.com/communit...
3.   / setup-react-with-webpack-and-babel  
4. https://stackoverflow.com/questions/6...
5. https://dev.to/uguremirmustafa/how-to...

Import on interaction
1. https://www.patterns.dev/vanilla/impo...

Import on visibility
1. https://www.patterns.dev/vanilla/impo...
2. https://javascriptpatterns.vercel.app...

Prefetch
1. https://www.patterns.dev/vanilla/impo...
2. https://javascriptpatterns.vercel.app...
3. https://www.patterns.dev/vanilla/pref...

Preload
1. https://webpack.js.org/guides/code-sp...
2. https://javascriptpatterns.vercel.app...
3. https://www.patterns.dev/vanilla/preload
4. https://www.npmjs.com/package/preload...
5. https://github.com/vuejs/preload-webp...

Tree Shaking:
1. https://blog.saeloun.com/2022/11/24/t...
2. https://webpack.js.org/guides/tree-sh...

Virtual Lists:
1. https://www.patterns.dev/vanilla/virt...

Web Vitals & LCP
1. https://web.dev/articles/vitals
2. https://web.dev/articles/lcp
3. https://www.smashingmagazine.com/2023...
4. https://www.twicpics.com/blog/how-to-...

INP
1. https://web.dev/articles/inp
2. https://www.remoterocketship.com/advi...
3.   / what-is-interaction-to-next-paint-inp  

CLS:
1. https://web.dev/articles/cls
2. https://web.dev/articles/optimize-cls

# React Performance Optimization Handbook

A practical, end-to-end checklist of optimization techniques in React spanning components, rendering, state, context, lists, routing, data fetching, bundling, media, SSR/SSG/RSC, concurrency, profiling, and ops. Use this as a README.md scaffold for projects.

---

## Principles

- Optimize for user-centered metrics (LCP, INP, CLS) and validate changes with profiling before and after.
- Reduce render triggers (state, props, context, parent renders) and payload (JS/CSS/assets).
- Prefer simple, local fixes before systemic changes.

---

## Rendering control

### Pure components
- Favor pure components with stable props; reduce prop surface to minimize reconciliation.
- Split large components so only affected subtrees render.
- Keep state close to where it’s used; avoid lifting unnecessarily.

### Memoization and identity
- Use React.memo for pure components that often receive unchanged props.
- Use useCallback/useMemo to stabilize function/object identities passed to memoized children.
- Avoid inline objects/arrays/closures when they reach memoized children.

### Dependency hygiene
- Keep dependency arrays accurate; avoid over-memoization that creates stale closures or complexity.
- Memoize expensive derived values; compute simple values on the fly.

---

## State and data flow

### Efficient updates
- Leverage automatic batching; prefer functional updates when deriving from previous state.
- Normalize state; avoid duplicating derived data; compute when needed.
- Prefer immutable updates for predictable shallow compares and memo efficiency.

### Scope and granularity
- Keep global state minimal; colocate UI state; avoid pushing ephemeral state into global stores.
- Use slice-level subscriptions and memoized selectors to bound re-renders.

---

## Context performance

- Scope providers narrowly; split by concern (theme, auth, flags) to reduce broadcast.
- Memoize provider values; avoid recreating objects/functions each render.
- Consider selectors or context splitting if only a field changes frequently.

---

## Lists, keys, and virtualization

- Use stable, unique keys; avoid array indexes when order changes.
- Virtualize long lists (react-window, react-virtualized) to render only what’s visible.
- Paginate/window data; stream or progressively load for large collections.

---

## Events and input responsiveness

- Debounce/throttle high-frequency events (scroll, resize, input).
- useTransition for non-urgent updates to keep typing and gestures responsive.
- useDeferredValue for expensive filtering or search derived UI.
- Prefer passive listeners for scroll/touch when safe.

---

## Forms

- Prefer uncontrolled inputs for large forms; batch validation on blur/submit.
- For controlled inputs, memoize formatters and validators; isolate heavy logic; defer non-urgent updates.

---

## DOM and layout

- Batch DOM reads/writes; avoid layout thrashing.
- Keep keys stable across conditional branches to avoid unmount/mount churn.
- Store mutable non-visual values in refs instead of state to avoid re-renders.
- Use transforms/opacities for animations; avoid layout-triggering properties.

---

## Data fetching and caching

- Use a data cache with de-duplication, background refresh, and pagination.
- Parallelize independent requests; collapse waterfalls; coalesce in-flight duplicates.
- Prefer incremental fetching/streaming for large resources; set proper HTTP caching.

---

## Routing and code splitting

- Code-split routes and heavy components using lazy + Suspense.
- Prefetch likely next routes/resources; keep route boundaries aligned with dependency islands.
- Split CSS by route/feature; avoid global CSS bloat.

---

## Bundling and payload

- Ensure production builds and NODE_ENV=production for smaller, faster React.
- Turn on tree-shaking, minification, and dead-code elimination; prefer ESM packages.
- Analyze bundles; replace heavy libraries with lighter equivalents; remove unused locales/features.
- Use modern JS targets and selective polyfills; enable Brotli/gzip and long-term caching with content hashes.
- Split vendor chunks thoughtfully; avoid oversharing that prevents cache hits.

---

## Media and fonts

- Lazy-load below-the-fold images/videos; use responsive images (srcset/sizes) and modern formats (AVIF/WebP).
- Serve via CDN; set aggressive caching; use immutable versioned URLs.
- Preload critical fonts; use font-display: swap; subset fonts and minimize variants.

---

## Server rendering and RSC

- Choose SSR for dynamic SEO and first render speed; choose SSG/ISR for static content and cost efficiency.
- Stream SSR and hydrate progressively to improve TTFB and time-to-interaction.
- Use React Server Components to move data fetching and heavy logic server-side, reducing client JS and hydration.

---

## Concurrency and scheduling

- useTransition to prioritize user input over expensive state updates.
- useDeferredValue to avoid blocking with large list filtering or highlighting.
- Break CPU-heavy work into chunks; schedule idle work; prefer Web Workers for heavy, pure computations.

---

## Error boundaries and Suspense

- Place error boundaries around unstable regions to contain failures without cascading re-renders.
- Use localized Suspense fallbacks near slow components for better perceived performance.
- Provide skeletons/placeholders and optimistic UI to reduce perceived wait.

---

## Accessibility and perceived performance

- Maintain focus correctly on updates; reduce layout shifts to avoid CLS.
- Announce loading and completion events with ARIA live regions.
- Avoid content jumps; reserve space; use skeletons for predictable layout.

---

## Advanced patterns and pitfalls

- Don’t blanket-apply React.memo/useMemo/useCallback; each adds overhead—profile first.
- Avoid context values that change on every render; memoize providers.
- Prevent prop drilling with composition and context, but balance with re-render costs.
- Be careful with derived state; recompute instead of storing when cheap.

---

## Measurement and tooling

- Use React DevTools Profiler to track renders, commit times, and trace why updates happen.
- Monitor Core Web Vitals (LCP, INP, CLS) in production; wire up RUM to catch regressions.
- Use bundle analyzers; track chunk sizes and dependency growth.
- Add User Timing marks for critical interactions; compare before/after changes.

---

## Build, network, and platform

- HTTP/2 or HTTP/3; preconnect/preload critical origins and assets.
- Configure edge/CDN caching; coalesce duplicate requests; apply ETag/Last-Modified.
- Ensure server compression, caching headers, and correct content types.
- Prefer streaming APIs and incremental rendering when supported by framework/runtime.

---

## State management scale

- Keep global state minimal; colocate UI/transient state.
- Memoize selectors; subscribe narrowly; use structural sharing to minimize updates.
- Avoid storing derived or remote-cacheable data in global stores.

---

## Team/process checklists

### Optimization playbook
- Identify the user pain via Vitals and traces.
- Reproduce with profiler; isolate render triggers and heavy work.
- Apply the smallest change that removes a trigger or reduces payload.
- Re-measure locally and in production; rollback micro-optimizations if no user-visible gains.

### PR checklist
- Production build locally; check bundle diff and route-level chunks.
- React Profiler screenshot before/after for targeted flows.
- Web Vitals dashboard checked after deploy; alert budgets in place.

---

## Quickstart checklist

- Production flags and modern build targets enabled.
- Route-level code splitting; heavy widgets lazy-loaded.
- Data layer with caching, de-dupe, pagination; HTTP caching enabled.
- Long lists virtualized; images responsive and lazy-loaded; fonts preloaded/subsetted.
- Memo boundaries in hot paths; provider values memoized; stable keys.
- useTransition/useDeferredValue for heavy interactions; workers for CPU-heavy tasks.
- Error boundaries and Suspense fallbacks localized.
- Bundle analyzer report clean; Web Vitals monitored; profiler traces documented.

---

## Common anti-patterns to avoid

- Using array indexes as keys in dynamic lists.
- Overusing global state for local UI concerns.
- Inline object/function props to memoized children.
- Storing derived state instead of computing it.
- Large, monolithic components with wide prop surfaces.
- Shipping heavy libraries for trivial tasks; unshaken CJS dependencies.
- Hydrating huge client trees that could be server-rendered or server components.
