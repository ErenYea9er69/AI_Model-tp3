import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AITheme } from '../model/AITheme.model';
import { AIWrapperService } from '../services/ai';
import { UpdateOpenState } from '../update-openstate/update-openstate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-liste-openstates',
  standalone: true,
  imports: [CommonModule, UpdateOpenState],
  templateUrl: './liste-openstates.html',
})
export class ListeOpenStates implements OnInit {
  themes!: AITheme[];
  updatedCat: AITheme = {idTheme: 0, nomTheme: ""};
  ajout: boolean = true;

  constructor(private aiWrapperService: AIWrapperService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chargerThemes();
  }

  chargerThemes() {
    this.aiWrapperService.listeThemes().subscribe(cats => {
      this.themes = cats;
      console.log(cats);
      this.cd.detectChanges();
    });
  }

  catUpdated(cat: AITheme) {
    console.log("Cat updated event", cat);
    this.aiWrapperService.ajouterTheme(cat).subscribe(() => this.chargerThemes());
    this.updatedCat = {idTheme: 0, nomTheme: ""};
    this.ajout = true;
  }

  updateCat(cat: AITheme) {
    this.updatedCat = cat;
    this.ajout = false;
  }
}