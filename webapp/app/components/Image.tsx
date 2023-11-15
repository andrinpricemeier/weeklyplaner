import React from "react";

interface IImageProps {
    name: string;
    imageFilepath: string;
}

const Image = (props: IImageProps) => {
    return <img alt={props.name} src={props.imageFilepath} className="inline w-20" />
}

export default Image;