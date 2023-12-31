import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'src/app/data/models/subject/subject';
import { SubjectService } from '../../../../data/services/subject/subject.service';
@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrl: './edit-subject.component.scss'
})
export class EditSubjectComponent implements OnInit{
  subject!: any;
  constructor(private route: ActivatedRoute, private subjectService: SubjectService){}
  ngOnInit(): void {
    this.subject = this.route.data;
    console.log(this.subject)
  }
}
