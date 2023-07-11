import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IContest } from 'app/entities/contest/contest.model';
import { InputtextComponent } from '../listfields/inputtext/inputtext/inputtext.component';

@Component({
  selector: 'jhi-contestformdraggable',
  templateUrl: './contestformdraggable.component.html',
  styleUrls: ['./contestformdraggable.component.scss'],
})
export class ContestformdraggableComponent implements OnInit {
  @ViewChild(InputtextComponent) u!: InputtextComponent;

  @Input() contfdInput!: IContest | undefined;

  constructor() {}

  ngOnInit(): void {}
}
