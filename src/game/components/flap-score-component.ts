import { Container, Text } from "pixi.js";
import { FadeFromTo } from "../../core/commands/animation/fade-from-to";
import { AbstractComponent } from "../../core/data/abstract/abstract-component";
import { LayerService } from "../../core/services/layer/layer-service";
import { Services } from "../../core/services/services";
import { flapHighScoreTextStyle, flapScoreTextStyle } from "../data/config/flap-text-styles";

export class FlapScoreComponent extends AbstractComponent {

    protected layer: Container;
    protected currentScoreLabel: Text;
    protected highScoreLabel: Text;
    protected currentScoreValue: Text;
    protected highScoreValue: Text;
    protected currentScore: number;
    protected highScore: number;

    public init(): void {
        this.layer = Services.get(LayerService).getLayer("score");
        this.currentScore = 0;
        this.highScore = 0;
    }

    public create(): void {
        this.currentScoreLabel = new Text("Score", flapScoreTextStyle);
        this.currentScoreLabel.position.set(20, 20);
        this.layer.addChild(this.currentScoreLabel);

        this.currentScoreValue = new Text("0", flapScoreTextStyle);
        this.currentScoreValue.position.set(this.currentScoreLabel.x + this.currentScoreLabel.width + 20, 20);
        this.layer.addChild(this.currentScoreValue);

        this.highScoreLabel = new Text("Best", flapHighScoreTextStyle);
        this.highScoreLabel.anchor.set(1, 0);
        this.highScoreLabel.position.set(520, 20);
        this.layer.addChild(this.highScoreLabel);

        this.highScoreValue = new Text("0", flapHighScoreTextStyle);
        this.highScoreValue.anchor.set(1, 0);
        this.highScoreValue.position.set(this.highScoreLabel.x - this.highScoreLabel.width - 20, 20);
        this.layer.addChild(this.highScoreValue);

        this.show(false);
    }

    public show(show: boolean = true, duration: number = 0): Promise<any> {
        return FadeFromTo(this.layer, Number(!show), Number(show), duration);
    }

    public resetScore(): void {
        this.currentScore = 0;
        this.setScore(this.currentScore);
    }

    public incrementScore(): void {
        this.setScore(this.currentScore + 1);
    }

    protected setScore(score: number): void {
        this.currentScore = score;
        this.currentScoreValue.text = `${this.currentScore}`;
        if (this.highScore < this.currentScore) {
            this.highScore = this.currentScore;
            this.highScoreValue.text = `${this.highScore}`;
        }
    }
}