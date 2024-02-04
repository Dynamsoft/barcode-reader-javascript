import { EnumErrorCode } from "../enum/enumerrorcode";
export interface BarcodeReaderException extends Error {
    code?: EnumErrorCode;
}
