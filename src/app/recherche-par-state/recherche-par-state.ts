import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AIWrapper } from '../model/ai.model';
import { AITheme } from '../model/AITheme.model';
import { AIWrapperService } from '../services/ai';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recherche-par-state',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recherche-par-state.html',
})
export class RechercheParState implements OnInit {
  aiWrappers! : AIWrapper[];
  themes! : AITheme[];
  idTheme! : number;
  apiURL: string = 'http://localhost:8080/aiwrappers/api';

  constructor(private aiWrapperService : AIWrapperService, public authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.aiWrapperService.listeThemes().subscribe(cats => {
      this.themes = cats;
      this.cd.detectChanges();
    });
    this.aiWrappers = [];
  }

  onChange() {
    this.aiWrapperService.rechercherParTheme(this.idTheme).subscribe(prods => {
      this.aiWrappers = prods;
      this.cd.detectChanges();
    });
  }

  supprimerAIWrapper(model: AIWrapper) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.aiWrapperService.supprimerAIWrapper(model.idWrapper!).subscribe(() => {
        this.onChange();
      });
    }
  }
}