import ChocoBBCode from './bbcode/ChocoBBCode';

let bbcode = new ChocoBBCode();
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