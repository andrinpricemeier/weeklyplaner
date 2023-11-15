import React, {useCallback} from "react";

interface ITaskTitleFieldProps {
    placeholder: string;
    name: string;
    defaultValue?: string;
    value: string;
    onTitleChanged: (title: string) => void;
}

const TaskTitleField = (props: ITaskTitleFieldProps) => {
    const handleOnChange = useCallback((e: any) => {
        props.onTitleChanged(e.target.value);
    }, [props.onTitleChanged]);

    return (<input
        placeholder={props.placeholder} name={props.name}
        type="text"
        value={props.value}
        defaultValue={props.defaultValue}
        className={"p-2 rounded border-2 border-blue w-full font-bold"}
        onChange={handleOnChange}
    />);
}

export default TaskTitleField;