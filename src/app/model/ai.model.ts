import { AICategory } from "./AICategory.model";
import { Image } from "./image.model";

export class AIModel {
    idAI! : number;
    nomAI! : string;
    prixAI! : number;
    dateCreation! : Date ;
    aiCategory! : AICategory;
    image! : Image;
    imageStr!: string;
    images!: Image[];
    imagePath!: string;
}
