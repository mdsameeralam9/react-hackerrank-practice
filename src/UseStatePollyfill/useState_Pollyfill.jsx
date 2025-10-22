import React from "react";

const store = () => {
  let initialState;
  let componentMount = new Set();
  const subscriber = (cb) => {
    componentMount.add(cb);
    return () => componentMount.delete(cb);
  };
  const getSnapShot = () => {
    return initialState;
  };

  const setInitialState = (val) => {
    if (initialState === undefined) {
      initialState = typeof val === "function" ? val() : val;
    }
  };

  const updateState = (val) => {
    initialState = typeof val === "function" ? val(initialState) : val;
    componentMount.forEach((cb) => cb());
  };

  return {
    subscriber,
    getSnapShot,
    setInitialState,
    updateState,
  };
};

const storeState = store();

const useState_Pollyfill = (initial_value) => {
  const state = React.useSyncExternalStore(
    storeState.subscriber,
    storeState.getSnapShot
  );

  storeState.setInitialState(initial_value);

  return [state, storeState.updateState];
};

export default useState_Pollyfill;
