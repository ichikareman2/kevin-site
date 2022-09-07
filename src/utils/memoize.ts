export default function memoize<T extends (...args: any) => any>(fn: T): (...args: Parameters<T>) => ReturnType<T> {
    const keyValue = new Map<string, ReturnType<T>>();
    return (...args: T[]) => {
      const key = createKey(...args);
      if (keyValue.has(key)) {
        return keyValue.get(key) as ReturnType<T>;
      } else {
        const value = fn(...args);
        keyValue.set(key,value)
        return value;
      }
    };
  }
  function createKey(...args: any[]) {
    return JSON.stringify(args);
  }
  