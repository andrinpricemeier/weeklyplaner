import React from 'react';
import PageTitle from "./PageTitle";

export default {
  title: "PageTitle",
  component: PageTitle,
};

const Template = (args: any) => (
    <PageTitle title={"Wochenplan"}/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};