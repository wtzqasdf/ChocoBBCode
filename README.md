# ChocoBBCode
The simple bbcode renderer.  
Using TypeScript to develop.

## Unlimited Front-end Frameworks...
Native JavaScript, Vue, React, Angular...  
(It will convert to html elements from bbcode.)

## How to use?
    import ChocoBBCode from './bbcode/ChocoBBCode';
    const bbcode = new ChocoBBCode();
    const html = bbcode.render('Your bbcode content');
    
## How to coding?
#### [ Text ]
1. color = red, blue, green or hex.
2. weight = bold, normal or number.
3. italic = only italic.
4. underline = only underline.
5. size = number. can use px, em or other unit after number.
6. multiple = the will change "span" as "pre"
###### For example:
    [text color:=red weight:=bold size:=24px underline italic]Hello World[/text]
    [text color:=blue weight:=bold size:=32px multiple]
    Hello
    World
    [/text]
    
#### [ Image ]
1. width = number, can use px, em or other unit after number.
2. height = number, can use px, em or other unit after number.
###### For example:
    [img width:=32px height:=32px]https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png[/img]
    
#### [ Link ]
1. color = red, blue, green or hex.
2. weight = bold, normal or number.
3. target = _blank, _self.
4. size = number. can use px, em or other unit after number.
5. href = url
###### For example:
    [link target:=_self href:=www.google.com size:=28px]I'm Link[/link]
    
#### [ Code (highlight.js) ]
1. lang = program language. cs, php, java...
###### For example:
    [code lang:=cs]
    public class ABC
    {
        public string AA { get; set; }
    }
    [/code]
