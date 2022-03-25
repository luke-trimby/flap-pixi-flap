import { Bounds, Matrix, Point, Rectangle } from "pixi.js";
import { PolySprite } from "../graphics/poly-sprite";
import { CollisionLevel } from "./collision-level";
import { Edge } from "./edge";

export class CollisionPoly {
    public edges: Edge[];
    public points: Point[];
    public AABB: Rectangle;
    public bounds: Bounds;
    public intersectionPoint: Point;
    public vertices: Float32Array[];
    public target: PolySprite;
    public collisionLevel: number = CollisionLevel.NONE;

    constructor(target: PolySprite, points: Point[] = []) {
        this.edges = [];
        this.points = points;
        this.AABB = new Rectangle();
        this.bounds = new Bounds();
        this.intersectionPoint = new Point();
        this.target = target;
        this.vertices = points.map((p: Point) => new Float32Array([p.x, p.y]));

        this.update();
    }

    public update() {
        const matrix: Matrix = this.target.transform.worldTransform;
        this.bounds.clear();
        this.edges = [];
        for (let i: number = 0; i < this.points.length; i++) {
            const mPoint: Point = matrix.apply(this.points[i]);
            const nextMPoint: Point = matrix.apply(this.points[i + 1] || this.points[0]);
            this.bounds.addPoint(mPoint);
            this.edges.push(new Edge(mPoint, nextMPoint));
        }
        this.bounds.getRectangle(this.AABB);
    }

    public intersectsBounds(shape: CollisionPoly): boolean {
        const intersects: boolean = !(
            this.bounds.maxX < shape.bounds.minX ||
            this.bounds.maxY < shape.bounds.minY ||
            this.bounds.minX > shape.bounds.maxX ||
            this.bounds.minY > shape.bounds.maxY
        );
        this.collisionLevel = intersects ? CollisionLevel.BOUNDS : CollisionLevel.NONE;
        if (this.target.isDebug()) {
            this.target.tint = this.collisionLevel;
        }
        return intersects;
    }

    public intersectsShape(shape: CollisionPoly): boolean {
        for (const edge1 of this.edges) {
            for (const edge2 of shape.edges) {
                if (edge1.intersects(edge2, true, this.intersectionPoint)) {
                    this.collisionLevel = CollisionLevel.POLY;
                    if (this.target.isDebug()) {
                        this.target.tint = this.collisionLevel;
                    }
                    return true;
                }
            }
        }
        this.collisionLevel = CollisionLevel.NONE;
        if (this.target.isDebug()) {
            this.target.tint = this.collisionLevel;
        }
        return false;
    }
}