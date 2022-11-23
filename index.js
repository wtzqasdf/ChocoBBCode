var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("bbcode/TagResult", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TagResult {
        constructor(before, after) {
            this._before = before;
            this._after = after;
        }
        get before() {
            return this._before;
        }
        get after() {
            return this._after;
        }
    }
    exports.default = TagResult;
});
define("bbcode/Tag", ["require", "exports", "bbcode/TagResult"], function (require, exports, TagResult_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    TagResult_1 = __importDefault(TagResult_1);
    class Tag {
        constructor(name) {
            this._prefixPattern = `\\[${name}.{0,}?\\]`;
            this._suffixPattern = `\\[\/${name}\\]`;
        }
        matchAll(text) {
            const fullPattern = `${this._prefixPattern}.{1,}?${this._suffixPattern}`;
            const regex = new RegExp(fullPattern, 'gs');
            const results = text.match(regex);
            const lines = [];
            results === null || results === void 0 ? void 0 : results.forEach(f => {
                lines.push(f);
            });
            return lines;
        }
        toResult(line) {
            return new TagResult_1.default('', '');
        }
        getProperty(prefix, regExp) {
            const property = prefix.match(regExp);
            if (property !== null) {
                const lines = property[0].split(':=');
                return lines[1];
            }
            return null;
        }
        getWidth(prefix) {
            return this.getProperty(prefix, new RegExp(/width:=[0-9a-z%]{1,}/, 'g'));
        }
        getHeight(prefix) {
            return this.getProperty(prefix, new RegExp(/height:=[0-9a-z%]{1,}/, 'g'));
        }
        getFontSize(prefix) {
            return this.getProperty(prefix, new RegExp(/size:=[0-9a-z%]{1,}/, 'g'));
        }
        getColor(prefix) {
            return this.getProperty(prefix, new RegExp(/color:=[a-zA-Z0-9#]{1,}/, 'g'));
        }
        getFontWeight(prefix) {
            return this.getProperty(prefix, new RegExp(/weight:=[a-zA-Z0-9]{1,}/, 'g'));
        }
        getFontItalic(prefix) {
            return this.getProperty(prefix, new RegExp(/(italic)/, 'g'));
        }
        getUnderline(prefix) {
            return this.getProperty(prefix, new RegExp(/(underline)/, 'g'));
        }
        getHref(prefix) {
            return this.getProperty(prefix, new RegExp(/href:=[\S]{1,}[^\]\s]{1,}/, 'g'));
        }
        getLinkTarget(prefix) {
            return this.getProperty(prefix, new RegExp(/target:=(_blank|_self)/, 'g'));
        }
        getMultipleLine(prefix) {
            return this.getProperty(prefix, new RegExp(/(multiple)/, 'g'));
        }
        getHLJSLang(prefix) {
            return this.getProperty(prefix, new RegExp(/lang:=[0-9a-zA-Z_-]{1,}/, 'g'));
        }
    }
    exports.default = Tag;
});
define("bbcode/ImageTag", ["require", "exports", "bbcode/Tag", "bbcode/TagResult"], function (require, exports, Tag_1, TagResult_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Tag_1 = __importDefault(Tag_1);
    TagResult_2 = __importDefault(TagResult_2);
    class ImageTag extends Tag_1.default {
        constructor() {
            super('img');
        }
        toResult(line) {
            const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
            const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
            const content = line.replace(prefix[0], '').replace(suffix[0], '');
            const width = this.getWidth(prefix[0]);
            const height = this.getHeight(prefix[0]);
            let style = '';
            if (width !== null) {
                style += `width:${width};`;
            }
            if (height !== null) {
                style += `height:${height};`;
            }
            let element = `<img style="${style}" src="${content}">`;
            return new TagResult_2.default(line, element);
        }
        static getExample() {
            return '[img width:=0 height:=0]your url[/img]';
        }
    }
    exports.default = ImageTag;
});
define("bbcode/TextTag", ["require", "exports", "bbcode/Tag", "bbcode/TagResult"], function (require, exports, Tag_2, TagResult_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Tag_2 = __importDefault(Tag_2);
    TagResult_3 = __importDefault(TagResult_3);
    class TextTag extends Tag_2.default {
        constructor() {
            super('text');
        }
        toResult(line) {
            const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
            const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
            const content = line.replace(prefix[0], '').replace(suffix[0], '');
            const color = this.getColor(prefix[0]);
            const weight = this.getFontWeight(prefix[0]);
            const italic = this.getFontItalic(prefix[0]);
            const underline = this.getUnderline(prefix[0]);
            const size = this.getFontSize(prefix[0]);
            const multipleLine = this.getMultipleLine(prefix[0]);
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
            if (size !== null) {
                style += `font-size:${size};`;
            }
            let element = `<${tagName} style="${style}">${content}</${tagName}>`;
            if (underline !== null) {
                element = `<u>${element}</u>`;
            }
            return new TagResult_3.default(line, element);
        }
    }
    exports.default = TextTag;
});
define("bbcode/LinkTag", ["require", "exports", "bbcode/Tag", "bbcode/TagResult"], function (require, exports, Tag_3, TagResult_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Tag_3 = __importDefault(Tag_3);
    TagResult_4 = __importDefault(TagResult_4);
    class LinkTag extends Tag_3.default {
        constructor() {
            super('link');
        }
        toResult(line) {
            const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
            const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
            const content = line.replace(prefix[0], '').replace(suffix[0], '');
            let href = this.getHref(prefix[0]);
            const color = this.getColor(prefix[0]);
            const weight = this.getFontWeight(prefix[0]);
            const target = this.getLinkTarget(prefix[0]);
            const size = this.getFontSize(prefix[0]);
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
            if ((href === null || href === void 0 ? void 0 : href.indexOf('https://')) !== 0 && (href === null || href === void 0 ? void 0 : href.indexOf('http://')) !== 0) {
                href = 'https://' + href;
            }
            let element = `<a style="text-decoration:none;${style}" href="${href}" target="${elTarget}">${content}</a>`;
            return new TagResult_4.default(line, element);
        }
    }
    exports.default = LinkTag;
});
define("bbcode/HLJSTag", ["require", "exports", "bbcode/Tag", "bbcode/TagResult"], function (require, exports, Tag_4, TagResult_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Tag_4 = __importDefault(Tag_4);
    TagResult_5 = __importDefault(TagResult_5);
    class HLJSTag extends Tag_4.default {
        constructor() {
            super('code');
        }
        toResult(line) {
            const prefix = line.match(new RegExp(this._prefixPattern, 'g'));
            const suffix = line.match(new RegExp(this._suffixPattern, 'g'));
            const content = line.replace(prefix[0], '').replace(suffix[0], '');
            const lang = this.getHLJSLang(prefix[0]);
            let element = `<pre><code class="language-${lang}">${content}</code></pre>`;
            return new TagResult_5.default(line, element);
        }
    }
    exports.default = HLJSTag;
});
define("bbcode/ChocoBBCode", ["require", "exports", "bbcode/ImageTag", "bbcode/TextTag", "bbcode/LinkTag", "bbcode/HLJSTag"], function (require, exports, ImageTag_1, TextTag_1, LinkTag_1, HLJSTag_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ImageTag_1 = __importDefault(ImageTag_1);
    TextTag_1 = __importDefault(TextTag_1);
    LinkTag_1 = __importDefault(LinkTag_1);
    HLJSTag_1 = __importDefault(HLJSTag_1);
    class ChocoBBCode {
        constructor() {
            this._tags = [];
            this._tags.push(new ImageTag_1.default());
            this._tags.push(new TextTag_1.default());
            this._tags.push(new LinkTag_1.default());
            this._tags.push(new HLJSTag_1.default());
        }
        render(text) {
            const tagResults = [];
            this._tags.forEach(tag => {
                const lines = tag.matchAll(text);
                lines.forEach(line => {
                    tagResults.push(tag.toResult(line));
                });
            });
            tagResults.forEach(a => {
                text = text.replace(a.before, a.after);
            });
            return text;
        }
    }
    exports.default = ChocoBBCode;
});
define(["require", "exports", "bbcode/ChocoBBCode"], function (require, exports, ChocoBBCode_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ChocoBBCode_1 = __importDefault(ChocoBBCode_1);
    let bbcode = new ChocoBBCode_1.default();
    const text = `
[text color:=red italic weight:=bold size:=36px underline]Hello World[/text]
[link target:=_self href:=www.google.com size:=28px]I'm Link[/link]
[text color:=yellow italic]Hello1[/text]
[text color:=violet italic multiple]
Line1
Line2
[/text]
[img width:=32px height:=32px]https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png[/img]
[code lang:=cs]
public class ABC
{
    public string AA { get; set; }
}
[/code]
[code lang:=php]
function ABC()
{
    $a = 0;
    echo $a;
}
[/code]`;
    document.body.innerHTML = bbcode.render(text);
});
