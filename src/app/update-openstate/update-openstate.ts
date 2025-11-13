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
    console.log('ngOnInit du composant UpdateOpenState', this.openState, 'ajout=', this.ajout);
  }

  saveOpenState() {
    this.openStateUpdated.emit(this.openState);
  }
}