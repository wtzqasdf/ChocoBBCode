import Tag from './Tag';
import TagResult from './TagResult';

export default class HLJSTag extends Tag {
    constructor() {
        super('code');
    }

    public toResult(line: string): TagResult {
        const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
        const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
        //Properties
        const content = line.replace(prefix![0], '').replace(suffix![0], '');
        const lang = this.getHLJSLang(prefix![0]);
        let element = `<pre><code class="language-${lang}">${content}</code></pre>`;
        return new TagResult(line, element);
    }
}