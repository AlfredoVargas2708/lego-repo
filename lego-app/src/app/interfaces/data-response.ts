import { Lego } from "./lego";
import { Image } from "./image";

export interface DataResponse {
    legos: Lego[];
    images: Image;
    count: number;
}