import { OpenState } from "./OpenState.model";

export class AIModel {
  idModel?: number;
  name?: string;
  version?: string;
  trainingDate?: Date;
  accuracy?: number;
  OpenState! : OpenState;
}
