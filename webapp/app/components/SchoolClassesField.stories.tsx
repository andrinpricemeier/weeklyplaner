import React from 'react';
import SchoolClassesField from "./SchoolClassesField";

export default {
  title: "SchoolClassesField",
  component: SchoolClassesField,
};

const Template = (args: any) => (
    <SchoolClassesField defaultValue={"2. und 3. Klasse"}/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};