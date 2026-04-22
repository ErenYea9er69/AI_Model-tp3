import { AITheme } from "./AITheme.model";
import { Image } from "./image.model";

export class AIWrapper {
    idWrapper! : number;
    nomWrapper! : string;
    prixWrapper! : number;
    dateCreation! : Date ;
    aiTheme! : AITheme;
    image! : Image;
    imageStr!: string;
    images!: Image[];
    imagePath!: string;
}
