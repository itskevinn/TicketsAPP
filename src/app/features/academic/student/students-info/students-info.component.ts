import {Component} from '@angular/core';
import {StudentService} from "../../../../data/services/academic/student.service";
import {Student} from "../../../../data/models/academic/student";

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrl: './students-info.component.scss'
})
export class StudentsInfoComponent {
  students: Student[] = [];

  constructor(private studentService: StudentService) {

  }

  ngOnInit(): void {
    this.getStudents();
  }

  private getStudents(): void {
    this.studentService.getAll().subscribe(r => {
      if (!r.success) {
        return;
      }
      this.students = r.data;
    });
  }
}
