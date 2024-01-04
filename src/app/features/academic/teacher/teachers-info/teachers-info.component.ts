import {Component} from '@angular/core';
import {Student} from "../../../../data/models/academic/student";
import {StudentService} from "../../../../data/services/academic/student.service";
import {Teacher} from "../../../../data/models/academic/teacher";
import {TeacherService} from "../../../../data/services/academic/teacher.service";

@Component({
  selector: 'app-teachers-info',
  templateUrl: './teachers-info.component.html',
  styleUrl: './teachers-info.component.scss'
})
export class TeachersInfoComponent {
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {

  }

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents(): void {
    this.teacherService.getAll().subscribe(r => {
      if (!r.success) {
        return;
      }
      this.teachers = r.data;
    });
  }
}
