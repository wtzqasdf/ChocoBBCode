import Tag from './Tag';
import TagResult from './TagResult';

export default class TextTag extends Tag {
    constructor() {
        super('text');
    }

    public toResult(line: string): TagResult {
        const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
        const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
        //Properties
        const content = line.replace(prefix![0], '').replace(suffix![0], '');
        const color = this.getColor(prefix![0]);
        const weight = this.getFontWeight(prefix![0]);
        const italic = this.getFontItalic(prefix![0]);
        const underline = this.getUnderline(prefix![0]);
        const size = this.getFontSize(prefix![0]);
        const multipleLine = this.getMultipleLine(prefix![0]);
        //To element
        let style = '';
        let tagName = multipleLine !== null ? 'pre' : 'span';
        if (color !== null) {
            style += `color:${color};`;
        }
        if (weight !== null) {
            style += `font-weight:${weight};`;
        }
        if (italic !== null) {
            style += `font-style:italic;`;
        }
        if (size !== null){
            style += `font-size:${size};`;
        }
        let element = `<${tagName} style="${style}">${content}</${tagName}>`;
        if (underline !== null) {
           element = `<u>${element}</u>`;
        }
        return new TagResult(line, element);
    }
}