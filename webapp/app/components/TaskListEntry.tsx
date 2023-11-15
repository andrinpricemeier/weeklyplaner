import TaskImage from "~/components/TaskImage";
import SubjectSelect from "~/components/SubjectSelect";
import React, {useCallback} from "react";
import TaskDescriptionTextArea from "~/components/TaskDescriptionTextArea";
import TaskTitleField from "~/components/TaskTitleField";
import DangerButton from "~/components/DangerButton";
import {Task} from "~/routes/Task";

interface ITaskListEntryProps {
    task: Task;
    onDelete: (taskId: string) => void;
    onSubjectChanged: (taskId: string, subject: string) => void;
    onImageNameChanged: (taskId: string, imageName: string) => void;
    onTitleChanged: (taskId: string, title: string) => void;
    onDescriptionChanged: (taskId: string, description: string) => void;
}

const TaskListEntry = (props: ITaskListEntryProps) => {
    const onDeleteFunc = props.onDelete;
    const onDeleteClicked = useCallback(() => {
        onDeleteFunc(props.task.taskId);
    }, []);

    const onImageNameChanged = (imageName: string) => {
        props.onImageNameChanged(props.task.taskId, imageName);
    }

    const onSubjectChanged = (subject: string) => {
        props.onSubjectChanged(props.task.taskId, subject);
    }

    const onTitleChanged = (title: string) => {
        props.onTitleChanged(props.task.taskId, title);
    }

    const onDescriptionChanged = (description: string) => {
        props.onDescriptionChanged(props.task.taskId, description);
    }

    return <React.Fragment>
        <div className={"flex flex-col sm:flex-row sm:items-center"}>
            <TaskImage taskId={props.task.taskId} imageName={props.task.imageName}/>
            <span className={"my-3 sm:ml-5 sm:mr-5 grow"}><SubjectSelect taskId={props.task.taskId} onSubjectChanged={onSubjectChanged} value={props.task.subject}/></span>
            <DangerButton content={"Aufgabe löschen"} onClick={onDeleteClicked}/>
        </div>
        <p className={"my-3"}>
            <label>
                <TaskTitleField
                    placeholder={"Titel"} name={"title-" + props.task.taskId}
                    value={props.task.title}
                    onTitleChanged={onTitleChanged}
                    />
            </label>
        </p>
        <p>
            <label>
                <TaskDescriptionTextArea placeholder={"Beschreibung"} name={"description-" + props.task.taskId}
                                         value={props.task.description}
                                         onDescriptionChanged={onDescriptionChanged}
                />
            </label>
        </p>
    </React.Fragment>
}

export default TaskListEntry;