import {Student} from "./student";
import {Teacher} from "./teacher";

export interface ClassGroup {
  code: string;
  name: string;
  description: string;
  teacherDto: Teacher;
  teacherId: string;
  students: Student[];
  subjectId: string;
}
