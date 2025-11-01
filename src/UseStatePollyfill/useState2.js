import { useRef, useSyncExternalStore } from 'react';

// Internal store factory for a single value
function createValueStore(initialValue) {
  let state = initialValue;
  const listeners = new Set();

  const setState = (updater) => {
    const next = typeof updater === 'function' ? updater(state) : updater;
    if (Object.is(next, state)) return;
    state = next;
    listeners.forEach(l => l());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const getSnapshot = () => state;

  return { subscribe, getSnapshot, setState };
}

// Hook: like useState(initial), but global-safe and isolated per call
export function useMyState(initialValue) {
  // Create one store per hook call instance
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = createValueStore(initialValue);
  }
  const store = storeRef.current;

  const value = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const setValue = store.setState;

  return [value, setValue];
}

