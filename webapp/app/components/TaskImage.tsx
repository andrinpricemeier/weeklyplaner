import React, {memo, useEffect, useState} from "react";
import Image from "./Image";
import {SubjectService} from "../services/SubjectService";
import {ImageService} from "../services/ImageService";

interface ITaskImageProps {
    taskId: string;
    imageName: string;
}

const TaskImage = memo((props: ITaskImageProps) => {
    const elementName = `image-${props.taskId}`;
    return <React.Fragment>
        <input type={"hidden"} name={elementName} value={props.imageName}/>
        <Image name={elementName} imageFilepath={`subjects/${props.imageName}.png`}/>
    </React.Fragment>
});

export default TaskImage;