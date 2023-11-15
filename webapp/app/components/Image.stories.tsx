import React from 'react';
import Image from "./Image";
import imageFile from '../../public/subjects/Mathe.png';

export default {
  title: "Image",
  component: Image,
};

const Template = (args: any) => (
    <Image name={"Bild"} imageFilepath={imageFile}/>
);

export const Primary = Template.bind({}) as any;
Primary.args = {};