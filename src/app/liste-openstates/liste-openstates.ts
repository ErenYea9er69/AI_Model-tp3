import { Component, OnInit } from '@angular/core';
import { AICategory } from '../model/AICategory.model';
import { AIModelService } from '../services/ai';
import { UpdateOpenState } from '../update-openstate/update-openstate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-openstates',
  standalone: true,
  imports: [CommonModule, UpdateOpenState],
  templateUrl: './liste-openstates.html',
})
export class ListeOpenStates implements OnInit {
  categories!: AICategory[];
  updatedCat: AICategory = {idCat: 0, nomCat: ""};
  ajout: boolean = true;

  constructor(private aiModelService: AIModelService) {}

  ngOnInit(): void {
    this.chargerCategories();
  }

  chargerCategories() {
    this.aiModelService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
    });
  }

  catUpdated(cat: AICategory) {
    console.log('Category updated event', cat);
    // Note: Standard Spring Data REST or custom REST logic for categories CRUD is needed here
    // For now, we update the local view or refresh if the service had methods.
    // The user's tutorial focus is on Products, but let's keep the list functional.
    this.chargerCategories();
    this.updatedCat = {idCat: 0, nomCat: ""};
    this.ajout = true;
  }

  updateCat(cat: AICategory) {
    this.updatedCat = cat;
    this.ajout = false;
  }
}