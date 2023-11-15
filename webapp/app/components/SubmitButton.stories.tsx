import React from 'react';
import SubmitButton from "./SubmitButton";

export default {
  title: "SubmitButton",
  component: SubmitButton,
};

const Template = (args: any) => (
    <SubmitButton content={"Erstellen"}/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};