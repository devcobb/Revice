import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-heading',
  templateUrl: './field-heading.component.html',
  styleUrls: ['./field-heading.component.scss']
})
export class FieldHeadingComponent implements OnInit {
  @Input() heading = "";
  constructor() { }

  ngOnInit(): void {
  }

}
