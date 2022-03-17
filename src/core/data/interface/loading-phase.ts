import { IAssetConfig } from "./asset-config";

export interface ILoadingStage {
    name: string;
    assets: IAssetConfig[];
    onProgress?: (...params: any[]) => void;
    onError?: (...params: any[]) => void;
    onComplete?: (...params: any[]) => void;
    onLoad?: (...params: any[]) => void;
}
