import Tag from "./Tag";
import TagResult from "./TagResult";

export default class LinkTag extends Tag {
    constructor() {
        super('link');
    }

    public toResult(line: string): TagResult {
        const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
        const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
        //Properties
        const content = line.replace(prefix![0], '').replace(suffix![0], '');
        let href = this.getHref(prefix![0]);
        const color = this.getColor(prefix![0]);
        const weight = this.getFontWeight(prefix![0]);
        const target = this.getLinkTarget(prefix![0]);
        const size = this.getFontSize(prefix![0]);
        //To element
        let style = '';
        let elTarget = '_blank';
        if (color !== null) {
            style += `color:${color};`;
        }
        if (weight !== null) {
            style += `font-weight:${weight};`;
        }
        if (target !== null) {
            elTarget = target;
        }
        if (size !== null) {
            style += `font-size:${size};`;
        }
        if (href?.indexOf('https://') !== 0 && href?.indexOf('http://') !== 0) {
            href = 'https://' + href;
        }
        let element = `<a style="text-decoration:none;${style}" href="${href}" target="${elTarget}">${content}</a>`;
        return new TagResult(line, element);
    }
}