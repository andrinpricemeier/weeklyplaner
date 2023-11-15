import React from 'react';
import PupilNameText from "./PupilNameText";

export default {
  title: "PupilNameText",
  component: PupilNameText,
};

const Template = (args: any) => (
    <PupilNameText/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};