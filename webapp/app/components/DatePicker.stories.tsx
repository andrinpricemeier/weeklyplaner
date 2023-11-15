import React from 'react';
import DatePicker from "./DatePicker";

export default {
  title: "DatePicker",
  component: DatePicker,
};

const Template = (args: any) => (
    <DatePicker name={"Datumswahl"} placeholder={"Datum wählen"} defaultValue={"2022-03-03"}/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};