import { IAssetConfig } from "./asset-config";

export interface ILoadingStage {
    name: string;
    assets: IAssetConfig[];
    fonts?: string[];
    onProgress?: (...params: any[]) => void;
    onError?: (...params: any[]) => void;
    onComplete?: (...params: any[]) => void;
    onLoad?: (...params: any[]) => void;
}
