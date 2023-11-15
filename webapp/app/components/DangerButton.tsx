import React from 'react';

interface IDangerButtonProps {
  content: string;
  onClick: () => void;
}

const DangerButton = (props: IDangerButtonProps) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={"bg-red p-3 text-white border-2 border-red rounded hover:text-red hover:bg-white"}
    >
      {props.content}
    </button>
  );
};

export default DangerButton;