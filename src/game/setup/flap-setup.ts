import { PreloaderSerice } from "../../core/services/preloader/preloader-service";
import { Services } from "../../core/services/services";
import { CoreSetup } from "../../core/setup/core-setup";

export class FlapSetup extends CoreSetup {

    public registerAssets(): void {
        super.registerAssets();

        Services.get(PreloaderSerice).addLoadingPhases(
            {
                name: "GameAssets",
                assets: [
                    { name: "WorldAssets",  path: "./assets/atlas/WorldAssets.json" },
                    { name: "playButton",  path: "./assets/images/playButton.png" },
                    { name: "flyingPixie",  path: "./assets/images/flyingPixie.png" },
                    { name: "column",  path: "./assets/images/column.png" }
                ]
            }
        );
    }
}