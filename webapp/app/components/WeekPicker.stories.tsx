import React from 'react';
import WeekPicker from "./WeekPicker";

export default {
  title: "WeekPicker",
  component: WeekPicker,
};

const Template = (args: any) => (
    <WeekPicker defaultWeekFrom={"2022-01-01"} defaultWeekTo={"2022-02-01"}/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};