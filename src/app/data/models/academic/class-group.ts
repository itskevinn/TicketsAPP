import {Student} from "./student";

export interface ClassGroup {
  id: string;
  name: string;
  students: Student[];
}
