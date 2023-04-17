import { useState } from "react";

type inputProps = {
  className: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function InputText(props: inputProps) {
  const [content, updateContent] = useState("");

  return (
    <>
      <input
        /* className="bg-slate-80 resize-none w-full h-full mx-[1rem] py-1 outline-none" */
        placeholder={props.placeholder}
        onChange={(event) => {
          props.onChange(event.target.value);
        }}
        value={props.value}
        className={props.className}
      ></input>
    </>
  );
}
