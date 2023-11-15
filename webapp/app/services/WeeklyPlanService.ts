import {TaskMessage, WeeklyPlanReply, WeeklyPlanRequest} from "../../generated/proto/weeklyplan_pb";
import {WeeklyPlanerClient} from "../../generated/proto/weeklyplan_grpc_pb";
import {credentials} from "@grpc/grpc-js";
import util from 'util';

export class WeeklyPlanService {
    constructor(private readonly reportingServiceUrl: string, private readonly reportingServicePort: string) {
    }

    async createWeeklyPlan(weekFrom: string, weekTo: string, schoolClasses: string, tasks: TaskMessage[]): Promise<WeeklyPlanReply> {
        const client = new WeeklyPlanerClient(
            `${this.reportingServiceUrl}:${this.reportingServicePort}`,
            credentials.createInsecure()
        );
        const request = new WeeklyPlanRequest();
        request.setWeekFrom(weekFrom);
        request.setWeekTo(weekTo);
        request.setSchoolclasses(schoolClasses);
        request.setTasksList(tasks);
        const createWeeklyPlan = util.promisify(client.createWeeklyPlan).bind(client);
        return await createWeeklyPlan(request) as WeeklyPlanReply;
    }
}