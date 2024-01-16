import {Student} from "./student";
import {Teacher} from "./teacher";

export interface ClassGroup {
  id: string;
  name: string;
  description: string;
  teacherDto: Teacher;
  teacherId: string;
  students: Student[];
  subjectId: string;
}
