import { Routes } from '@angular/router';
import { AIModels } from './ai-models/ai-models';
import { AddAIModel } from './add-ai-model/add-ai-model';
import { UpdateAIModel } from './update-ai-model/update-ai-model';
import { RechercheParState } from './recherche-par-state/recherche-par-state';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { aimodelGuard } from './aimodel-guard';
import { ListeOpenStates } from './liste-openstates/liste-openstates';
import { Register } from './register/register';
import { VerifEmail } from './verif-email/verif-email';

export const routes: Routes = [
    {path: "aiModels", component : AIModels},
    {path: "add-ai-model", component : AddAIModel, canActivate: [aimodelGuard]},
    {path: "updateAIModel/:id", component: UpdateAIModel, canActivate: [aimodelGuard]},
    {path: "rechercheParCategorie", component: RechercheParState },
    {path: "rechercheParNom", component : RechercheParNom},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'verifEmail', component: VerifEmail},
    {path: 'app-forbidden', component: Forbidden},
    {path: "liste-categories", component: ListeOpenStates, canActivate: [aimodelGuard]},

    {path: "", redirectTo: "aiModels", pathMatch: "full"}
];