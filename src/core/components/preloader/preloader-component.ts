import { Log } from "enhance-log";
import { AbstractComponent } from "../../data/abstract/abstract-component";
import { PreloaderSerice } from "../../services/preloader/preloader-service";
import { Services } from "../../services/services";

export class PreloaderComponent extends AbstractComponent {

    public init(): void {
        Services.get(PreloaderSerice).onStageLoaded.add((name: string, complete: number, total: number) => this.onStageLoaded(name, complete, total));
    }

    protected onStageLoaded(name: string, complete: number, total: number): void {
        Log.i(`[PreloaderComponent] Stage ${complete}/${total} loaded`, name);
    }
}