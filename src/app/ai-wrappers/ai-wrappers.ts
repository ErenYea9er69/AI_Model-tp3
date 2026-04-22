import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AIWrapper } from '../model/ai.model';
import { AIWrapperService } from '../services/ai';
import { AuthService } from '../services/auth';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ai-wrappers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ai-wrappers.html',
})
export class AIWrappers implements OnInit {
  aiWrappers? : AIWrapper[];
  apiURL: string = 'http://localhost:8080/aiwrappers/api';

  constructor(private aiWrapperService: AIWrapperService, public authService: AuthService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.chargerAIWrappers();
  }

  chargerAIWrappers() {
    this.aiWrapperService.listeAIWrappers().subscribe(prods => {
      this.aiWrappers = prods;
      this.cd.detectChanges();
    });
  }

  supprimerAIWrapper(p: AIWrapper) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.aiWrapperService.supprimerAIWrapper(p.idWrapper).subscribe(() => {
        this.chargerAIWrappers();
      });
    }
  }
}