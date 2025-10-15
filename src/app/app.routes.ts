import { Routes } from '@angular/router';
import { Produits } from './ai-models/ai-models';
import { AddProduitComponent } from './add-ai-model/add-ai-model';
import { UpdateProduit } from './update-produit/update-produit';


export const routes: Routes = [
    {path: "produits", component : Produits},
    {path: "add-produit", component : AddProduitComponent},
    {path: "updateProduit/:id", component: UpdateProduit},
    {path: "", redirectTo: "produits", pathMatch: "full"}
];