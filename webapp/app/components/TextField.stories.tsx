import React from 'react';
import TextField from "./TextField";

export default {
  title: "TextField",
  component: TextField,
};

const Template = (args: any) => (
    <TextField placeholder={"Text eingeben"} name={"textField"} defaultValue={"Irgendetwas"}/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};