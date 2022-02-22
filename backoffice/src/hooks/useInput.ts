import { useState } from "react";

export const useInput = (initialValue: string | null) => {
  const [value, setValue] = useState(initialValue ? initialValue : '');

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