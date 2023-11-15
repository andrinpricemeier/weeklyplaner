import React, {useCallback} from "react";

interface ITaskDescriptionTextAreaProps {
    name: string;
    placeholder: string;
    defaultValue?: string;
    value: string;
    onDescriptionChanged: (description: string) => void;
}

const TaskDescriptionTextArea = (props: ITaskDescriptionTextAreaProps) => {
    const handleOnChange = useCallback((e: any) => {
        props.onDescriptionChanged(e.target.value);
    }, [props.onDescriptionChanged]);

    return <textarea name={props.name}
                     placeholder={props.placeholder}
                     defaultValue={props.defaultValue}
                     rows={3}
                     className={"p-2 rounded border-2 border-blue w-full"}
                    onChange={handleOnChange}
                    value={props.value}/>
}

export default TaskDescriptionTextArea;