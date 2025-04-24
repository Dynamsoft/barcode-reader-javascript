import { DSImageData, Quadrilateral, LineSegment, Contour, Corner, Edge, EnumCapturedResultItemType, OriginalImageResultItem } from 'dynamsoft-core';

declare class ImageManager {
    /**
     * This method saves an image in either PNG or JPG format. The desired file format is inferred from the file extension provided in the 'name' parameter. Should the specified file format be omitted or unsupported, the data will default to being exported in PNG format.
     *
     * @param image The image to be saved, of type `DSImageData`.
     * @param name The name of the file, as a string, under which the image will be saved.
     * @param download An optional boolean flag that, when set to true, triggers the download of the file.
     *
     * @returns A promise that resolves with the saved File object.
     */
    saveToFile(image: DSImageData, name: string, download?: boolean): Promise<File>;
    drawOnImage(image: Blob | string, drawingItem: Array<Quadrilateral> | Quadrilateral | Array<LineSegment> | LineSegment | Array<Contour> | Contour | Array<Corner> | Corner | Array<Edge> | Edge, type: "quads" | "lines" | "contours" | "corners" | "edges", color?: number, thickness?: number, download?: boolean): Promise<DSImageData>;
}

declare class UtilityModule {
    static getVersion(): string;
}

type resultItemTypesString = "barcode" | "text_line" | "detected_quad" | "normalized_image";
interface CapturedResultFilter {
    onOriginalImageResultReceived?: (result: OriginalImageResultItem) => void;
    onDecodedBarcodesReceived?: (result: any) => void;
    onRecognizedTextLinesReceived?: (result: any) => void;
    onDetectedQuadsReceived?: (result: any) => void;
    onNormalizedImagesReceived?: (result: any) => void;
    onParsedResultsReceived?: (result: any) => void;
}
declare class MultiFrameResultCrossFilter implements CapturedResultFilter {
    #private;
    verificationEnabled: {
        [key: number]: boolean;
    };
    duplicateFilterEnabled: {
        [key: number]: boolean;
    };
    duplicateForgetTime: {
        [key: number]: number;
    };
    private latestOverlappingEnabled;
    private maxOverlappingFrames;
    private overlapSet;
    private stabilityCount;
    private crossVerificationFrames;
    _dynamsoft(): void;
    /**
     * Enables or disables the verification of one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle verification on or off.
     */
    enableResultCrossVerification(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if verification is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns Boolean indicating the status of verification for the specified type.
     */
    isResultCrossVerificationEnabled(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString): boolean;
    /**
     * Enables or disables the deduplication process for one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle deduplication on or off.
     */
    enableResultDeduplication(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if deduplication is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns Boolean indicating the deduplication status for the specified type.
     */
    isResultDeduplicationEnabled(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString): boolean;
    /**
     * Sets the interval during which duplicates are disregarded for specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param time Time in milliseconds during which duplicates are disregarded.
     */
    setDuplicateForgetTime(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, time: number): void;
    /**
     * Retrieves the interval during which duplicates are disregarded for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @returns The set interval for the specified item type.
     */
    getDuplicateForgetTime(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString): number;
    /**
     * Set the max referencing frames count for the to-the-latest overlapping feature.
     *
     * @param resultItemTypes Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param maxOverlappingFrames The max referencing frames count for the to-the-latest overlapping feature.
     */
    setMaxOverlappingFrames(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, maxOverlappingFrames: number): void;
    /**
     * Get the max referencing frames count for the to-the-latest overlapping feature.
     * @param resultItemTypes Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @return Returns the max referencing frames count for the to-the-latest overlapping feature.
     */
    getMaxOverlappingFrames(resultItemType: EnumCapturedResultItemType): number;
    /**
     * Enables or disables the deduplication process for one or multiple specific result item types.
     * @param resultItemTypes Specifies one or multiple specific result item types, which can be defined using EnumCapturedResultItemType or a string. If using a string, only one type can be specified, and valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     * @param enabled Boolean to toggle deduplication on or off.
     */
    enableLatestOverlapping(resultItemTypes: EnumCapturedResultItemType | resultItemTypesString, enabled: boolean): void;
    /**
     * Checks if deduplication is active for a given result item type.
     * @param resultItemType Specifies the result item type, either with EnumCapturedResultItemType or a string. When using a string, the valid values include "barcode", "text_line", "detected_quad", and "normalized_image".
     *
     * @returns Boolean indicating the deduplication status for the specified type.
     */
    isLatestOverlappingEnabled(resultItemType: EnumCapturedResultItemType | resultItemTypesString): boolean;
    getFilteredResultItemTypes(): number;
    onOriginalImageResultReceived(result: OriginalImageResultItem): void;
    latestOverlappingFilter(result: any): void;
    onDecodedBarcodesReceived(result: any): void;
    onRecognizedTextLinesReceived(result: any): void;
    onDetectedQuadsReceived(result: any): void;
    onNormalizedImagesReceived(result: any): void;
}

export { ImageManager, MultiFrameResultCrossFilter, UtilityModule };
