import { ImageTag, DSRect, DSImageData, Point, Rect, Polygon, LineSegment, Quadrilateral, ImageSourceAdapter, Warning, ImageSourceErrorListener, EnumImagePixelFormat } from 'dynamsoft-core';

declare class CameraEnhancerModule {
    static getVersion(): string;
}

interface VideoFrameTag extends ImageTag {
    isCropped: boolean;
    cropRegion: DSRect;
    originalWidth: number;
    originalHeight: number;
    currentWidth: number;
    currentHeight: number;
    timeSpent: number;
    timeStamp: number;
}

interface DCEFrame extends DSImageData {
    toCanvas: () => HTMLCanvasElement;
    isDCEFrame: boolean;
    tag?: VideoFrameTag;
}

interface DrawingItemEvent extends Event {
    targetItem: DrawingItem;
    itemClientX: number;
    itemClientY: number;
    itemPageX: number;
    itemPageY: number;
}

interface DrawingStyle {
    id?: number;
    lineWidth?: number;
    fillStyle?: string;
    strokeStyle?: string;
    paintMode?: "fill" | "stroke" | "strokeAndFill";
    fontFamily?: string;
    fontSize?: number;
}

interface Note {
    name: string;
    content: any;
}

interface PlayCallbackInfo {
    height: number;
    width: number;
    deviceId: string;
}

interface Resolution {
    width: number;
    height: number;
}

interface TipConfig {
    topLeftPoint: Point;
    width: number;
    duration: number;
    coordinateBase?: "view" | "image";
}

interface VideoDeviceInfo {
    deviceId: string;
    label: string;
    /** @ignore */
    _checked: boolean;
}

declare enum EnumDrawingItemMediaType {
    DIMT_RECTANGLE = 1,
    DIMT_QUADRILATERAL = 2,
    DIMT_TEXT = 4,
    DIMT_ARC = 8,
    DIMT_IMAGE = 16,
    DIMT_POLYGON = 32,
    DIMT_LINE = 64,
    DIMT_GROUP = 128
}

declare enum EnumDrawingItemState {
    DIS_DEFAULT = 1,
    DIS_SELECTED = 2
}

declare enum EnumEnhancedFeatures {
    EF_ENHANCED_FOCUS = 4,
    EF_AUTO_ZOOM = 16,
    EF_TAP_TO_FOCUS = 64
}

declare enum EnumItemType {
    ARC = 0,
    IMAGE = 1,
    LINE = 2,
    POLYGON = 3,
    QUAD = 4,
    RECT = 5,
    TEXT = 6,
    GROUP = 7
}
declare enum EnumItemState {
    DEFAULT = 0,
    SELECTED = 1
}
declare abstract class DrawingItem {
    #private;
    /**
     * TODO: replace with enum
     * @ignore
     */
    static arrMediaTypes: string[];
    /**
     * @ignore
     */
    static mapItemType: Map<EnumItemType, string>;
    /**
     * TOOD: replace with enum
     * @ignore
     */
    static arrStyleSelectors: string[];
    /**
     * @ignore
     */
    static mapItemState: Map<EnumItemState, string>;
    protected _fabricObject: any;
    /**
     * TODO: make it private and replace it with 'mediaType'
     * @ignore
     */
    _mediaType: string;
    /**
     * @ignore
     */
    get mediaType(): EnumDrawingItemMediaType;
    /**
     * TODO: rename it to 'state' and return enum
     */
    get styleSelector(): string;
    /**
     * @ignore
     */
    styleId?: number;
    /**
     * Returns or sets the numeric ID for the `DrawingStyle` that applies to this `DrawingItem`.
     * Invoke `renderAll()` for the new `DrawingStyle` to take effect.
     */
    set drawingStyleId(id: number);
    get drawingStyleId(): number;
    /**
     * Returns or sets the coordinate system base with a string:
     * - "view" for viewport-based coordinates or
     * - "image" for image-based coordinates.
     */
    set coordinateBase(base: "view" | "image");
    get coordinateBase(): "view" | "image";
    /**
     * @ignore
     */
    _zIndex?: number;
    /**
     * @ignore
     */
    _drawingLayer: any;
    /**
     * @ignore
     */
    _drawingLayerId: number;
    /**
     * Returns the numeric ID for the `DrawingLayer` this `DrawingItem` belongs to.
     */
    get drawingLayerId(): number;
    /**
     * record the item's styles
     * TODO: use enum
     * @ignore
     */
    _mapState_StyleId: Map<string, number>;
    protected mapEvent_Callbacks: Map<string, Map<Function, Function>>;
    protected mapNoteName_Content: Map<string, Array<any>>;
    /**
     * @ignore
     */
    readonly isDrawingItem: boolean;
    /**
     *
     * @param fabricObject
     * @param drawingStyleId
     * @ignore
     */
    constructor(fabricObject?: any, drawingStyleId?: number);
    protected _setFabricObject(fabricObject: any): void;
    /**
     *
     * @returns
     * @ignore
     */
    _getFabricObject(): any;
    /**
     *
     * @param state
     * @ignore
     */
    setState(state: EnumDrawingItemState): void;
    /**
     * Returns the current state of the `DrawingItem`.
     *
     * @returns The current state of the `DrawingItem`, of type `EnumDrawingItemState`.
     */
    getState(): EnumDrawingItemState;
    /**
     * @ignore
     */
    _on(eventName: string, listener: (event: DrawingItemEvent) => void): void;
    /**
     * Binds a listener for a specific event.
     * The event name is limited to "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout".
     * @param eventName Specifies the event by its name.
     * @param listener The event listener.
     */
    on(eventName: "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout", listener: (event: DrawingItemEvent) => void): void;
    /**
     * @ignore
     */
    _off(eventName: string, listener: (event: DrawingItemEvent) => void): void;
    /**
     * Unbinds a listener for a specific event.
     * The event name is limited to "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout".
     * @param eventName Specifies the event by its name.
     * @param listener The event listener.
     */
    off(eventName: "mousedown" | "mouseup" | "dblclick" | "mouseover" | "mouseout", listener: (event: DrawingItemEvent) => void): void;
    /**
     * Set if this item can be edited.
     * @param editable
     * @ignore
     */
    _setEditable(editable: boolean): void;
    /**
     * Checks if a `Note` object with the specified name exists.
     * @param name Specifies the name of the `Note` object.
     *
     * @returns Boolean indicating whether the `Note` object exists.
     */
    hasNote(name: string): boolean;
    /**
     * Adds a `Note` object to this `DrawingItem`.
     * @param note Specifies the `Note` object.
     * @param replace [Optional] Whether to replace an existing note if the notes share the same name.
     */
    addNote(note: Note, replace?: boolean): void;
    /**
     * Returns a `Note` object specified by its name, if it exists.
     * @param name Specifies the name of the `Note` object.
     *
     * @returns The corresponding `Note` object specified by its name, if it exists.
     */
    getNote(name: string): Note;
    /**
     * Returns a collection of all existing `Note` objects on this `DrawingItem`.
     *
     * @returns All existing `Note` objects on this `DrawingItem`.
     */
    getNotes(): Array<Note>;
    /**
     * Updates the content of a specified `Note` object.
     * @param name Specifies the name of the `Note` object.
     * @param content Specifies the new content, can be of any type.
     * @param mergeContent [Optional] Whether to merge the new content with the existing one.
     */
    updateNote(name: string, content: any, mergeContent?: boolean): void;
    /**
     * Deletes a `Note` object specified by its name.
     * @param name Specifies the name of the `Note` object.
     */
    deleteNote(name: string): void;
    /**
     * Deletes all `Note` objects on this `DrawingItem`.
     */
    clearNotes(): void;
    protected abstract extendSet(property: string, value: any): boolean;
    protected abstract extendGet(property: string): any;
    /**
     *
     * @param property
     * @returns
     * @ignore
     */
    set(property: string, value: any): void;
    /**
     *
     * @param property
     * @returns
     * @ignore
     */
    get(property: string): any;
    /**
     * Remove this item from drawing layer.
     * @ignore
     */
    remove(): void;
    /**
     * Convert item's property(width, height, x, y, etc.) from related to image/video to related to view/page.
     * @param value
     * @returns
     */
    protected convertPropFromImageToView(value: number): number;
    /**
     * Convert item's property(width, height, x, y, etc.) from related to view/page to related to image/video.
     * @param value
     * @returns
     */
    protected convertPropFromViewToImage(value: number): number;
    protected abstract updateCoordinateBaseFromImageToView(): void;
    protected abstract updateCoordinateBaseFromViewToImage(): void;
    /**
     * @ignore
     */
    _setLineWidth(value: number): void;
    /**
     * @ignore
     */
    _getLineWidth(): number;
    /**
     * @ignore
     */
    _setFontSize(value: number): void;
    /**
     * @ignore
     */
    _getFontSize(): number;
    /**
     * @ignore
     */
    abstract setPosition(position: any): void;
    /**
     * @ignore
     */
    abstract getPosition(): any;
    /**
     * Update item's propertys(width, height, x, y, etc.).
     * It is called when item is added to layer.
     * @ignore
     */
    abstract updatePosition(): void;
}

