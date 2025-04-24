declare class LicenseModule {
    static getVersion(): string;
}

declare class LicenseManager {
    private static setLicenseServer;
    static _pLoad: any;
    static bPassValidation: boolean;
    static bCallInitLicense: boolean;
    private static _license;
    static get license(): string;
    static set license(license: string);
    /**
     * Specify the license server URL.
    */
    private static _licenseServer?;
    static get licenseServer(): string[] | string;
    static set licenseServer(value: string[] | string);
    private static _deviceFriendlyName;
    static get deviceFriendlyName(): string;
    static set deviceFriendlyName(value: string);
    /**
     * License the components.
     * @param license the license key to be used.
     * @remarks - for an online license, LicenseManager asks DLS for the license associated with the 'license' key and gets all usable modules
                - for an offline license, LicenseManager parses it to get a list of usable modules
     * @returns a promise resolving to true or false to indicate whether the license was initialized successfully.
    */
    static initLicense(license: string, options?: {
        executeNow: boolean;
    } | boolean): void | Promise<void>;
    /**
     * The following methods should be called before `initLicense`.
     */
    static setDeviceFriendlyName(name: string): void;
    static getDeviceFriendlyName(): string;
    static getDeviceUUID(): Promise<string>;
}

export { LicenseManager, LicenseModule };
