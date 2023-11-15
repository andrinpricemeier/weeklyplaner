import React, {useCallback} from "react";
import {SubjectService} from "~/services/SubjectService";

const subjectService = new SubjectService();
const subjects = subjectService.getSubjects();

interface ISubjectSelectProps {
    taskId: string;
    value: string;
    onSubjectChanged: (subject: string) => void;
}

const SubjectSelect = (props: ISubjectSelectProps) => {

    const onSubjectChangedFunc = props.onSubjectChanged;
    const onSubjectChange = useCallback((e: any) => {
        const subject = e.target.value;
        onSubjectChangedFunc(subject)
    }, [onSubjectChangedFunc]);

    return <React.Fragment>
        <input list="subjects" name={"subject-" + props.taskId} placeholder={"Fach"}
               className={"p-2 rounded border-2 border-blue w-full"} onChange={onSubjectChange}
        value={props.value}/>
        <datalist id="subjects">
            {subjects.map(subject => <option key={subject} value={subject}/>)}
        </datalist>
    </React.Fragment>
}

export default SubjectSelect;