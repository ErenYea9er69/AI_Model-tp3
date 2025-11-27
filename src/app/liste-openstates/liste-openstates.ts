import { Component, OnInit } from '@angular/core';
import { OpenState } from '../model/OpenState.model';
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
  openStates: OpenState[] = [];
  updatedOpenState: OpenState = { idstate: 0, nomstate: "" };
  ajout: boolean = true;

  constructor(private aiModelService: AIModelService) {}

  ngOnInit(): void {
    this.chargerOpenStates();
  }

  chargerOpenStates(): void {
    this.aiModelService.listestate().subscribe({
      next: (data) => {
        this.openStates = data;
      },
      error: (err) => {
        console.error('Erreur chargement OpenStates:', err);
      }
    });
  }

  openStateUpdated(openState: OpenState) {
    console.log('OpenState updated event', openState);
    
    const operation = this.ajout 
      ? this.aiModelService.ajouterOpenState(openState)
      : this.aiModelService.updateOpenState(openState);

    operation.subscribe({
      next: () => {
        this.chargerOpenStates();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur sauvegarde OpenState:', err);
      }
    });
  }

  resetForm(): void {
    this.updatedOpenState = { idstate: 0, nomstate: "" };
    this.ajout = true;
  }

  updateOpenState(openState: OpenState) {
    this.updatedOpenState = { ...openState };
    this.ajout = false;
  }
}