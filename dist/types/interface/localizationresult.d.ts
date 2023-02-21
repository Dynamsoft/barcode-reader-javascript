import { EnumResultCoordinateType } from "../enum/enumresultcoordinatetype";
export interface LocalizationResult {
    /**
     * The angle of a barcode. Values range from 0 to 360.
     */
    angle: number;
    /**
     * The X coordinate of the left-most point.
     */
    x1: number;
    /**
     * The X coordinate of the second point in a clockwise direction.
     */
    x2: number;
    /**
     * The X coordinate of the third point in a clockwise direction.
     */
    x3: number;
    /**
     * The X coordinate of the fourth point in a clockwise direction.
     */
    x4: number;
    /**
     * The Y coordinate of the left-most point.
     */
    y1: number;
    /**
     * The Y coordinate of the second point in a clockwise direction.
     */
    y2: number;
    /**
     * The Y coordinate of the third point in a clockwise direction.
     */
    y3: number;
    /**
     * The Y coordinate of the fourth point in a clockwise direction.
     */
    y4: number;
    resultCoordinateType: EnumResultCoordinateType;
    transformationMatrix: Array<number>;
}
//# sourceMappingURL=localizationresult.d.ts.map