import { useState, useEffect } from "react";
import useAMapLoader from "./useAMapLoader";
import { useDebouncedCallback } from "use-debounce";

function useInputWithAmapTips(
  inputRef,
  defaultValue,
  dispatchAction,
  debounceDelay = 200
) {
  const [value, setValue] = useState(defaultValue);
  const { data: AMap, isSuccess } = useAMapLoader();

  const debouncedDispatch = useDebouncedCallback(val => {
    dispatchAction(val);
  }, debounceDelay);

  useEffect(() => {
    setValue(defaultValue ?? ""); // 关键补丁：同步 redux 的值
  }, [defaultValue]);

  useEffect(() => {
    if (!isSuccess || !AMap || !inputRef.current) return;

    let autoComplete;

    AMap.plugin("AMap.AutoComplete", () => {
      autoComplete = new AMap.AutoComplete({
        input: inputRef.current,
      });

      const handleSelect = e => {
        const selectedAddress = e.poi.name;
        setValue(selectedAddress);
        debouncedDispatch(selectedAddress);
      };

      autoComplete.on("select", handleSelect);
    });

    return () => {
      if (autoComplete) {
        autoComplete.off("select");
      }
    };
  }, [isSuccess, AMap, inputRef, debouncedDispatch]);

  const handleChange = val => {
    setValue(val);
  };

  return {
    value,
    onChange: handleChange,
  };
}

export default useInputWithAmapTips;
