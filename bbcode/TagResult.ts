export default class TagResult {
    private _before: string;
    private _after: string;

    constructor(before: string, after: string) {
        this._before = before;
        this._after = after;
    }

    public get before(): string {
        return this._before;
    }

    public get after(): string {
        return this._after;
    }
}