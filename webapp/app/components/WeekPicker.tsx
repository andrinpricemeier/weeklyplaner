import React from "react";
import DatePicker from "./DatePicker";

interface IWeekPickerProps {
    defaultWeekFrom?: string;
    defaultWeekTo?: string;
}

const WeekPicker = (props: IWeekPickerProps) => {
    return <div className={"w-4/5 flex flex-col sm:flex-row items-center"}>
        <label className={"grow"}>
            <DatePicker name={"weekFrom"} placeholder={"Woche von"}
                        defaultValue={props.defaultWeekFrom}/>
        </label>
        <span className={"px-5"}>-</span>
        <label className={"grow"}>
            <DatePicker name={"weekTo"} placeholder={"Woche bis"}
                        defaultValue={props.defaultWeekTo}/>
        </label>
    </div>
};

export default WeekPicker;