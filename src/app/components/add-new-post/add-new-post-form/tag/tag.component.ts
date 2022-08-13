import { Component, Input, OnInit } from '@angular/core';
import { Tag } from 'src/app/global/global-interfaces';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent implements OnInit {
  @Input() content = {} as Tag;
  @Input() id = 0;
  constructor() {}

  ngOnInit(): void {}
}
