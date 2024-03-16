import {User} from "../security/user.model";
import {ProjectStatus} from "./project-status.model";
import {TicketList} from "./ticketList";

export interface Project {
  name: string;
  description: string;
  projectManager: User;
  projectManagerId: string;
  classGroupId: string;
  projectStatus: ProjectStatus;
  ticketLists: TicketList
}