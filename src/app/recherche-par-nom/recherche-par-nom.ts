import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AIWrapper } from '../model/ai.model';
import { AIWrapperService } from '../services/ai';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchFilterPipe],
  templateUrl: './recherche-par-nom.html',
})
export class RechercheParNom implements OnInit {
  nomWrapper!: string;
  allAImodels!: AIWrapper[];
  aiWrappers!: AIWrapper[];
  searchTerm!: string;

  constructor(private aiWrapperService: AIWrapperService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.aiWrapperService.listeAIWrappers().subscribe((prods) => {
      this.allAImodels = prods;
      this.aiWrappers = prods;
      this.cd.detectChanges();
    });
  }

  rechercherProds() {
    if (this.nomWrapper) {
      this.aiWrapperService.rechercherParNom(this.nomWrapper).subscribe((prods) => {
        this.aiWrappers = prods;
        this.cd.detectChanges();
      });
    } else {
      this.aiWrappers = this.allAImodels;
    }
  }

  onKeyUp(filterText: string) {
    this.aiWrappers = this.allAImodels.filter((item) =>
      item.nomWrapper!.toLowerCase().includes(filterText.toLowerCase())
    );
  }
}