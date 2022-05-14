import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field-text',
  templateUrl: './field-text.component.html',
  styleUrls: ['./field-text.component.scss']
})
export class FieldTextComponent implements OnInit {
  @Input() title = "";
  @Input() value = "";
  constructor() { }

  ngOnInit(): void {
  }

}
