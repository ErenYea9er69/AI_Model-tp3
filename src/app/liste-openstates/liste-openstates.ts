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
      console.log(cats);
    });
  }

  catUpdated(cat: AICategory) {
    console.log("Cat updated event", cat);
    this.aiModelService.ajouterCategorie(cat).subscribe(() => this.chargerCategories());
    this.updatedCat = {idCat: 0, nomCat: ""};
    this.ajout = true;
  }

  updateCat(cat: AICategory) {
    this.updatedCat = cat;
    this.ajout = false;
  }
}