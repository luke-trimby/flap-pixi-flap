import { IAssetConfig } from "./asset-config";

export interface ILoadingPhase {
    name: string;
    assets: IAssetConfig[];
    onProgress?: (...params: any[]) => void;
    onError?: (...params: any[]) => void;
    onComplete?: (...params: any[]) => void;
    onLoad?: (...params: any[]) => void;
}
