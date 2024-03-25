import {Student} from "./student";
import {Teacher} from "./teacher";

export interface ClassGroup {
  id: string;
  code: string;
  description: string;
  subjectId: string;
  teacherUserId: string;
  teacherDto: Teacher;
  students: Student[];
}
