# 9 fancy title design in CSS you need to learn now

> Learn how to EASILY create fancy looking title with only CSS

**Style 1: Line text**

![Image for post](https://miro.medium.com/max/60/1*qh8otFfZQQ60V2LepbfP8A.png?q=20)

![Image for post](https://miro.medium.com/max/4416/1*qh8otFfZQQ60V2LepbfP8A.png)

The first style we would create is an outlined text, with a 3d text shape behind it. In order to create an “outline” for text, we would need to use the CSS property: `-webkit-text-stroke-width` and `-webkit-text-stroke-color` . These two property allow us to create an outline and give it the desired color.

For the 3d text shape, we could use multiple layer of `text-shadow` property. Since text-shadow can be stacked, in this example, we could add many layers of pink shadow, where each layer offsetting the previous one for 1px in x and y direction. Giving the whole text-shadow a “3D” shape.

Let jump into the code.

HTML (as promise, one div):

<div class='line-text'>foreign terrace</div>

SCSS:

> I create some global variable to store the color and the size, $extra-large is 110px. For the color, check my codepen

This is a fairly easy style, we don’t even need to use a before or after pseudo-element. This is a good place to start as it teaches us two very important property in styling text, `text-stroke-width` and `text-shadow`. Say you want a more “3d-looking” text, you could easily add more layer of shadow to it, like so:

![Image for post](https://miro.medium.com/max/60/1*19aEylsHnaRZBCrndxW4eA.png?q=20)

![Image for post](https://miro.medium.com/max/2996/1*19aEylsHnaRZBCrndxW4eA.png)

Applying 20px of box shadow

**Style 2: Neon text**

![Image for post](https://miro.medium.com/max/60/1*2-6Srs31u8h6ZEBQ8VWr6A.png?q=20)

![Image for post](https://miro.medium.com/max/5368/1*2-6Srs31u8h6ZEBQ8VWr6A.png)

The next style we will create is neon. The text mimic a neon sign by creating lighting effect, also using a more “written” font style.

The first thing to do is to pick a suitable font for the neon text. I picked “Pacifico” (free font on google font) as it has a nice rounded border, and continuous stroke style. Pretty much like the sign made from a neon tube.

![Image for post](https://miro.medium.com/max/60/1*sSysOkBk0DJJvdNSZcgxqQ.png?q=20)

![Image for post](https://miro.medium.com/max/1744/1*sSysOkBk0DJJvdNSZcgxqQ.png)

I believe you have guessed, we would apply `-webkit-text-stroke-width` and `-webkit-text-stroke-color` again as our base for the “neon”, `text-shadow` would be used again for the “glowing” light around the neon. If you look carefully, there are one more set of “outlined-text”, in black color behind the neon. That is the drop shadow of the neon-tube. And we would use a :after pseudo-element to create it.

HTML:

<div class='neon-text'>underlying wire</div>

SCSS:

> one thing annoying is we need to set content of the pseudo-element manually. I tried to use `content: inherit` but it seems only possible when you set the content in your parent. As I want the HTML to have the text (for demo purpose), it is not really helpful for me.

I am not doing animation this time, but if you want, you could probably do some cool trick like turning the light on and off, changing it color gradiently and so on.

**Style 3: Stripe text**

![Image for post](https://miro.medium.com/max/60/1*knpwC9n4XLr-z9GG0K73Rw.png?q=20)

![Image for post](https://miro.medium.com/max/4160/1*knpwC9n4XLr-z9GG0K73Rw.png)

This style has a lot of thing in common with the first style. Firstly, it also has a white border. And secondly, it has a 3d shaped text shadow. We already know how to use `-webkit-text-stroke-width` ,`-webkit-text-stroke-color` and`text-shadow` to create such pattern. One thing different is the colorful stripe pattern of the text.

There are no “linear-gradient” available for text (as of June 2020, let me know if it is a thing now!), so we would need a workaround. Instead of making the text itself having color, we will first create a background, and then use the `background-clip: text` property. This property will “clip” the div by the shape of your text, with a combination of making your text-color transparent, you will end up with text colored with whatever background you are using.

![Image for post](https://miro.medium.com/max/60/1*UnQUNxtvHOel4W4hTz8n9w.png?q=20)

![Image for post](https://miro.medium.com/max/2060/1*UnQUNxtvHOel4W4hTz8n9w.png)

Same thing could be apply to image background, so you could basically give your text whatever texture

We would also use another font family to complement the overall style. The one I picked is “Catamaran” (also free on google font).

HTML:

<div class='stripe-text'>quick turnover</div>

SCSS:

> You may notice I put the background and `background-clip: text` in the :after element, instead of the parent. The reason for that is **“background-clip” clip EVERYTHING inside the element**, include :before and :after element. So applying it there **would cause the 3d shadow being clipped as well**. In fact, the HTML don’t need to have the text at all. I am just adding it there for better sizing (as both after and before element are absolute positioned to parent) and demo purpose.

**Style 4: Cut text**

![Image for post](https://miro.medium.com/max/60/1*byXm5gNu5VXKWdZ9sjZE_Q.png?q=20)

![Image for post](https://miro.medium.com/max/3216/1*byXm5gNu5VXKWdZ9sjZE_Q.png)

In all of the style, this one is actually my favourite. It is very different from the other style and our old friend `-webkit-text-stroke-width` ,`-webkit-text-stroke-color` and`text-shadow` won’t be helping us this time (sorry about that).

In this style, we have a “cut” in the text, making the upper part of text sliding down in the cut angle. The whole design is also very clean and sharp.

The concept for creating this style is very simply, we make two pseudo element (before and after), and give them two `clip-path`, where the two clip path together form a complete rectangle:

![Image for post](https://miro.medium.com/max/60/1*PA8pm52sLxNIeKyEI9zWuA.png?q=20)

![Image for post](https://miro.medium.com/max/2840/1*PA8pm52sLxNIeKyEI9zWuA.png)

And then we just add a little bit offset for the upper part element to the right and downward, making the text slide down in the “cut” direction.

HTML:

<div class='cut-text'>stolen hour</div>

SCSS:

> For the same reason mentioned in last style, we cannot clip path on the parent directly. and you may also notice in the clip-path, I used 110% instead of 100%. The reason being that the text getting clipped at the very end due to using “italic” style. it is solved by changing the clip border from 100% to a higher number.

**Style 5: Cyber text**

![Image for post](https://miro.medium.com/max/60/1*YObcSEoVzWZ_KaHG4_S3lg.png?q=20)

![Image for post](https://miro.medium.com/max/4148/1*YObcSEoVzWZ_KaHG4_S3lg.png)

Despite the fancy name, this style is the easiest. We will be using :before and :after pseudo-element, and transparent text-color overlaying on top of each other to create this “funky” effect. The text look kind of blur but actually it is completely straight if you look closely, it is the mixture of the color and minor offset giving it such behavior.

HTML:

<div class='cyber-text'>digital highway</div>

SCSS:

> The SCSS function rgba() allow us to quickly get a less opaque version of your base color, and make experimenting of different color combination easy. (There are also darken()/lighten()/adjust-hue() and soooo much more)

**Style 6: Wood-text**

![Image for post](https://miro.medium.com/max/60/1*lDBHarduK4EUC41wHNdcvQ.png?q=20)

![Image for post](https://miro.medium.com/max/3900/1*lDBHarduK4EUC41wHNdcvQ.png)

This one is basically the same as the “stripe-text” style, as we are again using `background-clip: text` property. As mentioned, with background-clip property you could easily create any pattern and texture of text, given that you have a background image.

One little twist of this style is the inner “shadow” of the text. It is in fact created with an after element with (again) `-webkit-text-stroke-width` ,`-webkit-text-stroke-color` property.

HTML:

<div class='wood-text'>suitable villa</div>

SCSS:

> Looking back to it now, this one is my least favourite one. Mainly due to the background image I picked doesn’t really resemble wood. (in fact the highlight and shading of it make it looks more like metallic) For this type of text style, background image is the soul of it, and could ruin it pretty easily. Don’t make the same mistake I did and take your time to pick the perfect picture.

**Style 7: Comic-text**

![Image for post](https://miro.medium.com/max/60/1*-PluYzXMrwt09anUuBne6Q.png?q=20)

![Image for post](https://miro.medium.com/max/3824/1*-PluYzXMrwt09anUuBne6Q.png)

This comic looking style text resemble old fashion comic text. Everything is heavily outlined, and the stroke are overly decorated. To start with, we will first need a font for this style. I picked “Molle”, again (guess you figure out the pattern by now) a free google font.

![Image for post](https://miro.medium.com/max/60/1*Q2vMDKRQTPIXfs1EKcTGAQ.png?q=20)

![Image for post](https://miro.medium.com/max/1832/1*Q2vMDKRQTPIXfs1EKcTGAQ.png)

For the style itself, we will use our old friend `-webkit-text-stroke-width` ,`-webkit-text-stroke-color` property (welcome back!).We would use all of our available HTML element for the style, the parent div, before, and after pseudo element.

HTML:

<div class='comic-text'>square tube!</div>

SCSS:

> I am limiting myself to do it in one div only, but you can definitely adding more layer if you want to, just stack the element on top of eachother

**Style 8: horizontal-cut-text**

![Image for post](https://miro.medium.com/max/60/1*_ZOGCf8dCQAFXHk7pMM42A.png?q=20)

![Image for post](https://miro.medium.com/max/4712/1*_ZOGCf8dCQAFXHk7pMM42A.png)

This style also has the word cut in it, but we won’t actually cut it. Instead, we will use a background gradient and `background-clip: text` property again. We will stack two background, one with color at the top 50%, transparent at the bottom 50%, and another background a white and transparent stripe.

On top of the text, we would also add a text-shadow, to give more shape to it. Using a shadow on top of the text with dark background, resulting it having a fake “highlight”, which is the original color of the text.

HTML:

<div class='horizontal-cut-text'>vague minority</div>

SCSS:

> Again, another one without any after and before element. In case you don’t know already, you can stack background color as much as you want to. Using background property alone could already give us a lot of stunning pattern. If you are interested and want to learn more, you can check out this CSS3 Pattern Gallery: [https://leaverou.github.io/css3patterns/](https://leaverou.github.io/css3patterns/)

**Style 9: Double-border-text**

![Image for post](https://miro.medium.com/max/60/1*bnZB7hU-3oN6O6R2vnTlgw.png?q=20)

![Image for post](https://miro.medium.com/max/4540/1*bnZB7hU-3oN6O6R2vnTlgw.png)

The final style, you guessed it, is a combination of `-webkit-text-stroke-width` and pseudo-element. This is basically the same as the comic style, just with a different font, more consistent and aligned text and color theme.

Since it is very similar, I will jump into the code right now.

HTML:

<div class='double-border-text'>entire volume</div>

SCSS:

> One side note regarding `text-stroke-width`, it seems all powerful but has it own limitation. If the font you are using don’t have a beautiful and continuous stroke, your will get a “broken” stroke from the property. Also, be aware that if you set the stroke width too high, there may be unexpected “edge” from the stroke of the text, like below:

![Image for post](https://miro.medium.com/max/52/1*8D039RUBG9sKBsWt7wA6tw.png?q=20)

![Image for post](https://miro.medium.com/max/724/1*8D039RUBG9sKBsWt7wA6tw.png)

the edge is coming from the middle stroke of the “E”


[Source](https://medium.com/front-end-weekly/9-fancy-title-design-in-css-you-need-to-learn-now-75dd24b48ca)