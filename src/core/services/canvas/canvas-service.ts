import { Size } from "../../data/size";
import { AbstractService } from "../../data/abstract/abstract-service";
import { ICanvasProperties } from "../../data/interface/canvas-properties";
import { Log } from "enhance-log";
import { autoDetectRenderer, Container, Renderer, Ticker } from "pixi.js";

export class CanvasService extends AbstractService {
    private ratio: number;
    private size: Size;
    private scale: Size;
    private renderEngine: Renderer;
    private canvasTarget: HTMLDivElement;
    private gameStage: Container;
    private ticker: Ticker;
    private htmlLayerContainerDiv: HTMLDivElement;

    constructor(private properties: ICanvasProperties) {
        super();
        Log.d(`[CanvasService] Initialising`);
    }

    public init(): void {
        this.ratio = 1;
        this.size = this.properties.size;
        this.htmlLayerContainerDiv = document.getElementById(this.properties.htmlContainer) as HTMLDivElement;
        this.injectCanvas(this.properties.canvasContainer);
    }

    public get stage(): Container {
        return this.gameStage;
    }

    public render() {
        this.renderEngine.render(this.gameStage);
    }

    public registerForUpdates(updateFunc: () => any): void {
        if (this.ticker?.started) {
            this.ticker.add(() => updateFunc());
        }
    }

    private injectCanvas(target:string, win: Window = window) {
        this.canvasTarget = document.getElementById(target) as HTMLDivElement;
        if (this.canvasTarget) {
            var size: Size = new Size(this.size.width, this.size.height);
            this.ratio = this.size.width / this.size.height;
            this.renderEngine = this.detectRenderEngine(size);

            this.gameStage = new Container();
            this.canvasTarget.insertBefore(this.renderEngine.view, this.canvasTarget.firstChild);

            size = this.getBestCanvasSizeForWindow(win);
            this.renderEngine.view.style.width = size.width + "px";
            this.renderEngine.view.style.height = size.height + "px";

            win.addEventListener('resize', () => this.windowResize(win));
            this.windowResize(win);

            this.ticker = new Ticker();
            this.ticker.start();
        }
    }

    private detectRenderEngine(size: Size):any {
        var pixiProperties = {
            width: size.width,
            height: size.height,
            backgroundColor: this.properties.canvasColor
        };
        this.renderEngine = autoDetectRenderer(pixiProperties);
        return this.renderEngine;
    }

    private getBestCanvasSizeForWindow(currentWindow: Window): Size {
        var w: number, h: number;
        if (currentWindow.innerWidth / window.innerHeight >= this.ratio) {
            w = currentWindow.innerHeight * this.ratio;
            h = currentWindow.innerHeight;
        } else {
            w = currentWindow.innerWidth;
            h = currentWindow.innerWidth / this.ratio;
        }
        return new Size(w, h);
    }

    private windowResize(currentWindow: Window) {
        var size: Size = this.getBestCanvasSizeForWindow(currentWindow);
        this.renderEngine.view.style.height = size.height + "px";
        this.renderEngine.view.style.width = size.width + "px";
        if (this.properties.centered) {
            this.renderEngine.view.style.marginLeft = (currentWindow.innerWidth - size.width) / 2 + "px";
        }
        this.scale = new Size(size.width / this.size.width, size.height / this.size.height);
        this.htmlLayerContainerDiv.style.width = this.size.width + "px";
        this.htmlLayerContainerDiv.style.height = this.size.height + "px";
        this.htmlLayerContainerDiv.style.transform = "scale(" + this.scale.width + ", " + this.scale.height + ")";
        this.htmlLayerContainerDiv.style.transformOrigin = "center top";
        this.htmlLayerContainerDiv.style.left = (currentWindow.innerWidth - this.size.width) / 2 + "px";
    }
}