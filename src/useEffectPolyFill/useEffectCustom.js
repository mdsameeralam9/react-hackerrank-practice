import React from "react";

function checkIsDepChnaged(prev, current) {
  const prevStringify = JSON.stringify(prev.current);
  const currentStringify = JSON.stringify(current);
  return current ? prevStringify !== currentStringify : true;
}

export const useEffectCustom = (cb, dependency) => {
  const firstRender = React.useRef(true);
  const deps = React.useRef([]);
  if (firstRender.current) {
    firstRender.current = false;
    const cleanFn = cb();
    if (cleanFn && typeof cleanFn === "function") {
      cleanFn();
    }
  }
  const isDepsChanged = checkIsDepChnaged(deps, dependency);
  if (isDepsChanged) {
    const cleanFn = cb();
    if (cleanFn && typeof cleanFn === "function" && isDepsChanged) {
      cleanFn();
    }
  }
  deps.current = dependency || [];
};
