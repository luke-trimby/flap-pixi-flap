import { Point } from "pixi.js";

export class Edge {
    public p1: Point;
    public p2: Point;

    constructor(p1 = new Point(), p2 = new Point()) {
        this.p1 = p1;
        this.p2 = p2;
    }

    public intersects(edge: Edge, asSegment: boolean = true, point = new Point()) {
        const a: Point = this.p1;
        const b: Point = this.p2;
        const e: Point = edge.p1;
        const f: Point = edge.p2;

        const a1: number = b.y - a.y;
        const a2: number = f.y - e.y;
        const b1: number = a.x - b.x;
        const b2: number = e.x - f.x;
        const c1: number = (b.x * a.y) - (a.x * b.y);
        const c2: number = (f.x * e.y) - (e.x * f.y);
        const denom: number = (a1 * b2) - (a2 * b1);

        if (denom === 0) {
            return null;
        }

        point.x = ((b1 * c2) - (b2 * c1)) / denom;
        point.y = ((a2 * c1) - (a1 * c2)) / denom;

        if (asSegment) {
            const uc: number = ((f.y - e.y) * (b.x - a.x) - (f.x - e.x) * (b.y - a.y));
            const ua: number = (((f.x - e.x) * (a.y - e.y)) - (f.y - e.y) * (a.x - e.x)) / uc;
            const ub: number = (((b.x - a.x) * (a.y - e.y)) - ((b.y - a.y) * (a.x - e.x))) / uc;

            if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
                return point;
            } else {
                return null;
            }
        }
        return point;
    }
}