declare class DT_Rect extends DrawingItem {
    #private;
    constructor(rect: Rect, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): void;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setRect(rect: Rect): void;
    getRect(): Rect;
}

declare class DT_Polygon extends DrawingItem {
    #private;
    constructor(polygon: Polygon, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setPolygon(polygon: Polygon): void;
    getPolygon(): Polygon;
}

declare class DT_Image extends DrawingItem {
    #private;
    private image;
    set maintainAspectRatio(value: boolean);
    get maintainAspectRatio(): boolean;
    constructor(image: DSImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, rect: Rect, maintainAspectRatio: boolean, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setImage(image: DSImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement): void;
    getImage(): DSImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    setImageRect(rect: Rect): void;
    getImageRect(): Rect;
}

declare class DT_Text extends DrawingItem {
    #private;
    private _text;
    constructor(text: string, rect: Rect, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    setText(text: string): void;
    getText(): string;
    setTextRect(rect: Rect): void;
    getTextRect(): Rect;
}

declare class DT_Line extends DT_Polygon {
    #private;
    constructor(line: LineSegment, drawingStyleId?: number);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): any;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    /**
     * @ignore
     */
    setPolygon(): void;
    /**
     * @ignore
     */
    getPolygon(): Polygon;
    setLine(line: LineSegment): void;
    getLine(): LineSegment;
}

declare class DT_Quad extends DT_Polygon {
    #private;
    constructor(quad: Quadrilateral, drawingStyleId?: number);
    setPosition(position: any): void;
    getPosition(): any;
    updatePosition(): void;
    /**
     * @ignore
     */
    setPolygon(): void;
    /**
     * @ignore
     */
    getPolygon(): Polygon;
    setQuad(quad: Quadrilateral): void;
    getQuad(): Quadrilateral;
}

declare class DT_Group extends DrawingItem {
    constructor(childItems: Array<DrawingItem>);
    protected extendSet(property: string, value: any): boolean;
    protected extendGet(property: string): void;
    protected updateCoordinateBaseFromImageToView(): void;
    protected updateCoordinateBaseFromViewToImage(): void;
    setPosition(): void;
    getPosition(): any;
    updatePosition(): void;
    getChildDrawingItems(): Array<DrawingItem>;
    setChildDrawingItems(item: DrawingItem): void;
    removeChildItem(item: DrawingItem): void;
}

declare class DrawingLayer {
    static DDN_LAYER_ID: number;
    static DBR_LAYER_ID: number;
    static DLR_LAYER_ID: number;
    static USER_DEFINED_LAYER_BASE_ID: number;
    /**
     * @ignore
     */
    static TIP_LAYER_ID: number;
    /**
     * returns the 'fabric.Canvas' object
     * @ignore
     */
    fabricCanvas: any;
    private id;
    /**
     * @ignore
     */
    get width(): number;
    /**
     * @ignore
     */
    get height(): number;
    private mapType_StateAndStyleId;
    private mode;
    /**
     * Event triggered whenever there is a change in which `DrawingItem` objects are selected or deselected.
     * @param selectedDrawingItems An array of `DrawingItem` objects that have been selected as a result of the latest selection change.
     * @param deselectedDrawingItems An array of `DrawingItem` objects that have been deselected as a result of the latest selection change.
     * [NOTE]: This event is only functional when the `DrawingLayer` in which it is defined belongs to an `ImageEditorView` instance.
     */
    onSelectionChanged: (selectedDrawingItems: Array<DrawingItem>, deselectedDrawingItems: Array<DrawingItem>) => void;
    private _arrDrwaingItem;
    private _arrFabricObject;
    private _visible;
    /**
     * @ignore
     */
    _manager: any;
    /**
     * @ignore
     */
    set _allowMultiSelect(value: boolean);
    get _allowMultiSelect(): boolean;
    /**
     * @ignore
     */
    constructor(canvas: HTMLCanvasElement, id: number, options?: Object);
    /**
     * Retrieves the unique identifier of the layer.
     */
    getId(): number;
    /**
     * Sets the visibility of the layer.
     * @param visible Whether to show or hide the layer.
     */
    setVisible(visible: boolean): void;
    /**
     * Retrieves the visibility status of the layer.
     *
     * @returns Boolean indicating whether the layer is visible.
     */
    isVisible(): boolean;
    private _getItemCurrentStyle;
    /**
     * Change style of drawingItems of specific media type in specific style selector.
     * DrawingItems that have 'styleId' won't be changed.
     * @param mediaType the mediaType of drawingItems that attend to change
     * @param styleSelector
     * @param drawingStyle
     * @private
     */
    private _changeMediaTypeCurStyleInStyleSelector;
    /**
     * Change the style of specific drawingItem.
     * DrawingItem that has 'styleId' won't be changed.
     * @param drawingItem
     * @param drawingStyle
     * @private
     */
    private _changeItemStyle;
    /**
     *
     * @param targetGroup
     * @param item
     * @param addOrRemove
     * @returns
     * @ignore
     */
    _updateGroupItem(targetGroup: DrawingItem, item: DrawingItem, addOrRemove: string): void;
    private _addDrawingItem;
    /**
     * Add a drawing item to the drawing layer.
     * Drawing items in drawing layer with higher id are always above those in drawing layer with lower id.
     * In a same drawing layer, the later added is above the previous added.
     * @param drawingItem
     * @ignore
     */
    private addDrawingItem;
    /**
     * Adds an array of `DrawingItem` objects to the layer.
     * @param drawingItems An array of `DrawingItem` objects.
     */
    addDrawingItems(drawingItems: Array<DrawingItem>): void;
    /**
     *
     * @param drawingItem
     * @returns
     * @ignore
     */
    private removeDrawingItem;
    /**
     * Removes specified `DrawingItem` objects from the layer.
     * @param drawingItems An array of `DrawingItem` objects.
     */
    removeDrawingItems(drawingItems: Array<DrawingItem>): void;
    /**
     * Sets the layer's `DrawingItem` objects, replacing any existing items.
     * @param drawingItems An array of `DrawingItem` objects.
     */
    setDrawingItems(drawingItems: Array<DrawingItem>): void;
    /**
     * Retrieves `DrawingItem` objects from the layer, optionally filtered by a custom function.
     * @param filter [Optional] A predicate function used to select a subset of `DrawingItem` objects based on specific criteria. Only items for which this function returns `true` are included in the result.
     *
     */
    getDrawingItems(filter?: (item: DrawingItem) => boolean): Array<DrawingItem>;
    /**
     * Returns an array of all selected DrawingItem instances.
     *
     * @returns  An array of `DrawingItem` objects.
     */
    getSelectedDrawingItems(): Array<DrawingItem>;
    /**
     * Checks if a specific `DrawingItem` exists within the layer.
     * @param drawingItem Specifies the `DrawingItem`.
     *
     * @returns Boolean indicating whether the specific `DrawingItem` exists.
     */
    hasDrawingItem(drawingItem: DrawingItem): boolean;
    /**
     * Clears all `DrawingItem` objects from the layer.
     */
    clearDrawingItems(): void;
    private _setDefaultStyle;
    /**
     * Establishes the baseline styling preferences for `DrawingItem` objects on the layer.
     * This method offers flexible styling options tailored to the diverse requirements of `DrawingItem` objects based on their state and type:
     * - Universal Application: By default, without specifying `state` or `mediaType`, the designated style is universally applied to all `DrawingItem` objects on the layer, ensuring a cohesive look and feel.
     * - State-Specific Styling: Specifying only the state parameter allows the method to target `DrawingItem` objects matching that particular state, enabling differentiated styling that reflects their current status or condition.
     * - Refined Targeting with State and MediaType: Providing both `state` and `mediaType` parameters focuses the style application even further, affecting only those `DrawingItem` objects that align with the specified type while in the given state.
     *
     * This precision is particularly useful for creating visually distinct interactions or highlighting specific elements based on their content and interaction state.
     * @param drawingStyleId The unique ID of the `DrawingStyle` to be applied.
     * @param state [Optional] Allows the styling to be conditional based on the `DrawingItem`'s current state.
     * @param mediaType [Optional] Further refines the application of the style based on the the `DrawingItem`'s type.
     */
    setDefaultStyle(drawingStyleId: number, state?: EnumDrawingItemState, mediaType?: EnumDrawingItemMediaType): void;
    /**
     * Change drawing layer mode, "viewer" or "editor".
     * @param newMode
     * @ignore
     */
    setMode(newMode: string): void;
    /**
     *
     * @returns
     * @ignore
     */
    getMode(): string;
    /**
     * Update the dimensions of drawing layer.
     * @param dimensions
     * @param options
     * @ignore
     */
    _setDimensions(dimensions: {
        width: number | string;
        height: number | string;
    }, options?: {
        backstoreOnly?: boolean;
        cssOnly?: boolean;
    }): void;
    /**
     * Update the object-fit of drawing layer.
     * @param value
     * @ignore
     */
    _setObjectFit(value: string): void;
    /**
     *
     * @returns
     * @ignore
     */
    _getObjectFit(): string;
    /**
     * Forces a re-render of all `DrawingItem` objects on the layer.
     * Invoke this method to ensure any modifications made to existing `DrawingItem` objects are visually reflected on the layer.
     */
    renderAll(): void;
    /**
     * @ignore
     */
    dispose(): void;
}

declare class DrawingLayerManager {
    _arrDrawingLayer: DrawingLayer[];
    createDrawingLayer(baseCvs: HTMLCanvasElement, drawingLayerId: number): DrawingLayer;
    deleteDrawingLayer(drawingLayerId: number): void;
    clearDrawingLayers(): void;
    getDrawingLayer(drawingLayerId: number): DrawingLayer;
    getAllDrawingLayers(): Array<DrawingLayer>;
    getSelectedDrawingItems(): Array<DrawingItem>;
    setDimensions(dimensions: {
        width: number | string;
        height: number | string;
    }, options?: {
        backstoreOnly?: boolean;
        cssOnly?: boolean;
    }): void;
    setObjectFit(value: string): void;
    getObjectFit(): string;
    setVisible(visible: boolean): void;
    _getFabricCanvas(): any;
    _switchPointerEvent(): void;
}

declare class InnerComponent extends HTMLElement {
    #private;
    constructor();
    getWrapper(): HTMLDivElement;
    setElement(slot: "content" | "single-frame-input-container" | "drawing-layer", el: HTMLElement): void;
    getElement(slot: "content" | "single-frame-input-container" | "drawing-layer"): HTMLElement;
    removeElement(slot: "content" | "single-frame-input-container" | "drawing-layer"): void;
}

declare class DT_Tip extends DT_Text {
    #private;
    constructor(text: string, x: number, y: number, width: number, styleId?: number);
    /**
     * Make the tip hidden after a period of time.
     * @param duration if less then 0, it clears the timer.
     */
    setDuration(duration: number): void;
    getDuration(): number;
}
declare abstract class View {
    #private;
    /**
     * @ignore
     */
    _innerComponent: InnerComponent;
    /** @ignore */
    _drawingLayerManager: DrawingLayerManager;
    /** @ignore */
    _layerBaseCvs: HTMLCanvasElement;
    /** @ignore */
    _drawingLayerOfTip: DrawingLayer;
    private _tipStyleId;
    /** @ignore */
    _tip: DT_Tip;
    constructor();
    /**
     * get the dimensions of content which the view shows. In 'CameraView', the 'content' usually means the video; in 'ImageEditorView', the 'content' usually means the image.
     */
    protected abstract getContentDimensions(): {
        width: number;
        height: number;
        objectFit: string;
    };
    /**
     * Create a native 'canvas' element, which will be passed to 'fabric' to create a 'fabric.Canvas'.
     * In fact, all drawing layers are in one canvas.
     * @ignore
     */
    protected createDrawingLayerBaseCvs(width: number, height: number, objectFit?: string): HTMLCanvasElement;
    /**
     * Create drawing layer with specified id and size.
     * Differ from 'createDrawingLayer()', the drawing layers created'createDrawingLayer()' can not Specified id, and their size is the same as video.
     * @ignore
     */
    _createDrawingLayer(drawingLayerId: number, width?: number, height?: number, objectFit?: string): DrawingLayer;
    /**
     * Creates a new `DrawingLayer` object and returns it.
     *
     * @returns The created `DrawingLayer` object.
     */
    createDrawingLayer(): DrawingLayer;
    /**
     * Differ from 'deleteUserDefinedDrawingLayer()', 'deleteDrawingLayer()' can delete any layer, while 'deleteUserDefinedDrawingLayer()' can only delete user defined layer.
     */
    protected deleteDrawingLayer(drawingLayerId: number): void;
    /**
     * Deletes a user-defined `DrawingLayer` object specified by its unique identifier (ID).
     * @param id The unique identifier (ID) of the `DrawingLayer` object.
     */
    deleteUserDefinedDrawingLayer(id: number): void;
    /**
     * Not used yet.
     * @ignore
     */
    _clearDrawingLayers(): void;
    /**
     * Clears all user-defined `DrawingLayer` objects, resetting the drawing space without affecting default built-in `DrawingLayer` objects.
     */
    clearUserDefinedDrawingLayers(): void;
    /**
     * Retrieves a `DrawingLayer` object by its unique identifier (ID).
     * @param id The unique identifier (ID) of the `DrawingLayer` object.
     *
     * @returns The `DrawingLayer` object specified by its unique identifier (ID) or `null`.
     */
    getDrawingLayer(drawingLayerId: number): DrawingLayer;
    /**
     * Returns an array of all `DrawingLayer` objects .
     *
     * @returns An array of all `DrawingLayer` objects.
     */
    getAllDrawingLayers(): Array<DrawingLayer>;
    /**
     * update drawing layers according to content(video/image) dimensions.
     */
    protected updateDrawingLayers(contentDimensions: {
        width: number;
        height: number;
        objectFit: string;
    }): void;
    /**
     * Returns an array of all selected DrawingItem instances across different layers, supporting complex selection scenarios.
     *
     * @returns An array of `DrawingItem` objects.
     */
    getSelectedDrawingItems(): Array<DrawingItem>;
    /**
     * Applies configuration settings to the tip message box.
     * This includes its position, size, display duration, and the coordinate system basis.
     * @param tipConfig Configuration object for the tip message box, including top-left position, width, display duration, and coordinate system basis.
     */
    setTipConfig(tipConfig: TipConfig): void;
    /**
     * Retrieves the current configuration of the tip message box, reflecting its position, size, display duration, and the coordinate system basis.
     *
     * @returns The current configuration settings of the tip message box.
     */
    getTipConfig(): TipConfig;
    /**
     * Controls the visibility of the tip message box on the screen.
     * This can be used to show or hide the tip based on user interaction or other criteria.
     * @param visible Boolean flag indicating whether the tip message box should be visible (`true`) or hidden (`false`).
     */
    setTipVisible(visible: boolean): void;
    /**
     * Checks whether the tip message box is currently visible to the user.
     *
     * @returns Boolean indicating the visibility of the tip message box (`true` for visible, `false` for hidden).
     */
    isTipVisible(): boolean;
    /**
     * Updates the message displayed in the tip message box.
     * This can be used to provide dynamic feedback or information to the user.
     * @param message The new message to be displayed in the tip message box.
     */
    updateTipMessage(message: string): void;
}

declare class EventHandler {
    #private;
    get disposed(): boolean;
    on(event: string, listener: Function): void;
    off(event: string, listener: Function): void;
    offAll(event: string): void;
    fire(event: string, params?: Array<any>, options?: {
        target?: object;
        async?: boolean;
        copy?: boolean;
    }): void;
    dispose(): void;
}

declare class CameraEnhancer extends ImageSourceAdapter {
    #private;
    /** @ignore */
    static _debug: boolean;
    static set _onLog(value: (message: any) => void);
    static get _onLog(): (message: any) => void;
    /**
     * @ignore
     */
    static browserInfo: {
        browser: string;
        version: number;
        OS: string;
    };
    /**
     * Event triggered when the running environment is not ideal.
     * @param warning The warning message.
     */
    static onWarning: (warning: Warning) => void;
    /**
     * Detect environment and get a report.
     * ```js
     * console.log(Dynamsoft.DCE.CameraEnhancer.detectEnvironment());
     * // {"wasm":true, "worker":true, "getUserMedia":true, "camera":true, "browser":"Chrome", "version":90, "OS":"Windows"}
     * ```
     */
    static detectEnvironment(): Promise<any>;
    /**
     * Tests whether the application has access to the camera.
     * This static method can be used before initializing a `CameraEnhancer` instance to ensure that the device's camera can be accessed, providing a way to handle permissions or other access issues preemptively.
     * This method offers the additional advantage of accelerating the camera opening process for the first time.
     *
     * @returns A promise that resolves with an object containing:
     * - `ok`: Boolean indicating whether camera access is available.
     * - `message`: A string providing additional information or the reason why camera access is not available, if applicable.
     */
    static testCameraAccess(): Promise<{
        ok: boolean;
        message: string;
    }>;
    /**
     * Initializes a new instance of the `CameraEnhancer` class.
     * @param view [Optional] Specifies a `CameraView` instance to provide the user interface element to display the live feed from the camera.
     *
     * @returns A promise that resolves with the initialized `CameraEnhancer` instance.
     */
    static createInstance(view?: CameraView): Promise<CameraEnhancer>;
    private cameraManager;
    private cameraView;
    /**
     * @ignore
     */
    private _imageDataGetter;
    /**
     * @ignore
     */
    get video(): HTMLVideoElement;
    /**
     * Sets or returns the source URL for the video stream to be used by the `CameraEnhancer`.
     * 1. You can use this property to specify an existing video as the source to play which will be processed the same way as the video feed from a live camera.
     * 2. When playing an existing video, the camera selection and video selection boxes will be hidden.
     *
     * It is particularly useful for applications that need to process or display video from a specific source rather than the device's default camera.
     */
    set videoSrc(src: string);
    get videoSrc(): string;
    /**
     * Determines whether the last used camera settings should be saved and reused the next time the `CameraEnhancer` is initialized.
     *
     * The default is `false`.
     *
     * When set to `true`, the enhancer attempts to restore the previously used camera settings, offering a more seamless user experience across sessions.
     *
     * - This feature makes use of the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) of the browser.
     * - This feature only works on mainstream browsers like Chrome, Firefox, and Safari. Other browsers may change the device IDs dynamically thus making it impossible to track the camera.
     */
    set ifSaveLastUsedCamera(value: boolean);
    get ifSaveLastUsedCamera(): boolean;
    /**
     * Determines whether to skip the initial camera inspection process.
     *
     * The default is `false`, which means to opt for an optimal rear camera at the first `open()`.
     *
     * Setting this property to `true` bypasses the automatic inspection and configuration that typically occurs when a camera connection is established.
     * This can be useful for scenarios where the default inspection process may not be desirable or necessary.
     *
     * Note that if a previously used camera is already available in the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), the inspection is skipped automatically. Read more on `ifSaveLastUsedCamera`.
     */
    set ifSkipCameraInspection(value: boolean);
    get ifSkipCameraInspection(): boolean;
    /**
     * Specifies the timeout in milliseconds for opening the camera. The default value is 15000 ms.
     *
     * Setting 0 means canceling the timeout or waiting indefinitely.
     *
     * This property sets a limit on how long the `CameraEnhancer` will attempt to open the camera before timing out.
     * It can be adjusted to accommodate different devices and scenarios, ensuring that the application does not hang indefinitely while trying to access the camera.
     */
    set cameraOpenTimeout(value: number);
    get cameraOpenTimeout(): number;
    isTorchOn: undefined | boolean;
    set singleFrameMode(value: "disabled" | "camera" | "image");
    get singleFrameMode(): "disabled" | "camera" | "image";
    /**
     * Event handler in camera selection in default UI.
     * @ignore
     */
    private _onCameraSelChange;
    /**
     * Event handler in resolution selection in default UI.
     * @ignore
     */
    private _onResolutionSelChange;
    /**
     * Event handler in close button in default UI.
     *
     * Now the close button is removed, so it is useless.
     * @ignore
     */
    private _onCloseBtnClick;
    /**
     * Event handler for single frame mode.
     * @ignore
     */
    private _onSingleFrameAcquired;
    _intermediateResultReceiver: any;
    /**
     * @ignore
     */
    get _isFetchingStarted(): boolean;
    /**
     * Set the size limit of the gotten images.
     *
     * By default, there is no limit.
     * @ignore
     */
    canvasSizeLimit: number;
    /**
     * It is used in `DCEFrame.tag.imageId`.
     * @ignore
     */
    _imageId: number;
    private fetchInterval;
    /**
     * Returns whether the `CameraEnhancer` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CameraEnhancer` instance has been disposed of.
     */
    get disposed(): boolean;
    readonly isCameraEnhancer = true;
    private constructor();
    /**
     * Sets the `CameraView` instance to be used with the `CameraEnhancer`.
     * This method allows for specifying a custom camera view, which can be used to display the camera feed and interface elements.
     *
     * @param view A `CameraView` instance that will be used to display the camera's video feed and any associated UI components.
     */
    setCameraView(view: CameraView): void;
    /**
     * Retrieves the current `CameraView` instance associated with the `CameraEnhancer`.
     * This method allows for accessing the camera view, which can be useful for manipulating the view or accessing its properties and methods.
     *
     * @returns The current `CameraView` instance used by the `CameraEnhancer`.
     */
    getCameraView(): CameraView;
    /**
     *
     * @returns
     * @ignore
     */
    private releaseCameraView;
    /**
     * Add some event listeners to UI element in camera view.
     * @returns
     * @ignore
     */
    private addListenerToView;
    /**
     * Remove event listeners from UI element in camera view.
     * @returns
     */
    private removeListenerFromView;
    /**
     * Retrieves the current state of the camera.
     *
     * @returns A string indicating the camera's current state, which can be "opening", "open", or "closed".
     */
    getCameraState(): string;
    /**
     * Checks if the camera is currently open and streaming video.
     *
     * @returns Boolean indicating whether the camera is open (`true`) or not (`false`).
     */
    isOpen(): boolean;
    /**
     * Retrieves the HTMLVideoElement used by the `CameraEnhancer` for displaying the camera feed.
     * This method provides direct access to the video element, enabling further customization or interaction with the video stream.
     *
     * @returns The `HTMLVideoElement` that is being used to display the camera's video feed.
     */
    getVideoEl(): HTMLVideoElement;
    /**
     * Opens the currently selected camera and starts the video stream.
     *
     * @returns A promise that resolves with a `PlayCallbackInfo` object with details about the operation's outcome.
     */
    open(): Promise<PlayCallbackInfo>;
    /**
     * Closes the currently active camera and stops the video stream.
     */
    close(): void;
    /**
     * Pauses the video stream without closing the camera.
     * This can be useful for temporarily halting video processing while keeping the camera ready.
     */
    pause(): void;
    /**
     * Checks if the video stream is currently paused.
     *
     * @returns Boolean indicating whether the video stream is paused (`true`) or active (`false`).
     */
    isPaused(): boolean;
    /**
     * Resumes the video stream from a paused state.
     *
     * @returns A promise that resolves when the video stream resumes. It does not provide any value upon resolution.
     */
    resume(): Promise<void>;
    /**
     * Selects a specific camera for use by the `CameraEnhancer`. The camera can be specified by a `VideoDeviceInfo` object or by its device ID.
     * If called before `open()` or `show()`, the selected camera will be used. Otherwise, the system will decide which one to use.
     * @param cameraObjectOrDeviceID The `VideoDeviceInfo` object or device ID string of the camera to select.
     *
     * @returns A promise that resolves with a `PlayCallbackInfo` object indicating the outcome of the camera selection operation.
     */
    selectCamera(videoDeviceInfoOrDeviceId: VideoDeviceInfo | string): Promise<PlayCallbackInfo>;
    /**
     * Returns the currently selected camera device.
     *
     * @returns The `VideoDeviceInfo` object representing the currently active camera.
     */
    getSelectedCamera(): VideoDeviceInfo;
    /**
     * Retrieves a list of all available video input devices (cameras) on the current device.
     *
     * @returns A promise that resolves with an array of `VideoDeviceInfo` objects representing each available camera.
     */
    getAllCameras(): Promise<Array<VideoDeviceInfo>>;
    /**
     * Sets the resolution of the video stream to a specified value.
     * If the specified resolution is not exactly supported, the closest resolution will be applied.
     * If called before `open()` or `show()`, the camera will use the set resolution when it opens. Otherwise, the default resolution used is 1920x1080 on desktop and 1280x720 on mobile devices.
     * @param resolution The `Resolution` to which the video stream should be set.
     *
     * @returns A promise that resolves with a `PlayCallbackInfo` object with details about the operation's outcome.
     */
    setResolution(resolution: Resolution): Promise<PlayCallbackInfo>;
    /**
     * Gets the current resolution of the video stream.
     *
     * @returns The current `Resolution` of the video stream.
     */
    getResolution(): Resolution;
    /**
     * Retrieves a list of available resolutions supported by the currently selected camera.
     *
     * - The returned resolutions are limited to these values "160 by 120", "320 by 240", "480 by 360", "640 by 480", "800 by 600", "960 by 720", "1280 by 720", "1920 by 1080", "2560 by 1440", "3840 by 2160".
     * - The SDK tests all these resolutions to find out which ones are supported. As a result, the method may be time-consuming.
     *
     * @returns A promise that resolves with an array of `Resolution` objects representing each supported resolution.
     */
    getAvailableResolutions(): Promise<Array<Resolution>>;
    /**
     * 'on()' is the wrapper of '_on()'.
     * @param event includes
     * @param listener
     * @ignore
     */
    private _on;
    /**
     * 'off()' is the wrapper of '_off()'.
     * @param event
     * @param listener
     * @ignore
     */
    private _off;
    /**
     * Registers an event listener for specific camera-related events.
     * This method allows you to respond to various changes and states in the camera lifecycle.
     * @param eventName The name of the event to listen for. Possible values include "cameraOpen", "cameraClose", "cameraChange", "resolutionChange", "played", "singleFrameAcquired", and "frameAddedToBuffer".
     * @param listener The callback function to be invoked when the event occurs.
     */
    on(eventName: "cameraOpen" | "cameraClose" | "cameraChange" | "resolutionChange" | "played" | "singleFrameAcquired" | "frameAddedToBuffer", listener: Function): void;
    /**
     * Removes an event listener previously registered with the `on` method.
     * @param eventName The name of the event for which to remove the listener.
     * @param listener The callback function that was originally registered for the event.
     */
    off(eventName: "cameraOpen" | "cameraClose" | "cameraChange" | "resolutionChange" | "played" | "singleFrameAcquired" | "frameAddedToBuffer", listener: Function): void;
    /**
     * Retrieves the current video settings applied to the camera stream.
     *
     * @returns The current `MediaStreamConstraints` object representing the video stream's settings.
     */
    getVideoSettings(): MediaStreamConstraints;
    /**
     * Updates the video settings for the camera stream with new constraints.
     * @param constraints The new `MediaStreamConstraints` to apply to the video stream.
     *
     * @returns A promise that resolves when the new `MediaStreamConstraints` is applied. It does not provide any value upon resolution.
     */
    updateVideoSettings(mediaStreamConstraints: MediaStreamConstraints): Promise<void>;
    /**
     * Gets the capabilities of the current camera.
     *
     * At present, this method only works in Edge, Safari, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * @returns A `MediaTrackCapabilities` object representing the capabilities of the camera's video track.
     */
    getCapabilities(): MediaTrackCapabilities;
    /**
     * Retrieves the current settings of the camera.
     *
     * @returns The `MediaTrackSettings` object representing the current settings of the camera's video track.
     */
    getCameraSettings(): MediaTrackSettings;
    /**
     * Turns on the camera's torch (flashlight) mode, if supported.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @returns A promise that resolves when the torch has been successfully turned on. It does not provide any value upon resolution.
     */
    turnOnTorch(): Promise<void>;
    /**
     * Turns off the camera's torch (flashlight) mode.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     *
     * @returns A promise that resolves when the torch has been successfully turned off. It does not provide any value upon resolution.
     */
    turnOffTorch(): Promise<void>;
    _taskid4AutoTorch: any;
    _delay4AutoTorch: number;
    grayThreshold4AutoTorch: number;
    maxDarkCount4AutoTroch: number;
    turnAutoTorch(delay?: number): Promise<void>;
    /**
     * Sets the color temperature of the camera's video feed.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @param colorTemperature The desired color temperature in Kelvin.
     *
     * @returns A promise that resolves when the color temperature has been successfully set. It does not provide any value upon resolution.
     */
    setColorTemperature(value: number): Promise<void>;
    /**
     * Retrieves the current color temperature setting of the camera's video feed.
     *
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     *
     * @returns The current color temperature in Kelvin.
     */
    getColorTemperature(): number;
    /**
     * Sets the exposure compensation of the camera's video feed.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @param exposureCompensation The desired exposure compensation value.
     *
     * @returns A promise that resolves when the exposure compensation has been successfully set. It does not provide any value upon resolution.
     */
    setExposureCompensation(value: number): Promise<void>;
    /**
     * Retrieves the current exposure compensation setting of the camera's video feed.
     * This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     *
     * @returns The current exposure compensation value.
     */
    getExposureCompensation(): number;
    /**
     * 'setZoom()' is the wrapper of '_setZoom()'. '_setZoom()' can set the zoom center, which is not tested and there are no plans to make it open to clients.
     * @ignore
     */
    private _setZoom;
    /**
     * Sets the zoom level of the camera.
     *
     * - How it works:
     * 1. If the camera supports zooming and the zoom factor is within its supported range, zooming is done directly by the camera.
     * 2. If the camera does not support zooming, software-based magnification is used instead.
     * 3. If the camera supports zooming but the zoom factor is beyond what it supports, the camera's maximum zoom is used, and software-based magnification is used to do the rest. (In this case, you may see a brief video flicker between the two zooming processes).
     * @param settings An object containing the zoom settings.
     * @param settings.factor: A number specifying the zoom level. At present, it is the only available setting.
     *
     * @returns A promise that resolves when the zoom level has been successfully set. It does not provide any value upon resolution.
     */
    setZoom(settings: {
        factor: number;
    }): Promise<void>;
    /**
     * Retrieves the current zoom settings of the camera.
     *
     * @returns An object containing the current zoom settings. As present, it contains only the zoom factor.
     */
    getZoomSettings(): {
        factor: number;
    };
    /**
     * Resets the zoom level of the camera to its default value.
     *
     * @returns A promise that resolves when the zoom level has been successfully reset. It does not provide any value upon resolution.
     */
    resetZoom(): Promise<void>;
    /**
     * Sets the frame rate of the camera's video stream.
     * - At present, this method only works in Edge, Safari, Chrome and other Chromium-based browsers (Firefox is not supported). Also, it should be called when a camera is open.
     * - If you provide a value that exceeds the camera's capabilities, we will automatically adjust it to the maximum value that can be applied.
     *
     * @param rate The desired frame rate in frames per second (fps).
     *
     * @returns A promise that resolves when the frame rate has been successfully set. It does not provide any value upon resolution.
     */
    setFrameRate(value: number): Promise<void>;
    /**
     * Retrieves the current frame rate of the camera's video stream.
     *
     * @returns The current frame rate in frames per second (fps).
     */
    getFrameRate(): number;
    /**
     * Sets the focus mode of the camera. This method allows for both manual and continuous focus configurations, as well as specifying a focus area.
     * - This method should be called when the camera is turned on. Note that it only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * - Typically, `continuous` mode works best. `manual` mode based on a specific area helps the camera focus on that particular area which may seem blurry under `continuous` mode. `manual` mode with specified distances is for those rare cases where the camera distance must be fine-tuned to get the best results.
     * @param settings An object describing the focus settings. The structure of this object varies depending on the mode specified (`continuous`, `manual` with fixed `distance`, or `manual` with specific `area`).
     *
     * @returns A promise that resolves when the focus settings have been successfully applied. It does not provide any value upon resolution.
     */
    setFocus(settings: {
        mode: string;
    } | {
        mode: "manual";
        distance: number;
    } | {
        mode: "manual";
        area: {
            centerPoint: {
                x: string;
                y: string;
            };
            width?: string;
            height?: string;
        };
    }): Promise<void>;
    /**
     * Retrieves the current focus settings of the camera.
     *
     * @returns An object representing the current focus settings or null.
     */
    getFocusSettings(): Object;
    /**
     * Sets the auto zoom range for the camera.
     * `EF_AUTO_ZOOM` is one of the enhanced features that require a license, and is only effective when used in conjunction with other functional products of Dynamsoft.
     * This method allows for specifying the minimum and maximum zoom levels that the camera can automatically adjust to.
     *
     * @param range An object specifying the minimum and maximum zoom levels. Both `min` and `max` should be positive numbers, with `min` less than or equal to `max`. The default is `{min: 1, max: 999}`.
     */
    setAutoZoomRange(range: {
        min: number;
        max: number;
    }): void;
    /**
     * Retrieves the current auto zoom range settings for the camera.
     * `EF_AUTO_ZOOM` is one of the enhanced features that require a license, and is only effective when used in conjunction with other functional products of Dynamsoft.
     *
     * @returns An object representing the current auto zoom range, including the minimum and maximum zoom levels.
     */
    getAutoZoomRange(): {
        min: number;
        max: number;
    };
    /**
     * Enables one or more enhanced features.
     * This method allows for activating specific advanced capabilities that may be available.
     *
     * - The enhanced features require a license, and only take effect when used in conjunction with other functional products under the Dynamsoft Capture Vision（DCV）architecture.
     * - `EF_ENHANCED_FOCUS` and `EF_TAP_TO_FOCUS` only works with Chromium-based browsers such as Edge and Chrome on Windows or Android. Other browsers such as Firefox or Safari are not supported. Note that all browsers on iOS (including Chrome) use WebKit as the rendering engine and are not supported.
     * @param enhancedFeatures An enum value or a bitwise combination of `EnumEnhancedFeatures` indicating the features to be enabled.
     *
     * @returns A promise that resolves when the specified enhanced features have been successfully enabled. It does not provide any value upon resolution.
     */
    enableEnhancedFeatures(enhancedFeatures: EnumEnhancedFeatures): Promise<void>;
    /**
     * Disables one or more previously enabled enhanced features.
     * This method can be used to deactivate specific features that are no longer needed or to revert to default behavior.
     *
     * @param enhancedFeatures An enum value or a bitwise combination of `EnumEnhancedFeatures` indicating the features to be disabled.
     */
    disableEnhancedFeatures(enhancedFeatures: EnumEnhancedFeatures): void;
    /**
     * Differ from 'setScanRegion()', 'setScanRegion()' will update the UI in camera view, while '_setScanRegion()' not.
     * @param region
     * @ignore
     */
    private _setScanRegion;
    /**
     * Sets the scan region within the camera's view which limits the frame acquisition to a specific area of the video feed.
     *
     * Note: The region is always specified relative to the original video size, regardless of any transformations or zoom applied to the video display.
     *
     * @param region Specifies the scan region.
     */
    setScanRegion(region: DSRect | Rect): void;
    /**
     * Retrieves the current scan region set within the camera's view.
     *
     * Note: If no scan region has been explicitly set before calling this method, an error may be thrown, indicating the necessity to define a scan region beforehand.
     *
     * @returns A `DSRect` or `Rect` object representing the current scan region.
     *
     * @throws Error indicating that no scan region has been set, if applicable.
     */
    getScanRegion(): DSRect | Rect;
    /**
     * Sets an error listener to receive notifications about errors that occur during image source operations.
     *
     * @param listener An instance of `ImageSourceErrorListener` or its derived class to handle error notifications.
     */
    setErrorListener(listener: ImageSourceErrorListener): void;
    /**
     * Determines whether there are more images available to fetch.
     *
     * @returns Boolean indicating whether more images can be fetched. `false` means the image source is closed or exhausted.
     */
    hasNextImageToFetch(): boolean;
    /**
     * Starts the process of fetching images.
     */
    startFetching(): void;
    /**
     * Stops the process of fetching images.
     * to false, indicating that image fetching has been halted.
     */
    stopFetching(): void;
    /**
     * Fetches the current frame from the camera's video feed.
     * This method is used to obtain the latest image captured by the camera.
     *
     * @returns A `DCEFrame` object representing the current frame.
     * The structure and content of this object will depend on the pixel format set by `setPixelFormat()` and other settings.
     */
    fetchImage(): DCEFrame;
    /**
     * Sets the interval at which images are continuously fetched from the camera's video feed.
     * This method allows for controlling how frequently new frames are obtained when `startFetching()` is invoked,
     * which can be useful for reducing computational load or for pacing the frame processing rate.
     *
     * @param interval The desired interval between fetches, specified in milliseconds.
     */
    setImageFetchInterval(interval: number): void;
    /**
     * Retrieves the current interval at which images are continuously fetched from the camera's video feed.
     *
     * @returns The current fetch interval, specified in milliseconds.
     */
    getImageFetchInterval(): number;
    /**
     * Sets the pixel format for the images fetched from the camera, which determines the format of the images added to the buffer when the `fetchImage()` or `startFetching()` method is called.
     * It can affect both the performance of image processing tasks and the compatibility with certain analysis algorithms.
     *
     * @param pixelFormat The desired pixel format for the images. Supported formats include `IPF_GRAYSCALED`, `IPF_ABGR_8888`, and `IPF_ARGB_8888`.
     */
    setPixelFormat(format: EnumImagePixelFormat.IPF_GRAYSCALED | EnumImagePixelFormat.IPF_ABGR_8888): void;
    /**
     * Retrieves the current pixel format used for images fetched from the camera.
     *
     * @returns The current pixel format, which could be one of the following: `IPF_GRAYSCALED`, `IPF_ABGR_8888`, and `IPF_ARGB_8888`.
     */
    getPixelFormat(): EnumImagePixelFormat;
    /**
     * Initiates a sequence to capture a single frame from the camera, only valid when the camera was open. halting the video stream temporarily.
     * This method prompts the user to either select a local image or capture a new one using the system camera, similar to the behavior in `singleFrameMode` but without changing the mode.
     *
     * Note: This method is intended for use cases where capturing a single, user-obtained image is necessary while the application is otherwise utilizing a live video stream.
     *
     * Steps performed by `takePhoto`:
     * 1. Stops the video stream and releases the camera, if it was in use.
     * 2. Prompts the user to take a new image with the system camera (on desktop, it prompts the user to select an image from the disk). This behavior mirrors that of `singleFrameMode[=="camera"]`
     * 3. Returns the obtained image in a callback function, this differs from `singleFrameMode` which would display the image in the view.
     * NOTE: user should resume the video stream after the image has been obtained to keep the video stream going.
     * @param listener A callback function that is invoked with a `DCEFrame` object containing the obtained image.
     */
    takePhoto(listener: (dceFrame: DCEFrame) => void): void;
    /**
     * Converts coordinates from the video's coordinate system to coordinates relative to the whole page.
     * This is useful for overlaying HTML elements on top of specific points in the video, aligning with the page's layout.
     *
     * @param point A `Point` object representing the x and y coordinates within the video's coordinate system.
     *
     * @returns A `Point` object representing the converted x and y coordinates relative to the page.
     */
    convertToPageCoordinates(point: Point): Point;
    /**
     * Converts coordinates from the video's coordinate system to coordinates relative to the viewport.
     * This is useful for positioning HTML elements in relation to the video element on the screen, regardless of page scrolling.
     *
     * @param point A `Point` object representing the x and y coordinates within the video's coordinate system.
     *
     * @returns A `Point` object representing the converted x and y coordinates relative to the viewport.
     */
    convertToClientCoordinates(point: Point): Point;
    /**
     * Converts coordinates from the video's coordinate system to coordinates relative to the viewport.
     * This is useful for positioning HTML elements in relation to the video element on the screen, regardless of page scrolling.
     *
     * @param point A `Point` object representing the x and y coordinates within the video's coordinate system.
     *
     * @returns A `Point` object representing the converted x and y coordinates relative to the viewport.
     */
    convertToScanRegionCoordinates(point: Point): Point;
    /**
     * Releases all resources used by the `CameraEnhancer` instance.
     */
    dispose(): void;
}

declare class CameraView extends View {
    #private;
    /**
     * @ignore
     */
    static _onLog: (message: any) => void;
    private static get engineResourcePath();
    private static _defaultUIElementURL;
    /**
     * Specifies the URL to a default UI definition file.
     * This URL is used as a fallback source for the UI of the `CameraView` class when the `createInstance()` method is invoked without specifying a `HTMLDivElement`.
     * This ensures that `CameraView` has a user interface even when no custom UI is provided.
     */
    static set defaultUIElementURL(value: string);
    static get defaultUIElementURL(): string;
    /**
     * Initializes a new instance of the `CameraView` class.
     * This method allows for optional customization of the user interface (UI) through a specified HTML element or an HTML file.
     */
    static createInstance(elementOrUrl?: HTMLElement | string): Promise<CameraView>;
    /**
     * Transform the coordinates from related to scan region to related to the whole video/image.
     * @param coord The coordinates related to scan region.
     * @param sx The x coordinate of scan region related to the whole video/image.
     * @param sy The y coordinate of scan region related to the whole video/image.
     * @param sWidth The width of scan region.
     * @param sHeight The height of scan region.
     * @param dWidth The width of cropped image. Its value is different from `sWidth` when the image is compressed.
     * @param dHeight The height of cropped image. Its value is different from `sHeight` when the image is compressed.
     * @ignore
     */
    static _transformCoordinates(coord: {
        x: number;
        y: number;
    }, sx: number, sy: number, sWidth: number, sHeight: number, dWidth: number, dHeight: number): void;
    cameraEnhancer: CameraEnhancer;
    /**
     * @ignore
     */
    eventHandler: EventHandler;
    private UIElement;
    /**
     * @ignore
     */
    containerClassName: string;
    _videoContainer: HTMLDivElement;
    private videoFit;
    /** @ignore */
    _hideDefaultSelection: boolean;
    /** @ignore */
    _divScanArea: any;
    /** @ignore */
    _divScanLight: any;
    /** @ignore */
    _bgLoading: any;
    /** @ignore */
    _selCam: any;
    /** @ignore */
    _bgCamera: any;
    /** @ignore */
    _selRsl: any;
    /** @ignore */
    _optGotRsl: any;
    /** @ignore */
    _btnClose: any;
    /** @ignore */
    _selMinLtr: any;
    /** @ignore */
    _optGotMinLtr: any;
    /** @ignore */
    _cvsSingleFrameMode: HTMLCanvasElement;
    private scanRegion;
    private _drawingLayerOfMask;
    private _maskBackRectStyleId;
    private _maskCenterRectStyleId;
    private regionMaskFillStyle;
    private regionMaskStrokeStyle;
    private regionMaskLineWidth;
    /**
     * @ignore
     */
    _userSetMaskVisible: boolean;
    /**
     * @ignore
     */
    _userSetLaserVisible: boolean;
    private _updateLayersTimeoutId;
    private _updateLayersTimeout;
    /**
     * Trigger when the css dimensions of the container of video element changed, or window changed.
     */
    private _videoResizeListener;
    private _windowResizeListener;
    private _resizeObserver;
    /**
     * @ignore
     */
    set _singleFrameMode(value: "disabled" | "camera" | "image");
    get _singleFrameMode(): "disabled" | "camera" | "image";
    _onSingleFrameAcquired: (canvas: HTMLCanvasElement) => void;
    private _singleFrameInputContainer;
    _clickIptSingleFrameMode: () => void;
    _capturedResultReceiver: any;
    /**
     * Returns whether the `CameraView` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `CameraView` instance has been disposed of.
     */
    get disposed(): boolean;
    private constructor();
    /**
     * Differ from 'setUIElement()', 'setUIElement()' allow parameter of 'string' type, which means a url, '_setUIElement()' only accept parameter of 'HTMLElement' type.
     * @param element
     */
    private _setUIElement;
    setUIElement(elementOrUrl: HTMLElement | string): Promise<void>;
    getUIElement(): HTMLElement;
    private _bindUI;
    private _unbindUI;
    /**
     * Show loading animation.
     * @ignore
     */
    _startLoading(): void;
    /**
     * Hide loading animation.
     * @ignore
     */
    _stopLoading(): void;
    /**
     * Render cameras info in camera selection in default UI.
     * @ignore
     */
    _renderCamerasInfo(curCamera: {
        deviceId: string;
        label: string;
    }, cameraList: Array<{
        deviceId: string;
        label: string;
    }>): void;
    /**
     * Render resolution list in resolution selection in default UI.
     * @ignore
     */
    _renderResolutionInfo(curResolution: {
        width: number;
        height: number;
    }): void;
    /**
     * Retrieves the `HTMLVideoElement` that is currently being used for displaying the video in this `CameraView` instance.
     * This method allows access to the underlying video element, enabling direct interaction or further customization.
     *
     * @returns The `HTMLVideoElement` currently used by this `CameraView` instance for video display.
     */
    getVideoElement(): HTMLVideoElement;
    /**
     * tell if video is loaded.
     * @ignore
     */
    isVideoLoaded(): boolean;
    /**
     * Sets the `object-fit` CSS property of the `HTMLVideoElement` used by this `CameraView` instance.
     * The `object-fit` property specifies how the video content should be resized to fit the container in a way that maintains its aspect ratio.
     * @param objectFit The value for the `object-fit` property. At present, only "cover" and "contain" are allowed and the default is "contain".
     * Check out more on [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    setVideoFit(value: "contain" | "cover"): void;
    /**
     * Retrieves the current value of the `object-fit` CSS property from the `HTMLVideoElement` used by this `CameraView` instance.
     * The `object-fit` property determines how the video content is resized to fit its container.
     *
     * @returns The current value of the `object-fit` property applied to the video element. At present, the value is limited to "cover" and "contain".
     * Check out more on [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit).
     */
    getVideoFit(): "contain" | "cover";
    /**
     * Get dimensions of content(video, or image in single frame mode). It decides what dimensions the layers should be created.
     * @returns
     */
    protected getContentDimensions(): {
        width: number;
        height: number;
        objectFit: string;
    };
    /**
     * Update prop '#convertedRegion' and update related UI.
     * @param contentDimensions
     * @ignore
     */
    private updateConvertedRegion;
    /**
     * @ignore
     */
    getConvertedRegion(): {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /**
     * @ignore
     */
    setScanRegion(region: DSRect | Rect): void;
    /**
     * @ignore
     */
    getScanRegion(): any;
    /**
     * Returns the region of the video that is currently visible to the user.
     * @param options [Optional] Specifies how the visible region should be returned.
     * @param options.inPixels [Optional] If `true`, the coordinates of the visible region are returned in pixels. If `false` or omitted, the coordinates are returned as a percentage of the video element's size.
     *
     * @returns An object representing the visible region of the video.
     */
    getVisibleRegionOfVideo(options: {
        inPixels?: boolean;
    }): Rect;
    private setScanRegionMask;
    private clearScanRegionMask;
    /**
     * Not used yet.
     * @ignore
     */
    private deleteScanRegionMask;
    /**
     *
     * @param visible
     * @ignore
     */
    _setScanRegionMaskVisible(visible: boolean): void;
    /**
     * Sets the visibility of the scan region mask. This can be used to show or hide the mask.
     * @param visible Boolean indicating whether the scan region mask should be visible (`true`) or not (`false`).
     */
    setScanRegionMaskVisible(visible: boolean): void;
    /**
     * Checks if the scan region mask is currently visible.
     *
     * @returns Boolean indicating whether the scan region mask is visible (`true`) or not (`false`).
     */
    isScanRegionMaskVisible(): boolean;
    /**
     * Sets the style of the scan region mask. This style includes the line width, stroke color, and fill color.
     * @param style An object containing the new style settings for the scan region mask.
     * @param style.lineWidth The width of the line used to draw the border of the scan region mask.
     * @param style.strokeStyle The color of the stroke (border) of the scan region mask.
     * @param style.fillStyle The fill color of the scan region mask.
     */
    setScanRegionMaskStyle(style: {
        lineWidth: number;
        strokeStyle: string;
        fillStyle: string;
    }): void;
    /**
     * Retrieves the current style of the scan region mask. This includes the line width, stroke color, and fill color.
     */
    getScanRegionMaskStyle(): {
        fillStyle: string;
        strokeStyle: string;
        lineWidth: number;
    };
    /**
     * @ignore
     */
    private _setScanLaserVisible;
    /**
     * Sets the visibility of the scan laser effect. This can be used to show or hide the scan laser.
     * @param visible Boolean indicating whether the scan laser should be visible (`true`) or not (`false`).
     */
    setScanLaserVisible(visible: boolean): void;
    /**
     * Checks if the scan laser effect is currently visible.
     *
     * @returns Boolean indicating whether the scan laser is visible (`true`) or not (`false`).
     */
    isScanLaserVisible(): boolean;
    /**
     * @ignore
     */
    _updateVideoContainer(): void;
    /**
     * Update all layers(scan laser, drawing layers, scan region mask). Not used yet.
     * @ignore
     */
    private updateLayers;
    /**
     * Clears all system-defined `DrawingItem` objects while keeping user-defined ones.
     */
    clearAllInnerDrawingItems(): void;
    /**
     * Remove added elements. Remove event listeners.
     */
    dispose(): void;
}

declare class ImageEditorView extends View {
    #private;
    static createInstance(elementOrUrl?: HTMLElement | string): Promise<ImageEditorView>;
    private UIElement;
    /**
     * @ignore
     */
    containerClassName: string;
    /**
     * Control if enable magnifier function.
     * @ignore
     */
    private isUseMagnifier;
    /**
     * Returns whether the `ImageEditorView` instance has been disposed of.
     *
     * @returns Boolean indicating whether the `ImageEditorView` instance has been disposed of.
     */
    get disposed(): boolean;
    private constructor();
    /**
     * Differ from 'setUIElement()', 'setUIElement()' allow parameter of 'string' type, which means a url, '_setUIElement()' only accept parameter of 'HTMLElement' type.
     * @param element
     */
    private _setUIElement;
    setUIElement(elementOrUrl: HTMLElement | string): Promise<void>;
    getUIElement(): HTMLElement;
    private _bindUI;
    private _unbindUI;
    /**
     * Draw image in inner canvas.
     * @ignore
     */
    private setImage;
    /**
     * Not used yet.
     * @ignore
     */
    private getImage;
    /**
     * Not used yet.
     * @ignore
     */
    private clearImage;
    /**
     * Not used yet.
     * @ignore
     */
    private removeImage;
    /**
     * Sets the image to be drawn on the `ImageEditorView`.
     * This method allows for the initialization or updating of the image.
     * @param image The image to be drawn on the `ImageEditorView`.
     */
    setOriginalImage(img: DSImageData | HTMLCanvasElement | HTMLImageElement): void;
    /**
     * Returns the current image drawn on the `ImageEditorView`.
     *
     * @returns The current image drawn on the `ImageEditorView`. The returned type will match the format of the image originally set via `setOriginalImage()`.
     */
    getOriginalImage(): DSImageData | HTMLCanvasElement | HTMLImageElement;
    /**
    * Get dimensions of content(that is, the image). It decides what dimensions the layers should be created.
    * @returns
    */
    protected getContentDimensions(): {
        width: number;
        height: number;
        objectFit: string;
    };
    /**
     * Create drawing layer with specified id and size.
     * Differ from 'createDrawingLayer()', the drawing layers created'createDrawingLayer()' can not Specified id, and their size is the same as video.
     * @ignore
     */
    _createDrawingLayer(drawingLayerId: number, width?: number, height?: number, objectFit?: string): DrawingLayer;
    /**
     * Releases all resources used by the `ImageEditorView` instance.
     */
    dispose(): void;
}

declare class Feedback {
    #private;
    static allowBeep: boolean;
    static beepSoundSource: string;
    static beep(): void;
    static allowVibrate: boolean;
    static vibrateDuration: number;
    static vibrate(): void;
}

declare class DrawingStyleManager {
    #private;
    static STYLE_BLUE_STROKE: number;
    static STYLE_GREEN_STROKE: number;
    static STYLE_ORANGE_STROKE: number;
    static STYLE_YELLOW_STROKE: number;
    static STYLE_BLUE_STROKE_FILL: number;
    static STYLE_GREEN_STROKE_FILL: number;
    static STYLE_ORANGE_STROKE_FILL: number;
    static STYLE_YELLOW_STROKE_FILL: number;
    static STYLE_BLUE_STROKE_TRANSPARENT: number;
    static STYLE_GREEN_STROKE_TRANSPARENT: number;
    static STYLE_ORANGE_STROKE_TRANSPARENT: number;
    static USER_START_STYLE_ID: number;
    static createDrawingStyle(styleDefinition: DrawingStyle): number;
    private static _getDrawingStyle;
    static getDrawingStyle(styleId: number): DrawingStyle;
    static getAllDrawingStyles(): Array<DrawingStyle>;
    private static _updateDrawingStyle;
    static updateDrawingStyle(styleId: number, styleDefinition: DrawingStyle): void;
}

export { CameraEnhancer, CameraEnhancerModule, CameraView, DCEFrame, DrawingItem, DrawingItemEvent, DrawingLayer, DrawingStyle, DrawingStyleManager, EnumDrawingItemMediaType, EnumDrawingItemState, EnumEnhancedFeatures, Feedback, DT_Group as GroupDrawingItem, DT_Image as ImageDrawingItem, ImageEditorView, DT_Line as LineDrawingItem, Note, PlayCallbackInfo, DT_Quad as QuadDrawingItem, DT_Rect as RectDrawingItem, Resolution, DT_Text as TextDrawingItem, TipConfig, VideoDeviceInfo, VideoFrameTag };
