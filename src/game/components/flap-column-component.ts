import gsap from "gsap";
import { Container, Graphics, Point, Rectangle, Sprite } from "pixi.js";
import { Signal } from "signals";
import { FadeFromTo } from "../../core/commands/animation/fade-from-to";
import { Components } from "../../core/components/components";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { AssetService } from "../../core/services/asset/asset-service";
import { CanvasService } from "../../core/services/canvas/canvas-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { randomRangeInt } from "../../core/utils/number-utils";
import { ColumnSpeed } from "../data/flap-column-speed";
import { IColumnElementConfig } from "../data/interface/flap-column-element-config";
import { FlapPixiComponent } from "./flap-pixi-component";
import { FlapScoreComponent } from "./flap-score-component";

export class FlapColumnComponent extends AbstractComponent {

    public onPixiDeath: Signal;
    protected layer: Container;
    protected moving:  boolean;
    protected hitTestingEnabled:  boolean;
    protected speed: ColumnSpeed;
    protected columns: IColumnElementConfig[];
    protected scoreComponent: FlapScoreComponent;
    protected pixiComponent: FlapPixiComponent;

    public init(): void {
        this.onPixiDeath = new Signal();
        this.layer = Services.get(LayerService).getLayer("columns");
        this.scoreComponent = Components.get(FlapScoreComponent);
        this.pixiComponent = Components.get(FlapPixiComponent);
        this.hitTestingEnabled = false;
        this.moving = false;
        this.speed = ColumnSpeed.NORMAL;
        this.columns = [];
    }

    public create(): void {
        const assetService: AssetService = Services.get(AssetService);
        this.show();

        for (let i: number = 1; i <= 2; i++) {
            const top: Sprite = assetService.createSprite("column");
            top.position.set(0, -top.height);

            const topHit: Sprite = assetService.createSprite("column");
            topHit.position.set(topHit.width * -0.25, topHit.height * -0.975);
            topHit.scale.set(1.4, 1.05);
            topHit.alpha = 0.0;
            topHit.tint = 0x00ff00;

            const spacingY: number = randomRangeInt(250, 400);

            const btm: Sprite = assetService.createSprite("column");
            btm.position.set(0, spacingY);

            const btmHit: Sprite = assetService.createSprite("column");
            btmHit.position.set(btmHit.width * -0.25, spacingY - (btmHit.height * 0.075));
            btmHit.scale.set(1.4, 1.05);
            btmHit.alpha = 0.0;
            btmHit.tint = 0x00ff00;

            const container: Container = new Container();
            container.addChild(top, topHit, btm, btmHit);
            container.interactive = false;

            this.layer.addChild(container);
            container.position.set((350 * i) - 200, 240);
            container.visible = false;

            this.columns.push({
                top, btm, topHit, btmHit, container,
                repositionAtX: -150,
                repositionX: 690,
                repositionY: 240,
                positionVariationMin: new Point(0, -200),
                positionVariationMax: new Point(0, 300),
                spacingVariationMin: 250,
                spacingVariationMax: 400,
                scoreAwarded: false
            });
        }
    }

    public setSpeed(speed: ColumnSpeed, duration: number = 0): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            gsap.to(this, { speed, duration, onComplete: () => resolve() });
        });
    }

    public enableHitTesting(enabled: boolean = true): void {
        this.hitTestingEnabled = enabled;
    }

    public setMoving(moving: boolean = true): void {
        this.moving = moving;
        if (this.moving) {
            Services.get(CanvasService).registerForUpdates(this.onUpdate, this);
        } else {
            Services.get(CanvasService).deRegisterFromUpdates(this.onUpdate, this);
        }
    }

    public show(show: boolean = true, duration: number = 0): Promise<any> {
        return FadeFromTo(this.layer, Number(!show), Number(show), duration);
    }

    public destroy(): void {
        this.layer.removeChildren();
        this.hitTestingEnabled = false;
        this.moving = false;
        this.speed = ColumnSpeed.NORMAL;
        this.columns = [];
    }

    protected onUpdate(): void {
        if (this.moving) {
            this.columns.forEach((column: IColumnElementConfig) => {
                column.container.x -= this.speed * devicePixelRatio;
                if (column.container.position.x <= column.repositionAtX) {
                    const repositionX: number = column.repositionX + randomRangeInt(column.positionVariationMin.x, column.positionVariationMax.x);
                    const repositionY: number = column.repositionY + randomRangeInt(column.positionVariationMin.y, column.positionVariationMax.y);
                    const spacingY: number = randomRangeInt(column.spacingVariationMin, column.spacingVariationMax);
                    column.btm.position.y = spacingY;
                    column.btmHit.position.y = spacingY - (column.btmHit.height * 0.05);
                    column.container.position.x = repositionX;
                    column.container.position.y = repositionY;
                    column.container.visible = true;
                    column.scoreAwarded = false;
                }
                if (this.hitTestingEnabled) {
                    if (column.topHit.containsPoint(this.pixiComponent.getPixiSprite().position)) {
                        this.handleDeath();
                    }
                    else if (column.btmHit.containsPoint(this.pixiComponent.getPixiSprite().position)) {
                        this.handleDeath();
                    }
                }
                if (!column.scoreAwarded && column.container.visible) {
                    if (this.pixiComponent.getPixiSprite().position.x >= column.container.position.x + column.container.width) {
                        column.scoreAwarded = true;
                        this.scoreComponent.incrementScore();
                    }
                }
            });
        }
    }

    protected handleDeath(): void {
        this.setMoving(false);
        this.enableHitTesting(false);
        this.onPixiDeath.dispatch();
    }
}