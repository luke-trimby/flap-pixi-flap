
import { AbstractService } from "../../data/abstract/abstract-service";
import { IAssetConfig } from "../../data/interface/asset-config";
import { ILoadingPhase } from "../../data/interface/loading-phase";
import { Log } from "../../util/log";
import PIXI = require("pixi.js");

export class PreloaderSerice extends AbstractService {

    protected loadingPhases: ILoadingPhase[];
    protected currentPhase: ILoadingPhase;
    protected pixiLoader: PIXI.Loader;
    protected phaseBindings: any[];

    public init(): void {
        Log.d(`[PreloaderSerice] Initialising Preloader`);
        this.loadingPhases = [];
        this.pixiLoader = new PIXI.Loader();

        this.pixiLoader.onProgress.add((loader: PIXI.Loader) => this.onProgress(loader));
        this.pixiLoader.onLoad.add((loader: PIXI.Loader, resource: PIXI.LoaderResource) => this.onLoad(loader, resource));
        this.pixiLoader.onError.add((error: Error, loader: PIXI.Loader) => this.onError(error, loader));
        this.pixiLoader.onComplete.add((loader: PIXI.Loader, resources: PIXI.LoaderResource[]) => this.onComplete(loader, resources));
    }

    public load(): void {
        this.currentPhase = this.loadingPhases.shift();
        this.phaseBindings = [];
        Log.d(`[PreloaderSerice] Loading phase`, this.currentPhase);

        if (this.currentPhase.onProgress) {
            const onProgressBinding = this.pixiLoader.onProgress.add((loader: PIXI.Loader) => this.currentPhase.onProgress(loader));
            this.phaseBindings.push(onProgressBinding);
        }
        if (this.currentPhase.onLoad) {
            const onLoadBinding = this.pixiLoader.onLoad.add((loader: PIXI.Loader, resource: PIXI.LoaderResource) => this.currentPhase.onLoad(loader, resource));
            this.phaseBindings.push(onLoadBinding);
        }
        if (this.currentPhase.onError) {
            const onErrorBinding = this.pixiLoader.onError.add((error: Error, loader: PIXI.Loader) => this.currentPhase.onError(error, loader));
            this.phaseBindings.push(onErrorBinding);
        }
        if (this.currentPhase.onComplete) {
            const onCompleteBinding = this.pixiLoader.onComplete.add((loader: PIXI.Loader, resources: PIXI.LoaderResource[]) => this.currentPhase.onComplete(loader, resources));
            this.phaseBindings.push(onCompleteBinding);
        }

        this.currentPhase.assets.forEach((assetConfig: IAssetConfig) => {
            Log.i(`[PreloaderSerice] Register asset`, assetConfig.name);
            this.pixiLoader.add(assetConfig.name, assetConfig.path);
        });

        this.pixiLoader.load();
    }

    public addLoadingPhases(...phases: ILoadingPhase[]): void {
        Log.i(`[PreloaderService] Adding loading phases`, ...phases);
        this.loadingPhases.push(...phases);
    }

    protected onProgress(loader: PIXI.Loader): void {
        Log.i(`[PreloaderService] onProgress`, loader.progress);
    }

    protected onLoad(loader: PIXI.Loader, resource: PIXI.LoaderResource): void {
        Log.i(`[PreloaderService] onLoad asset`, resource.name);
    }

    protected onError(error: Error, loader: PIXI.Loader): void {
        Log.throw(0, error.message);
    }

    protected onComplete(loader: PIXI.Loader, resources: PIXI.LoaderResource[]): void {
        Log.i(`[PreloaderService] Loading phase complete`, this.currentPhase.name);
        if (this.loadingPhases.length > 0) {
            this.phaseBindings.forEach((binding) => binding.detach());
            this.load();
        }
    }
}