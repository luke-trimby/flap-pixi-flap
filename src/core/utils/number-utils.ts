
export function limitToRange(min: number, max: number, num: number): number {
    return Math.max(min, Math.min(max, num));
}