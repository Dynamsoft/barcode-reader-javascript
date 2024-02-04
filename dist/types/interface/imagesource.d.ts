import { DSImage } from "./dsimage";
export interface ImageSource {
    getImage(): Promise<DSImage> | DSImage;
}
