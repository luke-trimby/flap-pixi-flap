import { Log } from "enhance-log";
import gsap from "gsap";
import { Container, Point, Sprite } from "pixi.js";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { AssetService } from "../../core/services/asset/asset-service";
import { CanvasService } from "../../core/services/canvas/canvas-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { randomRangeInt } from "../../core/utils/number-utils";
import { ColumSpeed } from "../data/flap-column-speed";
import { IColumnElementConfig } from "../data/interface/flap-column-element-config";

export class FlapColumnComponent extends AbstractComponent {

    protected layer: Container;
    protected moving:  boolean;
    protected speed: number = 0.75;
    protected columns: IColumnElementConfig[];

    public init(): void {
        this.layer = Services.get(LayerService).getLayer("columns");
        this.moving = false;
        this.speed = ColumSpeed.NORMAL;
        this.columns = [];
    }

    public create(): void {
        const assetService: AssetService = Services.get(AssetService);

        for (let i: number = 1; i <= 2; i++) {
            const top: Sprite = assetService.createSprite("column");
            top.scale.set(1, 1.2);
            top.anchor.set(0.5, 1);

            const btm: Sprite = assetService.createSprite("column");
            btm.scale.set(1, 1.2);
            btm.anchor.set(0.5, 0);
            btm.position.set(0, 200);

            const container: Container = new Container();
            container.addChild(top, btm);
            container.interactive = false;

            this.layer.addChild(container);
            container.position.set(350 * i, 270);
            container.visible = false;

            this.columns.push({ top, btm, container,
                repositionAtX: -150,
                repositionX: 690,
                repositionY: 270,
                positionVariationMin: new Point(0, -200),
                positionVariationMax: new Point(0, 300),
                spacingVariationMin: 200,
                spacingVariationMax: 400
            });
        }
    }

    public setSpeed(speed: ColumSpeed, duration: number = 0): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            gsap.to(this, { speed, duration, onComplete: () => resolve() });
        });
    }

    public setMoving(moving: boolean = true): void {
        this.moving = moving;
        if (this.moving) {
            Services.get(CanvasService).registerForUpdates(this.onUpdate, this);
        } else {
            Services.get(CanvasService).deRegisterFromUpdates(this.onUpdate, this);
        }
    }

    public destroy(): void {
        this.layer.removeChildren();
    }

    protected onUpdate(): void {
        if (this.moving) {
            this.columns.forEach((column: IColumnElementConfig) => {
                column.container.x -= this.speed;
                if (column.container.position.x <= column.repositionAtX) {
                    column.btm.position.y = randomRangeInt(column.spacingVariationMin, column.spacingVariationMax);
                    column.container.visible = true;
                    column.container.position.x = column.repositionX + randomRangeInt(column.positionVariationMin.x, column.positionVariationMax.x);
                    column.container.position.y = column.repositionY + randomRangeInt(column.positionVariationMin.y, column.positionVariationMax.y);
                }
            });
        }
    }
}