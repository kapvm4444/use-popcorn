import { useEffect, useState } from "react";

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    const data = JSON.parse(localStorage.getItem(key));
    return data || initialState;
  });

  useEffect(
    function () {
      localStorage.setItem("key", JSON.stringify(value));
    },
    [value],
  );

  return [value, setValue];
}
