import PageTitle from "~/components/PageTitle";
import {Form, useActionData, useTransition} from "@remix-run/react";
import WeekPicker from "~/components/WeekPicker";
import SchoolClassesField from "~/components/SchoolClassesField";
import PupilNameText from "~/components/PupilNameText";
import TaskList from "~/components/TaskList";
import SubmitButton from "~/components/SubmitButton";
import {useEffect, useState} from "react";
import {saveWordDocument} from "~/services/FileService";

const WeeklyPlanPage = () => {
    const transition = useTransition();
    const actionData = useActionData();
    const [lastReportUid, setLastReportUid] = useState<string>("");

    useEffect(() => {
        if (transition.state === "submitting") {
            return;
        }
        if (actionData === undefined) {
            return;
        }
        if (lastReportUid === actionData.reply.reportuid) {
            return;
        }
        if (actionData.reply.error.hasErrors) {
            console.log("Form had errors.");
            console.log(actionData.reply.error);
            return;
        }
        saveWordDocument(`Wochenplan_${new Date().toDateString().replace(/ /g, "_", )}`, actionData.reply.report);
        setLastReportUid(actionData.reply.reportuid);
    }, [transition.state, actionData, lastReportUid]);
    return (
        <main className="min-h-full max-w-prose mx-auto bg-white p-10">
            <PageTitle title={"Wochenplan"}/>
            <Form className={"mt-5"} method="post">
                <fieldset
                    disabled={transition.state === "submitting"}
                >
                    <div className={"mt-5"}>
                        <WeekPicker
                        defaultWeekFrom={actionData ? actionData.formValues.weekFrom : undefined}
                        defaultWeekTo={actionData ? actionData.formValues.weekTo : undefined}/>
                        {actionData && actionData.reply.error.hasErrors && actionData.reply.error.weekFrom !== "" ? (
                            <p className={"text-red"}>
                                {actionData.reply.error.weekFrom}
                            </p>
                        ) : null}
                        {actionData && actionData.reply.error.hasErrors && actionData.reply.error.weekTo !== "" ? (
                            <p className={"text-red"}>
                                {actionData.reply.error.weekTo}
                            </p>
                        ) : null}
                    </div>
                    <p className={"mt-5"}>
                        <SchoolClassesField defaultValue={actionData ? actionData.formValues.schoolclasses : undefined}/>
                        {actionData && actionData.reply.error.hasErrors && actionData.reply.error.schoolclasses !== "" ? (
                            <p className={"text-red"}>
                                {actionData.reply.error.schoolclasses}
                            </p>
                        ) : null}
                    </p>
                    <p className={"mt-20 mb-5"}><PupilNameText/></p>
                    <TaskList/>
                    {actionData && actionData.reply.error.hasErrors && actionData.reply.error.tasks !== "" ? (
                        <p className={"text-red mt-5"}>
                            Die Aufgaben sind noch nicht komplett ausgefüllt:<br/>
                            {actionData.reply.error.tasks}
                        </p>
                    ) : null}
                    <div className={"flex justify-end mt-10"}>
                        <SubmitButton content={transition.state === "submitting"
                            ? "Wird erstellt..."
                            : "Wochenplan erstellen"}/>
                    </div>
                    {actionData && actionData.reply.error.hasErrors && actionData.reply.error.generalError !== "" ? (
                        <p className={"text-red"}>
                            {actionData.reply.error.generalError}
                        </p>
                    ) : null}
                </fieldset>
            </Form>
        </main>
    );
}

export default WeeklyPlanPage;