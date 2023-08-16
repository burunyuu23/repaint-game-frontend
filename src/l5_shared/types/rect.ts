export type Rect = {
    top: number,
    right: number,
    bottom: number,
    left: number,
}

export const emptyRect: Rect = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}

export const startFromXYRect = (x: number, y: number): Rect => ({
    top: y,
    right: x,
    bottom: y,
    left: x
})