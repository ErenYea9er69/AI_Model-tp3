import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OpenState } from '../model/OpenState.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-openstate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-openstate.html',
})
export class UpdateOpenState implements OnInit {
  @Input() openState!: OpenState;
  @Input() ajout!: boolean;
  @Output() openStateUpdated = new EventEmitter<OpenState>();

  ngOnInit(): void {
    console.log('UpdateOpenState component initialized', this.openState, 'ajout=', this.ajout);
  }

  saveOpenState() {
    console.log('Saving OpenState, ajout=', this.ajout, 'data=', this.openState);
    this.openStateUpdated.emit(this.openState);
  }
}