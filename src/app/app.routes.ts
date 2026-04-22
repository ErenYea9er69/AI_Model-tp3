import { Routes } from '@angular/router';
import { AIWrappers } from './ai-wrappers/ai-wrappers';
import { AddAIWrapper } from './add-ai-wrapper/add-ai-wrapper';
import { UpdateAIWrapper } from './update-ai-wrapper/update-ai-wrapper';
import { RechercheParState } from './recherche-par-state/recherche-par-state';
import { RechercheParNom } from './recherche-par-nom/recherche-par-nom';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { aimodelGuard } from './aimodel-guard';
import { ListeOpenStates } from './liste-openstates/liste-openstates';
import { Register } from './register/register';
import { VerifEmail } from './verif-email/verif-email';

export const routes: Routes = [
    {path: "aiWrappers", component : AIWrappers},
    {path: "add-ai-wrapper", component : AddAIWrapper, canActivate: [aimodelGuard]},
    {path: "updateAIWrapper/:id", component: UpdateAIWrapper, canActivate: [aimodelGuard]},
    {path: "rechercheParTheme", component: RechercheParState },
    {path: "rechercheParNom", component : RechercheParNom},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'verifEmail', component: VerifEmail},
    {path: 'app-forbidden', component: Forbidden},
    {path: "liste-themes", component: ListeOpenStates, canActivate: [aimodelGuard]},

    {path: "", redirectTo: "aiWrappers", pathMatch: "full"}
];