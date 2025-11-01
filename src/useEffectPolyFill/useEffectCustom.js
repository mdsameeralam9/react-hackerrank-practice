import React from "react";

function checkIsDepChnaged(prev, current) {
  const prevStringify = JSON.stringify(prev.current);
  const currentStringify = JSON.stringify(current);
  return current ? prevStringify !== currentStringify : true;
}

export const useEffectCustom = (cb, dependency) => {
  const deps = React.useRef();
  const isDepsChanged = checkIsDepChnaged(deps, dependency);
  if (isDepsChanged) {
    cb();
    deps.current = dependency;
  }
};
