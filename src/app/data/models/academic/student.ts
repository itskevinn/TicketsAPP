import {Person} from "./person";
import {ClassGroup} from "./class-group";

export interface Student extends Person {
  classGroups: ClassGroup[];
}