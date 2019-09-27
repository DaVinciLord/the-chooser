import { useState } from "react";

type UseInput = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  forceChange: (value: string) => void;
};

const useInput = (initialValue = ""): UseInput => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const forceChange = (value: string) => setValue(value);
  return { value, onChange, forceChange };
};

export default useInput;
