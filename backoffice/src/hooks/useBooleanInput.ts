import { useEffect, useState } from "react";

export const useBooleanInput = (initialValue: boolean) => {
  const [value, setValue] = useState<boolean>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue])

  return {
    initialValue,
    value,
    setValue,
    reset: () => setValue(false),
    bind: {
      value,
      defaultChecked: value,
      onChange: (event: any) => {
        setValue(!initialValue);
      }
    }
  };
};