import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-image',
  templateUrl: './field-image.component.html',
  styleUrls: ['./field-image.component.scss']
})
export class FieldImageComponent implements OnInit {
  @Input() image = "";
  constructor() { }

  ngOnInit(): void {
  }

}
