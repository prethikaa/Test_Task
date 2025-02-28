export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const fuzzyMatch = (query: string, target: string): number => {
  query = query.toLowerCase();
  target = target.toLowerCase();
  let matchCount = 0;
  let queryIndex = 0;
  for (let i = 0; i < target.length; i++) {
    if (queryIndex < query.length && query[queryIndex] === target[i]) {
      matchCount++;
      queryIndex++;
    }
  }
  return matchCount / query.length;
};
