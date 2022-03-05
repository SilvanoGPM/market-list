import { useState } from 'react';

type UseBooleanReturn = [
  boolean,
  () => void,
  () => void,
  (value: boolean) => void
];

export function useBoolean(initialValue: boolean): UseBooleanReturn {
  const [value, setValue] = useState<boolean>(initialValue);

  function setTrue(): void {
    setValue(true);
  }

  function setFalse(): void {
    setValue(false);
  }

  return [value, setTrue, setFalse, setValue];
}
