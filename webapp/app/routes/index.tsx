import WeeklyPlanPage from "~/components/WeeklyPlanPage";
import {ActionFunction, json} from "@remix-run/server-runtime";
import {TaskMessage} from "../../generated/proto/weeklyplan_pb";
import {WeeklyPlanService} from "~/services/WeeklyPlanService";

const extractTasksFromForm = (formEntries: IterableIterator<[string, FormDataEntryValue]>): TaskMessage[] => {
    const tasks: TaskMessage[] = [];
    for (const [key, value] of formEntries) {
        const isTask = key.includes("-");
        if (!isTask) {
            continue;
        }
        const nameId = key.split("-");
        const name = nameId[0];
        const id = nameId[1];
        let task = tasks.find(t => t.getTaskid() === id);
        if (task === undefined) {
            task = new TaskMessage();
            task.setTaskid(id);
            tasks.push(task);
        }
        if (name === "subject") {
            task.setSubject(value as string);
        } else if (name === "title") {
            task.setTitle(value as string);
        } else if (name === "description") {
            task.setDescription(value as string);
        } else if (name === "image") {
            task.setImagename(`${value as string}.png`);
        }
    }
    return tasks;
}

export const action: ActionFunction = async ({request}) => {
    const formData = await request.formData();
    const tasks = extractTasksFromForm(formData.entries());
    console.log("Added tasks");
    console.log(tasks);
    console.log(`Using backend: ${process.env.REPORTING_SERVICE_URL!}:${process.env.REPORTING_SERVICE_PORT!}`);
    const service = new WeeklyPlanService(process.env.REPORTING_SERVICE_URL!, process.env.REPORTING_SERVICE_PORT!);
    try {
        console.log("Received form data");
        console.log(Object.fromEntries(formData));
        const reply = await service.createWeeklyPlan(
            formData.get("weekFrom") as string,
            formData.get("weekTo") as string,
            formData.get("schoolClasses") as string,
            tasks);
        console.log("Call successful.");
        console.log(reply);
        console.log(reply.toObject());
        const values = Object.fromEntries(formData);
        const response = {} as any;
        response.reply = reply.toObject();
        response.formValues = values;
        return json(response);
    } catch (e) {
        const response = {} as any;
        response.reply = {};
        response.formValues = {};
        console.error("Creating weekly plan failed.");
        console.error(e);
        return json(response);
    }
};

export default function Index() {
    return <WeeklyPlanPage/>
}
