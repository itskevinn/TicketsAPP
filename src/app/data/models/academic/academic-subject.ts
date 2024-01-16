import {ClassGroup} from "./class-group";

export interface AcademicSubject {
  id: string;
  name: string;
  classGroup: ClassGroup[];
}