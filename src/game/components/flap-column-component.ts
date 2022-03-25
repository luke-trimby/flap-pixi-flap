import gsap from "gsap";
import { Container } from "pixi.js";
import { Signal } from "signals";
import { CollisionPoly } from "../../core/collision/collision-poly";
import { FadeFromTo } from "../../core/commands/animation/fade-from-to";
import { Components } from "../../core/components/components";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { PolySprite } from "../../core/graphics/poly-sprite";
import { AssetService } from "../../core/services/asset/asset-service";
import { CanvasService } from "../../core/services/canvas/canvas-service";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { randomRangeInt } from "../../core/utils/number-utils";
import { btmColumnPolyPoints, topColumnPolyPoints } from "../data/config/flap-column-poly-point";
import { ColumnSpeed } from "../data/flap-column-speed";
import { IColumnElementConfig } from "../data/interface/flap-column-element-config";
import { FlapPixiComponent } from "./flap-pixi-component";
import { FlapScoreComponent } from "./flap-score-component";

export class FlapColumnComponent extends AbstractComponent {
    public onPixiDeath: Signal;
    protected assetService: AssetService;
    protected layer: Container;
    protected moving:  boolean;
    protected hitTestingEnabled:  boolean;
    protected speed: ColumnSpeed;
    protected columns: IColumnElementConfig[];
    protected scoreComponent: FlapScoreComponent;
    protected pixiComponent: FlapPixiComponent;
    protected spacingXMin: number;
    protected spacingXMax: number;
    protected spacingYMin: number;
    protected spacingYMax: number;
    protected variationYMin: number;
    protected variationYMax: number;
    protected columnSpacingX: number;

    public init(): void {
        this.onPixiDeath = new Signal();
        this.layer = Services.get(LayerService).getLayer("columns");
        this.assetService = Services.get(AssetService);
        this.scoreComponent = Components.get(FlapScoreComponent);
        this.pixiComponent = Components.get(FlapPixiComponent);
        this.hitTestingEnabled = false;
        this.moving = false;
        this.spacingXMin = -100;
        this.spacingXMax = 100;
        this.spacingYMin = 220;
        this.spacingYMax = 375;
        this.variationYMin = -100;
        this.variationYMax = 200;
        this.columnSpacingX = 400;
        this.speed = ColumnSpeed.NORMAL;
        this.columns = [];
    }

    public create(): void {
        this.show();

        const initialX: number = 1000;
        for (let i : number = 0; i < 3; i++) {
            this.spawnColumn(initialX + (this.columnSpacingX * i), 240);
        }
    }

    public setSpeed(speed: ColumnSpeed, duration: number = 0): Promise<any> {
        return new Promise<any>((resolve: (value?: any) => any) => {
            gsap.to(this, { speed, duration, onComplete: () => resolve() });
        });
    }

    public increaseSpeedBy(increase: number): void {
        this.speed += increase;
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
            for (let i: number = 0; i < this.columns.length; i++) {
                const column = this.columns[i];

                const movementX: number = this.speed * devicePixelRatio;
                column.top.x -= movementX;
                column.btm.x -= movementX;

                column.top.update();
                column.btm.update();

                if (this.hitTestingEnabled) {
                    const pixi: PolySprite = this.pixiComponent.getPixiSprite();
                    if (column.top.collisionPoly.intersectsBounds(pixi.collisionPoly)) {
                        if (column.top.collisionPoly.intersectsShape(pixi.collisionPoly)) {
                            this.handleDeath();
                        }
                    }
                    else if (column.btm.collisionPoly.intersectsBounds(pixi.collisionPoly)) {
                        if (column.btm.collisionPoly.intersectsShape(pixi.collisionPoly)) {
                            this.handleDeath();
                        }
                    }
                }

                if (!column.scoreAwarded && column.top.visible) {
                    if (this.pixiComponent.getPixiSprite().position.x >= (column.top.position.x + column.top.width)) {
                        column.scoreAwarded = true;
                        this.scoreComponent.incrementScore();
                    }
                }

                if (column.top.position.x <= column.despawnX) {
                    this.columns.splice(i, 1);
                    column.top.destroy();
                    column.btm.destroy();
                    this.spawnColumn(this.columns[this.columns.length - 1].top.x + this.columnSpacingX, 240);
                }
            };
        }
    }

    protected spawnColumn(x: number, y: number): void {
        x += randomRangeInt(this.spacingXMin, this.spacingXMax);
        y += randomRangeInt(this.variationYMin, this.variationYMax);
        const spacingY: number = randomRangeInt(this.spacingYMin, this.spacingYMax);

        const top: PolySprite = this.assetService.createSprite("column");
        top.position.set(x, y - top.height);
        top.collisionPoly = new CollisionPoly(top, topColumnPolyPoints);

        const btm: PolySprite = this.assetService.createSprite("column");
        btm.position.set(x, top.y + top.height + spacingY);
        btm.collisionPoly = new CollisionPoly(btm, btmColumnPolyPoints);

        this.layer.addChild(top, btm);

        this.columns.push({
            top, btm,
            despawnX: -300,
            scoreAwarded: false
        });
    }

    protected handleDeath(): void {
        this.setMoving(false);
        this.enableHitTesting(false);
        this.onPixiDeath.dispatch();
    }
}