import {DragDropContext, Draggable, Droppable, resetServerContext} from "react-beautiful-dnd";
import {useCallback, useEffect, useState} from "react";
import React from "react";
import {LoaderFunction} from "@remix-run/server-runtime";
import {useLoaderData} from "@remix-run/react";
import TaskListEntry from "~/components/TaskListEntry";
import SecondaryButton from "~/components/SecondaryButton";
import { v4 as uuidv4 } from 'uuid';
import {Task} from "~/routes/Task";
import {SubjectService} from "~/services/SubjectService";
import {ImageService} from "~/services/ImageService";

export const loader: LoaderFunction = async () => {
    resetServerContext();
    console.log("Resetting server context.");
    return null;
};

const subjectService = new SubjectService();
const imageService = new ImageService();

const TaskList = () => {
    const ignore = useLoaderData();
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const defaultTask = {
            taskId: uuidv4(),
            subject: "",
            title: "",
            description: "",
            imageName: "random_1"
        }
        setTasks(previous => [...previous, defaultTask]);
    }, []);

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }
        setTasks(previous => {
            const newItems = [...previous];
            const [removed] = newItems.splice(result.source.index, 1);
            newItems.splice(result.destination.index, 0, removed);
            return newItems;
        });
    };

    const onTaskDeleted = (taskId: string) => {
        setTasks(previous => {
            const task = previous.find(t => t.taskId === taskId);
            if (task === undefined) {
                return previous;
            }
            const newTasks = [];
            for (const ta of previous) {
                if (ta.taskId !== taskId) {
                    newTasks.push(ta);
                }
            }
            return newTasks;
        });
    };

    const onTaskAddRequested = () => {
        const newTask = {
            taskId: uuidv4(),
            subject: "",
            title: "",
            description: "",
            imageName: "random_1"
        }
        setTasks(previous => [...previous, newTask]);
    };

    const onSubjectChanged = (taskId: string, subject: string) => {
        setTasks(previous => {
            const task = previous.find(t => t.taskId === taskId);
            if (task ===  undefined) {
                return previous;
            }
            let imageName;
            if (subjectService.isKnownSubject(subject)) {
                imageName = imageService.getImageName(subject);
            } else {
                imageName = imageService.getRandomImageName();
            }
            task.subject = subject;
            task.imageName = imageName;
            return [...previous];
        });
    }

    const onImageNameChanged = (taskId: string, imageName: string) => {
        setTasks(previous =>{
            const task = tasks.find(t => t.taskId === taskId);
            if (task ===  undefined) {
                return previous;
            }
            task.imageName = imageName;
            return [...previous];
        });
    }

    const onTitleChanged = (taskId: string, title: string) => {
        setTasks(previous => {
            const task = tasks.find(t => t.taskId === taskId);
            if (task ===  undefined) {
                return previous;
            }
            task.title = title;
            return [...previous];
        });
    }

    const onDescriptionChanged = (taskId: string, description: string) => {
        setTasks(previous => {
            const task = tasks.find(t => t.taskId === taskId);
            if (task ===  undefined) {
                return previous;
            }
            task.description = description;
            return [...previous];
        });
    }

    return <React.Fragment>
        <h2 className={"text-2xl mb-3"}>Aufgaben</h2>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided: any, snapshot: any) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => (
                            <Draggable key={task.taskId} draggableId={task.taskId} index={index}>
                                {(provided: any, snapshot: any) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={"mb-10"}
                                    >
                                        <TaskListEntry
                                            task={task}
                                            onDelete={onTaskDeleted}
                                            onTitleChanged={onTitleChanged}
                                            onSubjectChanged={onSubjectChanged}
                                            onDescriptionChanged={onDescriptionChanged}
                                            onImageNameChanged={onImageNameChanged}/>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
        <div className={"flex justify-end mt-10"}>
            <SecondaryButton content={"Aufgabe hinzufügen"} onClick={onTaskAddRequested}/>
        </div>
    </React.Fragment>;
}

export default TaskList;