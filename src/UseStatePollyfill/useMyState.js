import { useRef, useSyncExternalStore } from "react";

export function useMyState(initial) {
  const storeRef = useRef();
  if (!storeRef.current) {
    let state = typeof initial === "function" ? initial() : initial;
    const listeners = new Set();
    const getSnapshot = () => state;
    const subscribe = (l) => (listeners.add(l), () => listeners.delete(l));
    const set = (next) => {
      const prev = state;
      state = typeof next === "function" ? next(prev) : next;
      if (!Object.is(prev, state)) listeners.forEach((l) => l());
    };
    storeRef.current = { getSnapshot, subscribe, set };
  }

  const value = useSyncExternalStore(
    storeRef.current.subscribe,
    storeRef.current.getSnapshot
  );
  const setValue = storeRef.current.set;

  return [value, setValue];
}
