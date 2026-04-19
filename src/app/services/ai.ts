import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIModel } from '../model/ai.model';
import { AICategory } from "../model/AICategory.model";
import { AICategoryWrapper } from '../model/AICategoryWrapper.model';
import { Image } from '../model/image.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AIModelService {
  apiURL: string = environment.apiURL;
  apiURLCat: string = 'http://localhost:8080/aimodels/cat';

  constructor(private http : HttpClient) { }

  listeAIModels(): Observable<AIModel[]> {
    return this.http.get<AIModel[]>(this.apiURL + "/all");
  }

  ajouterAIModel(model: AIModel): Observable<AIModel> {
    return this.http.post<AIModel>(this.apiURL + "/addprod", model);
  }

  supprimerAIModel(id: number) {
    const url = `${this.apiURL}/delprod/${id}`;
    return this.http.delete(url);
  }

  consulterAIModel(id: number): Observable<AIModel> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<AIModel>(url);
  }

  updateAIModel(model: AIModel): Observable<AIModel> {
    return this.http.put<AIModel>(this.apiURL + "/updateprod", model);
  }

  listeCategories(): Observable<AICategoryWrapper> {
    return this.http.get<AICategoryWrapper>(this.apiURLCat);
  }

  rechercherParCategorie(idCat: number): Observable<AIModel[]> {
    const url = `${this.apiURL}/prodscat/${idCat}`;
    return this.http.get<AIModel[]>(url);
  }

  rechercherParNom(nom: string): Observable<AIModel[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<AIModel[]>(url);
  }

  ajouterCategorie(cat: AICategory): Observable<AICategory> {
    return this.http.post<AICategory>(this.apiURLCat, cat);
  }

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${this.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${this.apiURL}/image/delete/${id}`;
    return this.http.delete(url);
  }

  uploadImageFS(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${this.apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
}