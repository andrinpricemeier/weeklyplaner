import React from 'react';

interface ISubmitButtonProps {
  content: string;
}

const SubmitButton = (props: ISubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={"bg-blue p-3 text-white rounded hover:bg-black"}
    >
      {props.content}
    </button>
  );
};

export default SubmitButton;