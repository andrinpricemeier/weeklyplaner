import TextField from "./TextField";

interface ISchoolClassesFieldProps {
    defaultValue?: string;
}

const SchoolClassesField = (props: ISchoolClassesFieldProps) => {
    return (
        <label className={"pr-5"}>
            <TextField placeholder={"Schulklassen"} name={"schoolClasses"}
                       defaultValue={props.defaultValue} width={"w-4/5"}/>
        </label>
    )
}

export default SchoolClassesField;