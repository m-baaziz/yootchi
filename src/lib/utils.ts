export function getNext<T, U>(
  sortedArray: T[],
  currentValue: U,
  mapper?: (source: T) => U
): U | null {
  if (sortedArray.length === 0) return null;
  if (!mapper && typeof sortedArray[0] !== typeof currentValue) return null;
  const newMapper = mapper || ((v: T) => (v as unknown) as U);

  const index = sortedArray.findIndex((s) => newMapper(s) === currentValue);
  if (index === sortedArray.length - 1 || index === -1) return null;

  return newMapper(sortedArray[index + 1]);
}

export function getPrevious<T, U>(
  sortedArray: T[],
  currentValue: U,
  mapper?: (source: T) => U
): U | null {
  if (sortedArray.length === 0) return null;
  if (!mapper && typeof sortedArray[0] !== typeof currentValue) return null;
  const newMapper = mapper || ((v: T) => (v as unknown) as U);

  const index = sortedArray.findIndex((s) => newMapper(s) === currentValue);
  if (index === 0 || index === -1) return null;

  return newMapper(sortedArray[index - 1]);
}
