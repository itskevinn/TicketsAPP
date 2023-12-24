import { TaskSchema } from '../task/taskschema';

export interface ListSchema {
    id: string;
    name: string;
    cards: TaskSchema[];
}