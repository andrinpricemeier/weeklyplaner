import React from "react";

interface IDatePickerProps {
    name: string;
    placeholder: string;
    defaultValue?: string;
}

const DatePicker = (props: IDatePickerProps) => {
    return (<input
        placeholder={props.placeholder} name={props.name}
        type="date"
        className={"w-full p-2 rounded border-2 border-blue"}
        defaultValue={props.defaultValue}
    />);
}

export default DatePicker;