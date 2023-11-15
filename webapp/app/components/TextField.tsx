import React from "react";

interface ITextFieldProps {
    placeholder: string;
    name: string;
    defaultValue?: string;
    width?: string;
}

const TextField = (props: ITextFieldProps) => {
    let classNames = "p-2 rounded border-2 border-blue";
    if (props.width !== undefined) {
        classNames += " " + props.width;
    }
    return (<input
        placeholder={props.placeholder} name={props.name}
        type="text"
        defaultValue={props.defaultValue}
        className={classNames}
    />);
}

export default TextField;