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
  updatedOpenState: OpenState = { idstate: undefined as any, nomstate: "" };
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
    
    // Créer une copie sans l'ID lors de l'ajout pour éviter les conflits
    const stateToSend = { ...openState };
    if (this.ajout) {
      stateToSend.idstate = undefined as any;
    }
    
    const operation = this.ajout 
      ? this.aiModelService.ajouterOpenState(stateToSend)
      : this.aiModelService.updateOpenState(stateToSend);

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
    this.updatedOpenState = { idstate: undefined as any, nomstate: "" };
    this.ajout = true;
  }

  updateOpenState(openState: OpenState) {
    this.updatedOpenState = { ...openState };
    this.ajout = false;
  }
}