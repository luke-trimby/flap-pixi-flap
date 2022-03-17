
import { Log } from "enhance-log";
import { Loader, LoaderResource } from "pixi.js";
import { Signal } from "signals";
import { AbstractService } from "../../data/abstract/abstract-service";
import { IAssetConfig } from "../../data/interface/asset-config";
import { ILoadingStage } from "../../data/interface/loading-phase";
import { AssetService } from "../asset/asset-service";
import { Services } from "../services";

export class PreloaderSerice extends AbstractService {

    public onLoadingStarted: Signal;
    public onLoadingProgress: Signal;
    public onStageLoaded: Signal;
    public onAllStagesLoaded: Signal;
    protected pixiLoader: Loader;
    protected loadingStages: ILoadingStage[];
    protected loadingStageBindings: any[];
    protected loadingStagesTotal: number;
    protected loadingStagesLoaded: number;
    protected currentLoadingStage: ILoadingStage;

    public init(): void {
        Log.d(`[PreloaderService] Initialising`);
        this.onLoadingStarted = new Signal();
        this.onLoadingProgress = new Signal();
        this.onStageLoaded = new Signal();
        this.onAllStagesLoaded = new Signal();
        this.loadingStagesLoaded = 0;
        this.loadingStages = [];
        this.pixiLoader = new Loader();

        this.pixiLoader.onProgress.add((loader: Loader) => this.onProgress(loader));
        this.pixiLoader.onLoad.add((loader: Loader, resource: LoaderResource) => this.onLoad(loader, resource));
        this.pixiLoader.onError.add((error: Error, loader: Loader) => this.onError(error, loader));
        this.pixiLoader.onComplete.add((loader: Loader, resources: LoaderResource[]) => this.onComplete(loader, resources));
    }

    public load(): void {
        this.onLoadingStarted.dispatch();
        this.loadNextStage();
    }

    public addLoadingStages(...stages: ILoadingStage[]): void {
        Log.i(`[PreloaderService] Adding loading stages`, ...stages);
        this.loadingStages.push(...stages);
        this.loadingStagesTotal = this.loadingStages.length;
    }

    protected loadNextStage(): void {
        this.currentLoadingStage = this.loadingStages.shift();
        this.loadingStageBindings = [];
        Log.d(`[PreloaderService] Loading next stage`, this.currentLoadingStage);

        if (this.currentLoadingStage.onProgress) {
            const onProgressBinding = this.pixiLoader.onProgress.add((loader: Loader) => this.currentLoadingStage.onProgress(loader));
            this.loadingStageBindings.push(onProgressBinding);
        }
        if (this.currentLoadingStage.onLoad) {
            const onLoadBinding = this.pixiLoader.onLoad.add((loader: Loader, resource: LoaderResource) => this.currentLoadingStage.onLoad(loader, resource));
            this.loadingStageBindings.push(onLoadBinding);
        }
        if (this.currentLoadingStage.onError) {
            const onErrorBinding = this.pixiLoader.onError.add((error: Error, loader: Loader) => this.currentLoadingStage.onError(error, loader));
            this.loadingStageBindings.push(onErrorBinding);
        }
        if (this.currentLoadingStage.onComplete) {
            const onCompleteBinding = this.pixiLoader.onComplete.add((loader: Loader, resources: LoaderResource[]) => this.currentLoadingStage.onComplete(loader, resources));
            this.loadingStageBindings.push(onCompleteBinding);
        }

        this.currentLoadingStage.assets.forEach((assetConfig: IAssetConfig) => {
            Log.i(`[PreloaderService] Register asset`, assetConfig.name);
            this.pixiLoader.add(assetConfig.name, assetConfig.path);
        });

        this.pixiLoader.load();
    }

    protected onProgress(loader: Loader): void {
        Log.i(`[PreloaderService] onProgress`, loader.progress);
        this.onLoadingProgress.dispatch(loader.progress, this.loadingStagesLoaded, this.loadingStagesTotal);
    }

    protected onLoad(loader: Loader, resource: LoaderResource): void {
        Log.i(`[PreloaderService] onLoad asset`, resource.name);
    }

    protected onError(error: Error, loader: Loader): void {
        Log.throw(error.message);
    }

    protected onComplete(loader: Loader, resources: LoaderResource[]): void {
        Log.i(`[PreloaderService] Loading phase complete`, this.currentLoadingStage.name, resources);
        Services.get(AssetService).addResources(resources);
        this.loadingStagesLoaded++;
        this.onStageLoaded.dispatch(this.currentLoadingStage.name, this.loadingStagesLoaded, this.loadingStagesTotal);
        if (this.loadingStages.length > 0) {
            this.loadingStageBindings.forEach((binding) => binding.detach());
            this.loadNextStage();
        } else {
            Log.i(`[PreloaderService] All loading stages complete`);
            this.onAllStagesLoaded.dispatch();
        }
    }
}