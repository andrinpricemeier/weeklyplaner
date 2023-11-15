import React from 'react';

interface ISecondaryButtonProps {
  content: string;
  onClick: () => void;
}

const SecondaryButton = (props: ISecondaryButtonProps) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={"bg-white p-3 text-blue border-2 border-blue rounded hover:bg-blue hover:text-white"}
    >
      {props.content}
    </button>
  );
};

export default SecondaryButton;