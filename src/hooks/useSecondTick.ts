import { useEffect, useReducer } from "react";

export const useSecondTick = (disabled: boolean) => {
  const [, rerender] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    if (disabled) return;
    const interval = setInterval(rerender, 1000);
    return () => clearInterval(interval);
  }, [disabled]);
};
