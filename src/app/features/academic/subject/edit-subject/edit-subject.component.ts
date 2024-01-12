import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'src/app/data/models/academic/subject';
import { SubjectService } from '../../../../data/services/academic/subject.service';
@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.scss'
})
export class EditSubjectComponent implements OnInit{
  subjectId!: any;
  constructor(private route: ActivatedRoute, private subjectService: SubjectService){}
  ngOnInit(): void {
    this.subjectId = this.route;
    console.log(this.subjectId)
  }
}
