import { LayerService } from "../../core/services/layer/layer-service";
import { PreloaderSerice } from "../../core/services/preloader/preloader-service";
import { Services } from "../../core/services/services";
import { StateMachineService } from "../../core/services/state-machine/state-machine-service";
import { CoreSetup } from "../../core/setup/core-setup";
import { InitState } from "../states/init-state";

export class FlapSetup extends CoreSetup {

    public registerAssets(): void {
        super.registerAssets();

        Services.get(PreloaderSerice).addLoadingStages(
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

    public registerLayers(): void {
        Services.get(LayerService).registerLayers(
            { name: "layer-one" },
            { name: "layer-two" },
            { name: "layer-three" },
            { name: "layer-four" },
            { name: "preloader-layer" }
        );
    }

    public registerStates(): void {
        const stateMachine: StateMachineService = Services.get(StateMachineService);

        stateMachine
            .addState(new InitState("init", true))
    }
}