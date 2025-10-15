import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/ai.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-produit.html',
})
export class UpdateProduit implements OnInit {

  currentProduit = new Produit();
  constructor(private activatedRoute: ActivatedRoute,
    private router :Router,
     private produitService: ProduitService) {}
  ngOnInit() {
    // console.log(this.route.snapshot.params.id);
    this.currentProduit = this.produitService.consulterProduit(
      this.activatedRoute.snapshot.params['id']
    );
    console.log(this.currentProduit);
  }
updateProduit()
{ //console.log(this.currentProduit);
this.produitService.updateProduit(this.currentProduit);
this.router.navigate(['produits']);

}
}
