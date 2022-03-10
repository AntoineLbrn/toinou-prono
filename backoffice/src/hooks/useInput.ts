import { useEffect, useState } from "react";

export const useInput = (initialValue: string | undefined) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    setValue(initialValue ? initialValue : '');
  }, [initialValue])

  return {
    value,
    initialValue,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event: any) => {
        setValue(event.target.value);
      }
    }
  };
};