import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AITheme } from '../model/AITheme.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-openstate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-openstate.html',
})
export class UpdateOpenState implements OnInit {
  @Input() theme!: AITheme;
  @Input() ajout!: boolean;
  @Output() themeUpdated = new EventEmitter<AITheme>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateOpenState', this.theme, 'ajout=', this.ajout);
  }

  saveTheme() {
    this.themeUpdated.emit(this.theme);
    
  }
}