import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Produit } from '../model/ai.model';
import { ProduitService } from '../services/produit';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-produit.html',
})
export class AddProduitComponent {

  newProduit: Produit = new Produit();

  message: string = '';

  constructor(private produitService: ProduitService) {}

  addProduit() {
    if (this.newProduit.idProduit && this.newProduit.nomProduit && this.newProduit.prixProduit) {
      this.produitService.ajouterProduit(this.newProduit);
      this.message = "Produit " + this.newProduit.nomProduit + " ajouté avec succès !";
      
      // Clear the form
      this.newProduit = new Produit();
      

}}}