import {Student} from "./student";
import {Teacher} from "./teacher";

export interface ClassGroup {
  id: string;
  name: string;
  description: string;
  teacher: Teacher;
  students: Student[];
  subjectId: string;
}
