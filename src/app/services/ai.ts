import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AIWrapper } from '../model/ai.model';
import { AITheme } from "../model/AITheme.model";
import { AIThemeWrapper } from '../model/AIThemeWrapper.model';
import { Image } from '../model/image.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AIWrapperService {
  apiURL: string = environment.apiURL;
  apiURLCat: string = 'http://localhost:8080/aiwrappers/api/cat';

  constructor(private http : HttpClient) { }

  listeAIWrappers(): Observable<AIWrapper[]> {
    return this.http.get<AIWrapper[]>(this.apiURL + "/all");
  }

  ajouterAIWrapper(model: AIWrapper): Observable<AIWrapper> {
    return this.http.post<AIWrapper>(this.apiURL + "/addprod", model);
  }

  supprimerAIWrapper(id: number) {
    const url = `${this.apiURL}/delprod/${id}`;
    return this.http.delete(url);
  }

  consulterAIWrapper(id: number): Observable<AIWrapper> {
    const url = `${this.apiURL}/getbyid/${id}`;
    return this.http.get<AIWrapper>(url);
  }

  updateAIWrapper(model: AIWrapper): Observable<AIWrapper> {
    return this.http.put<AIWrapper>(this.apiURL + "/updateprod", model);
  }

  listeThemes(): Observable<AITheme[]> {
    return this.http.get<AITheme[]>(this.apiURLCat);
  }

  rechercherParTheme(idTheme: number): Observable<AIWrapper[]> {
    const url = `${this.apiURL}/prodscat/${idTheme}`;
    return this.http.get<AIWrapper[]>(url);
  }

  rechercherParNom(nom: string): Observable<AIWrapper[]> {
    const url = `${this.apiURL}/prodsByName/${nom}`;
    return this.http.get<AIWrapper[]>(url);
  }

  ajouterTheme(cat: AITheme): Observable<AITheme> {
    return this.http.post<AITheme>(this.apiURLCat, cat);
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
