// Debounce function to limit execution rate
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>;
  // Debounced function
  return (...args: Parameters<T>) => {
    // Clear previous timer
    clearTimeout(timer);
    // Set new timer
    timer = setTimeout(() => {
      // Execute function after delay
      func(...args);
    }, delay);
  };
};

// Fuzzy match function to compare query with target
export const fuzzyMatch = (query: string, target: string): number => {
  query = query.toLowerCase();
  target = target.toLowerCase();
  let matchCount = 0;
  let queryIndex = 0;
  // Loop through target
  for (let i = 0; i < target.length; i++) {
    // Match chars sequentially
    if (queryIndex < query.length && query[queryIndex] === target[i]) {
      matchCount++;
      queryIndex++;
    }
  }
  // Return match percentage
  return matchCount / query.length;
};
