import Tag from './Tag';
import TagResult from './TagResult';
import ImageTag from './ImageTag';
import TextTag from './TextTag';
import LinkTag from './LinkTag';
import HLJSTag from './HLJSTag';

export default class ChocoBBCode {
    private _tags: Tag[];

    constructor() {
        this._tags = [];
        this._tags.push(new ImageTag());
        this._tags.push(new TextTag());
        this._tags.push(new LinkTag());
        this._tags.push(new HLJSTag());
    }

    render(text: string): string {
        const tagResults: TagResult[] = [];
        this._tags.forEach(tag => {
            //Get all bbcode lines from text
            const lines = tag.matchAll(text);
            lines.forEach(line => {
                //Get bbcode and html to result
                tagResults.push(tag.toResult(line));
            });
        });
        //Convert bbcode as html
        tagResults.forEach(a => {
            text = text.replace(a.before, a.after);
        });
        return text;
    }
}

