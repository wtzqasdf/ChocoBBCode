import Tag from './Tag';
import TagResult from './TagResult';

export default class ImageTag extends Tag {
    constructor() {
        super('img');
    }

    public toResult(line: string): TagResult {
        const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
        const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
        //Properties
        const content = line.replace(prefix![0], '').replace(suffix![0], '');
        const width = this.getWidth(prefix![0]);
        const height = this.getHeight(prefix![0]);
        //To element
        let style = '';
        if (width !== null) {
            style += `width:${width};`;
        }
        if (height !== null) {
            style += `height:${height};`;
        }
        let element = `<img style="${style}" src="${content}">`;
        return new TagResult(line, element);
    }

    public static getExample(): string {
        return '[img width:=0 height:=0]your url[/img]';
    }
}