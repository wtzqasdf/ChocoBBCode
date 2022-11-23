import TagResult from './TagResult'

export default class Tag {
    protected _prefixPattern: any;
    protected _suffixPattern: any;

    constructor(name: string) {
        this._prefixPattern = `\\[${name}.{0,}?\\]`;
        this._suffixPattern = `\\[\/${name}\\]`;
    }

    public matchAll(text: string): string[] {
        const fullPattern = `${this._prefixPattern}.{1,}?${this._suffixPattern}`;
        const regex = new RegExp(fullPattern, 'gs');
        const results = text.match(regex);
        const lines: string[] = [];
        results?.forEach(f => {
            lines.push(f);
        });
        return lines;
    }

    //override
    public toResult(line: string): TagResult {
        return new TagResult('', '');
    }

    protected getProperty(prefix: string, regExp: RegExp): string | null {
        const property = prefix.match(regExp);
        if (property !== null) {
            const lines = property[0].split(':=');
            return lines[1];
        }
        return null;
    }

    protected getWidth(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/width:=[0-9a-z%]{1,}/, 'g'));
    }

    protected getHeight(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/height:=[0-9a-z%]{1,}/, 'g'));
    }

    protected getFontSize(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/size:=[0-9a-z%]{1,}/, 'g'));
    }

    protected getColor(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/color:=[a-zA-Z0-9#]{1,}/, 'g'));
    }

    protected getFontWeight(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/weight:=[a-zA-Z0-9]{1,}/, 'g'));
    }

    protected getFontItalic(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/(italic)/, 'g'));
    }

    protected getUnderline(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/(underline)/, 'g'));
    }

    protected getHref(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/href:=[\S]{1,}[^\]\s]{1,}/, 'g'));
    }

    protected getLinkTarget(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/target:=(_blank|_self)/, 'g'));
    }

    protected getMultipleLine(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/(multiple)/, 'g'));
    }

    protected getHLJSLang(prefix: string): string | null {
        return this.getProperty(prefix, new RegExp(/lang:=[0-9a-zA-Z_-]{1,}/, 'g'));
    }
}