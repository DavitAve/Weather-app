export const toCelsius = (temp: number): number => {
  return Math.floor(temp - 273.15);
};

type DebouncedFn<T extends any[]> = (...args: T) => void;

export const debounce = <T extends any[]>(
  func: (...args: T) => void,
  delay: number
): DebouncedFn<T> => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return function debouncedFunction(...args: T) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func(...args);
    }, delay);
  };
};
