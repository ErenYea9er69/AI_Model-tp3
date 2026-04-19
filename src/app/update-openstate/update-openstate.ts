import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AICategory } from '../model/AICategory.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-openstate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-openstate.html',
})
export class UpdateOpenState implements OnInit {
  @Input() category!: AICategory;
  @Input() ajout!: boolean;
  @Output() categoryUpdated = new EventEmitter<AICategory>();

  ngOnInit(): void {
    console.log('ngOnInit du composant UpdateOpenState', this.category, 'ajout=', this.ajout);
  }

  saveCategory() {
    this.categoryUpdated.emit(this.category);
  }
}