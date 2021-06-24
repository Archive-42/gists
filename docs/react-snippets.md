Renders an accordion menu with multiple collapsible content elements.

-   Define an `AccordionItem` component, that renders a `<button>` which
    is used to update the component and notify its parent via the
    `handleClick` callback.
-   Use the `isCollapsed` prop in `AccordionItem` to determine its
    appearance and set an appropriate `className`.
-   Define an `Accordion` component that uses the `useState()` hook to
    initialize the value of the `bindIndex` state variable to
    `defaultIndex`.
-   Filter `children` to remove unnecessary nodes except for
    `AccordionItem` by identifying the function's name.
-   Use `Array.prototype.map()` on the collected nodes to render the
    individual collapsible elements.
-   Define `changeItem`, which will be executed when clicking an
    `AccordionItem`'s `<button>`.
-   `changeItem` executes the passed callback, `onItemClick`, and
    updates `bindIndex` based on the clicked element.

::: {#cb1 .sourceCode}
``` {.sourceCode .css}
.accordion-item.collapsed {  display: none; }  .accordion-item.expanded {  display: block; }  .accordion-button {  display: block;  width: 100%; }

```js
const AccordionItem = ({ label, isCollapsed, handleClick, children }) => { return ( <> <button className=“accordion-button” onClick={handleClick}> {label} </button> <div className={accordion-item ${isCollapsed ? &quot;collapsed&quot; : &quot;expanded&quot;}} aria-expanded={isCollapsed} > {children} </div> </> ); };
const Accordion = ({ defaultIndex, onItemClick, children }) => { const [bindIndex, setBindIndex] = React.useState(defaultIndex);
const changeItem = (itemIndex) => { if (typeof onItemClick === “function”) onItemClick(itemIndex); if (itemIndex !== bindIndex) setBindIndex(itemIndex); }; const items = children.filter((item) => item.type.name === “AccordionItem”);
return ( <> {items.map(({ props }) => ( <AccordionItem isCollapsed={bindIndex !== props.index} label={props.label} handleClick={() => changeItem(props.index)} children={props.children} /> ))} </> ); };


ReactDOM.render(
  &lt;Accordion defaultIndex=&quot;1&quot; onItemClick={console.log}&gt;
    &lt;AccordionItem label=&quot;A&quot; index=&quot;1&quot;&gt;
      Lorem ipsum
    &lt;/AccordionItem&gt;
    &lt;AccordionItem label=&quot;B&quot; index=&quot;2&quot;&gt;
      Dolor sit amet
    &lt;/AccordionItem&gt;
  &lt;/Accordion&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders an alert component with `type` prop.

-   Use the `useState()` hook to create the `isShown` and `isLeaving`
    state variables and set both to `false` initially.
-   Define `timeoutId` to keep the timer instance for clearing on
    component unmount.
-   Use the `useEffect()` hook to update the value of `isShown` to
    `true` and clear the interval by using `timeoutId` when the
    component is unmounted.
-   Define a `closeAlert` function to set the component as removed from
    the DOM by displaying a fading out animation and set `isShown` to
    `false` via `setTimeout()`.

::: {#cb4 .sourceCode}
``` {.sourceCode .css}
@keyframes leave {  0% {  opacity: 1;  }  100% {  opacity: 0;  } }  .alert {  padding: 0.75rem 0.5rem;  margin-bottom: 0.5rem;  text-align: left;  padding-right: 40px;  border-radius: 4px;  font-size: 16px;  position: relative; }  .alert.warning {  color: #856404;  background-color: #fff3cd;  border-color: #ffeeba; }  .alert.error {  color: #721c24;  background-color: #f8d7da;  border-color: #f5c6cb; }  .alert.leaving {  animation: leave 0.5s forwards; }  .alert .close {  position: absolute;  top: 0;  right: 0;  padding: 0 0.75rem;  color: #333;  border: 0;  height: 100%;  cursor: pointer;  background: none;  font-weight: 600;  font-size: 16px; }  .alert .close:after {  content: “x”; }

```js
const Alert = ({ isDefaultShown = false, timeout = 250, type, message }) => { const [isShown, setIsShown] = React.useState(isDefaultShown); const [isLeaving, setIsLeaving] = React.useState(false);
let timeoutId = null;
React.useEffect(() => { setIsShown(true); return () => { clearTimeout(timeoutId); }; }, [isDefaultShown, timeout, timeoutId]);
const closeAlert = () => { setIsLeaving(true); timeoutId = setTimeout(() => { setIsLeaving(false); setIsShown(false); }, timeout); };
return ( isShown && ( <div className={alert ${type} ${isLeaving ? &quot;leaving&quot; : &quot;&quot;}} role=“alert” > <button className=“close” onClick={closeAlert} /> {message} </div> ) ); };


ReactDOM.render(
  &lt;Alert type=&quot;info&quot; message=&quot;This is info&quot; /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a string as plaintext, with URLs converted to appropriate link
elements.

-   Use `String.prototype.split()` and `String.prototype.match()` with a
    regular expression to find URLs in a string.
-   Return matched URLs rendered as `<a>` elements, dealing with missing
    protocol prefixes if necessary.
-   Render the rest of the string as plaintext.

::: {#cb3 .sourceCode}
``` {.sourceCode .js}
const AutoLink = ({ text }) =&gt; {
  const delimiter =
    /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&amp;=;%+?\-\\(\\)]*)/gi;

return (
&lt;&gt;
{text.split(delimiter).map((word) =&gt; {
const match = word.match(delimiter);
if (match) {
const url = match[0];
return (
&lt;a href={url.startsWith(&quot;http&quot;) ? url : `http://${url}`}&gt;{url}&lt;/a&gt;
);
}
return word;
})}
&lt;/&gt;
);
};
```
:::

------------------------------------------------------------------------

::: {#cb4 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(
  &lt;AutoLink text=&quot;foo bar baz http://example.org bar&quot; /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a link formatted to call a phone number (`tel:` link).

-   Use `phone` to create a `<a>` element with an appropriate `href`
    attribute.
-   Render the link with `children` as its content.

::: {#cb5 .sourceCode}
``` {.sourceCode .js}
const Callto = ({ phone, children }) =&gt; {
  return &lt;a href={`tel:${phone}`}&gt;{children}&lt;/a&gt;;
};
```
:::

------------------------------------------------------------------------

::: {#cb6 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(
  &lt;Callto phone=&quot;+302101234567&quot;&gt;Call me!&lt;/Callto&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a carousel component.

-   Use the `useState()` hook to create the `active` state variable and
    give it a value of `0` (index of the first item).
-   Use the `useEffect()` hook to update the value of `active` to the
    index of the next item, using `setTimeout`.
-   Compute the `className` for each carousel item while mapping over
    them and applying it accordingly.
-   Render the carousel items using `React.cloneElement()` and pass down
    `…rest` along with the computed `className`.

::: {#cb11 .sourceCode}
``` {.sourceCode .css}
.carousel {  position: relative; }  .carousel-item {  position: absolute;  visibility: hidden; }  .carousel-item.visible {  visibility: visible; }

```js
const Carousel = ({ carouselItems, …rest }) => { const [active, setActive] = React.useState(0); let scrollInterval = null;
React.useEffect(() => { scrollInterval = setTimeout(() => { setActive((active + 1) % carouselItems.length); }, 2000); return () => clearTimeout(scrollInterval); });
return ( <div className=“carousel”> {carouselItems.map((item, index) => { const activeClass = active === index ? " visible" : ""; return React.cloneElement(item, { …rest, className: carousel-item${activeClass}, }); })} </div> ); };


ReactDOM.render(
  &lt;Carousel
    carouselItems={[
      &lt;div&gt;carousel item 1&lt;/div&gt;,
      &lt;div&gt;carousel item 2&lt;/div&gt;,
      &lt;div&gt;carousel item 3&lt;/div&gt;,
    ]}
  /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a component with collapsible content.

-   Use the `useState()` hook to create the `isCollapsed` state variable
    with an initial value of `collapsed`.
-   Use the `<button>` to change the component's `isCollapsed` state and
    the content of the component, passed down via `children`.
-   Determine the appearance of the content, based on `isCollapsed` and
    apply the appropriate `className`.
-   Update the value of the `aria-expanded` attribute based on
    `isCollapsed` to make the component accessible.

::: {#cb14 .sourceCode}
``` {.sourceCode .css}
.collapse-button {  display: block;  width: 100%; }  .collapse-content.collapsed {  display: none; }  .collapsed-content.expanded {  display: block; }

```js
const Collapse = ({ collapsed, children }) => { const [isCollapsed, setIsCollapsed] = React.useState(collapsed);
return ( <> <button className=“collapse-button” onClick={() => setIsCollapsed(!isCollapsed)} > {isCollapsed ? “Show” : “Hide”} content </button> <div className={collapse-content ${isCollapsed ? &quot;collapsed&quot; : &quot;expanded&quot;}} aria-expanded={isCollapsed} > {children} </div> </> ); };


ReactDOM.render(
  &lt;Collapse&gt;
    &lt;h1&gt;This is a collapse&lt;/h1&gt;
    &lt;p&gt;Hello world!&lt;/p&gt;
  &lt;/Collapse&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a controlled `<input>` element that uses a callback function to
inform its parent about value updates.

-   Use the `value` passed down from the parent as the controlled input
    field's value.
-   Use the `onChange` event to fire the `onValueChange` callback and
    send the new value to the parent.
-   The parent must update the input field's `value` prop in order for
    its value to change on user input.

::: {#cb9 .sourceCode}
``` {.sourceCode .js}
const ControlledInput = ({ value, onValueChange, ...rest }) =&gt; {
  return (
    &lt;input
      value={value}
      onChange={({ target: { value } }) =&gt; onValueChange(value)}
      {...rest}
    /&gt;
  );
};
```
:::

------------------------------------------------------------------------

::: {#cb10 .sourceCode}
``` {.sourceCode .js}
const Form = () =&gt; {
  const [value, setValue] = React.useState(&quot;&quot;);

return (
&lt;ControlledInput
type=&quot;text&quot;
placeholder=&quot;Insert some text here...&quot;
value={value}
onValueChange={setValue}
/&gt;
);
};

ReactDOM.render(&lt;Form /&gt;, document.getElementById(&quot;root&quot;));
```
:::

------------------------------------------------------------------------

Renders a countdown timer that prints a message when it reaches zero.

-   Use the `useState()` hook to create a state variable to hold the
    time value, initialize it from the props and destructure it into its
    components.
-   Use the `useState()` hook to create the `paused` and `over` state
    variables, used to prevent the timer from ticking if it's paused or
    the time has run out.
-   Create a method `tick`, that updates the time values based on the
    current value (i.e. decreasing the time by one second).
-   Create a method `reset`, that resets all state variables to their
    initial states.
-   Use the the `useEffect()` hook to call the `tick` method every
    second via the use of `setInterval()` and use `clearInterval()` to
    clean up when the component is unmounted.
-   Use `String.prototype.padStart()` to pad each part of the time array
    to two characters to create the visual representation of the timer.

::: {#cb11 .sourceCode}
``` {.sourceCode .js}
const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) =&gt; {
  const [paused, setPaused] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);

const tick = () =&gt; {
if (paused || over) return;
if (h === 0 &amp;&amp; m === 0 &amp;&amp; s === 0) setOver(true);
else if (m === 0 &amp;&amp; s === 0) {
setTime([h - 1, 59, 59]);
} else if (s == 0) {
setTime([h, m - 1, 59]);
} else {
setTime([h, m, s - 1]);
}
};

const reset = () =&gt; {
setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
setPaused(false);
setOver(false);
};

React.useEffect(() =&gt; {
const timerID = setInterval(() =&gt; tick(), 1000);
return () =&gt; clearInterval(timerID);
});

return (
&lt;div&gt;
&lt;p&gt;{`${h.toString().padStart(2, &quot;0&quot;)}:${m.toString().padStart(2, &quot;0&quot;)}:${s .toString() .padStart(2, &quot;0&quot;)}`}&lt;/p&gt;
&lt;div&gt;{over ? &quot;Time&#39;s up!&quot; : &quot;&quot;}&lt;/div&gt;
&lt;button onClick={() =&gt; setPaused(!paused)}&gt;
{paused ? &quot;Resume&quot; : &quot;Pause&quot;}
&lt;/button&gt;
&lt;button onClick={() =&gt; reset()}&gt;Restart&lt;/button&gt;
&lt;/div&gt;
);
};
```
:::

------------------------------------------------------------------------

::: {#cb12 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(
  &lt;CountDown hours={1} minutes={45} /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a list of elements from an array of primitives.

-   Use the value of the `isOrdered` prop to conditionally render an
    `<ol>` or a `<ul>` list.
-   Use `Array.prototype.map()` to render every item in `data` as a
    `<li>` element with an appropriate `key`.

::: {#cb13 .sourceCode}
``` {.sourceCode .js}
const DataList = ({ isOrdered = false, data }) =&gt; {
  const list = data.map((val, i) =&gt; &lt;li key={`${i}_${val}`}&gt;{val}&lt;/li&gt;);
  return isOrdered ? &lt;ol&gt;{list}&lt;/ol&gt; : &lt;ul&gt;{list}&lt;/ul&gt;;
};
```
:::

------------------------------------------------------------------------

::: {#cb14 .sourceCode}
``` {.sourceCode .js}
const names = [&quot;John&quot;, &quot;Paul&quot;, &quot;Mary&quot;];
ReactDOM.render(&lt;DataList data={names} /&gt;, document.getElementById(&quot;root&quot;));
ReactDOM.render(
  &lt;DataList data={names} isOrdered /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a table with rows dynamically created from an array of
primitives.

-   Render a `<table>` element with two columns (`ID` and `Value`).
-   Use `Array.prototype.map()` to render every item in `data` as a
    `<tr>` element with an appropriate `key`.

::: {#cb15 .sourceCode}
``` {.sourceCode .js}
const DataTable = ({ data }) =&gt; {
  return (
    &lt;table&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          &lt;th&gt;ID&lt;/th&gt;
          &lt;th&gt;Value&lt;/th&gt;
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        {data.map((val, i) =&gt; (
          &lt;tr key={`${i}_${val}`}&gt;
            &lt;td&gt;{i}&lt;/td&gt;
            &lt;td&gt;{val}&lt;/td&gt;
          &lt;/tr&gt;
        ))}
      &lt;/tbody&gt;
    &lt;/table&gt;
  );
};
```
:::

------------------------------------------------------------------------

::: {#cb16 .sourceCode}
``` {.sourceCode .js}
const people = [&quot;John&quot;, &quot;Jesse&quot;];
ReactDOM.render(&lt;DataTable data={people} /&gt;, document.getElementById(&quot;root&quot;));
```
:::

------------------------------------------------------------------------

Renders a file drag and drop component for a single file.

-   Create a ref, called `dropRef` and bind it to the component's
    wrapper.
-   Use the `useState()` hook to create the `drag` and `filename`
    variables, initialized to `false` and `’’` respectively.
-   The variables `dragCounter` and `drag` are used to determine if a
    file is being dragged, while `filename` is used to store the dropped
    file's name.
-   Create the `handleDrag`, `handleDragIn`, `handleDragOut` and
    `handleDrop` methods to handle drag and drop functionality.
-   `handleDrag` prevents the browser from opening the dragged file,
    `handleDragIn` and `handleDragOut` handle the dragged file entering
    and exiting the component, while `handleDrop` handles the file being
    dropped and passes it to `onDrop`.
-   Use the `useEffect()` hook to handle each of the drag and drop
    events using the previously created methods.

::: {#cb25 .sourceCode}
``` {.sourceCode .css}
.filedrop {  min-height: 120px;  border: 3px solid #d3d3d3;  text-align: center;  font-size: 24px;  padding: 32px;  border-radius: 4px; }  .filedrop.drag {  border: 3px dashed #1e90ff; }  .filedrop.ready {  border: 3px solid #32cd32; }

```js
const FileDrop = ({ onDrop }) => { const [drag, setDrag] = React.useState(false); const [filename, setFilename] = React.useState(""); let dropRef = React.createRef(); let dragCounter = 0;
const handleDrag = (e) => { e.preventDefault(); e.stopPropagation(); };
const handleDragIn = (e) => { e.preventDefault(); e.stopPropagation(); dragCounter++; if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setDrag(true); };
const handleDragOut = (e) => { e.preventDefault(); e.stopPropagation(); dragCounter–; if (dragCounter === 0) setDrag(false); };
const handleDrop = (e) => { e.preventDefault(); e.stopPropagation(); setDrag(false); if (e.dataTransfer.files && e.dataTransfer.files.length > 0) { onDrop(e.dataTransfer.files[0]); setFilename(e.dataTransfer.files[0].name); e.dataTransfer.clearData(); dragCounter = 0; } };
React.useEffect(() => { let div = dropRef.current; div.addEventListener(“dragenter”, handleDragIn); div.addEventListener(“dragleave”, handleDragOut); div.addEventListener(“dragover”, handleDrag); div.addEventListener(“drop”, handleDrop); return () => { div.removeEventListener(“dragenter”, handleDragIn); div.removeEventListener(“dragleave”, handleDragOut); div.removeEventListener(“dragover”, handleDrag); div.removeEventListener(“drop”, handleDrop); }; });
return ( <div ref={dropRef} className={ drag ? “filedrop drag” : filename ? “filedrop ready” : “filedrop” } > {filename && !drag ? <div>{filename}</div> : <div>Drop a file here!</div>} </div> ); };


ReactDOM.render(
  &lt;FileDrop onDrop={console.log} /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a textarea component with a character limit.

-   Use the `useState()` hook to create the `content` state variable and
    set its value to that of `value` prop, trimmed down to `limit`
    characters.
-   Create a method `setFormattedContent`, which trims the content down
    to `limit` characters and memoize it, using the `useCallback()`
    hook.
-   Bind the `onChange` event of the `<textarea>` to call
    `setFormattedContent` with the value of the fired event.

::: {#cb18 .sourceCode}
``` {.sourceCode .js}
const LimitedTextarea = ({ rows, cols, value, limit }) =&gt; {
  const [content, setContent] = React.useState(value.slice(0, limit));

const setFormattedContent = React.useCallback(
(text) =&gt; {
setContent(text.slice(0, limit));
},
[limit, setContent]
);

return (
&lt;&gt;
&lt;textarea
rows={rows}
cols={cols}
onChange={(event) =&gt; setFormattedContent(event.target.value)}
value={content}
/&gt;
&lt;p&gt;
{content.length}/{limit}
&lt;/p&gt;
&lt;/&gt;
);
};
```
:::

------------------------------------------------------------------------

::: {#cb19 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(
  &lt;LimitedTextarea limit={32} value=&quot;Hello!&quot; /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a textarea component with a word limit.

-   Use the `useState()` hook to create a state variable, containing
    `content` and `wordCount`, using the `value` prop and `0` as the
    initial values respectively.
-   Use the `useCallback()` hooks to create a memoized function,
    `setFormattedContent`, that uses `String.prototype.split()` to turn
    the input into an array of words.
-   Check if the result of applying `Array.prototype.filter()` combined
    with `Boolean` has a `length` longer than `limit` and, if so, trim
    the input, otherwise return the raw input, updating state
    accordingly in both cases.
-   Use the `useEffect()` hook to call the `setFormattedContent` method
    on the value of the `content` state variable during the initial
    render.
-   Bind the `onChange` event of the `<textarea>` to call
    `setFormattedContent` with the value of `event.target.value`.

::: {#cb20 .sourceCode}
``` {.sourceCode .js}
const LimitedWordTextarea = ({ rows, cols, value, limit }) =&gt; {
  const [{ content, wordCount }, setContent] = React.useState({
    content: value,
    wordCount: 0,
  });

const setFormattedContent = React.useCallback(
(text) =&gt; {
let words = text.split(&quot; &quot;).filter(Boolean);
if (words.length &gt; limit) {
setContent({
content: words.slice(0, limit).join(&quot; &quot;),
wordCount: limit,
});
} else {
setContent({ content: text, wordCount: words.length });
}
},
[limit, setContent]
);

React.useEffect(() =&gt; {
setFormattedContent(content);
}, []);

return (
&lt;&gt;
&lt;textarea
rows={rows}
cols={cols}
onChange={(event) =&gt; setFormattedContent(event.target.value)}
value={content}
/&gt;
&lt;p&gt;
{wordCount}/{limit}
&lt;/p&gt;
&lt;/&gt;
);
};
```
:::

------------------------------------------------------------------------

::: {#cb21 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(
  &lt;LimitedWordTextarea limit={5} value=&quot;Hello there!&quot; /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a spinning loader component.

-   Render an SVG, whose `height` and `width` are determined by the
    `size` prop.
-   Use CSS to animate the SVG, creating a spinning animation.

::: {#cb32 .sourceCode}
``` {.sourceCode .css}
.loader {  animation: rotate 2s linear infinite; }  @keyframes rotate {  100% {  transform: rotate(360deg);  } }  .loader circle {  animation: dash 1.5s ease-in-out infinite; }  @keyframes dash {  0% {  stroke-dasharray: 1, 150;  stroke-dashoffset: 0;  }  50% {  stroke-dasharray: 90, 150;  stroke-dashoffset: -35;  }  100% {  stroke-dasharray: 90, 150;  stroke-dashoffset: -124;  } }

```js
const Loader = ({ size }) => { return ( <svg className=“loader” xmlns=“http://www.w3.org/2000/svg” width={size} height={size} viewBox=“0 0 24 24” fill=“none” stroke=“currentColor” strokeWidth=“2” strokeLinecap=“round” strokeLinejoin=“round” > <circle cx=“12” cy=“12” r=“10” /> </svg> ); };


ReactDOM.render(&lt;Loader size={24} /&gt;, document.getElementById(&quot;root&quot;));
```
:::

------------------------------------------------------------------------

Renders a link formatted to send an email (`mailto:` link).

-   Use the `email`, `subject` and `body` props to create a `<a>`
    element with an appropriate `href` attribute.
-   Use `encodeURIcomponent` to safely encode the `subject` and `body`
    into the link URL.
-   Render the link with `children` as its content.

::: {#cb23 .sourceCode}
``` {.sourceCode .js}
const Mailto = ({ email, subject = &quot;&quot;, body = &quot;&quot;, children }) =&gt; {
  let params = subject || body ? &quot;?&quot; : &quot;&quot;;
  if (subject) params += `subject=${encodeURIComponent(subject)}`;
  if (body) params += `${subject ? &quot;&amp;&quot; : &quot;&quot;}body=${encodeURIComponent(body)}`;

return &lt;a href={`mailto:${email}${params}`}&gt;{children}&lt;/a&gt;;
};
```
:::

------------------------------------------------------------------------

::: {#cb24 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(
  &lt;Mailto email=&quot;foo@bar.baz&quot; subject=&quot;Hello &amp; Welcome&quot; body=&quot;Hello world!&quot;&gt;
    Mail me!
  &lt;/Mailto&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a table with rows dynamically created from an array of objects
and a list of property names.

-   Use `Object.keys()`, `Array.prototype.filter()`,
    `Array.prototype.includes()` and `Array.prototype.reduce()` to
    produce a `filteredData` array, containing all objects with the keys
    specified in `propertyNames`.
-   Render a `<table>` element with a set of columns equal to the amount
    of values in `propertyNames`.
-   Use `Array.prototype.map()` to render each value in the
    `propertyNames` array as a `<th>` element.
-   Use `Array.prototype.map()` to render each object in the
    `filteredData` array as a `<tr>` element, containing a `<td>` for
    each key in the object.

*This component does not work with nested objects and will break if
there are nested objects inside any of the properties specified in
`propertyNames`*

::: {#cb25 .sourceCode}
``` {.sourceCode .js}
const MappedTable = ({ data, propertyNames }) =&gt; {
  let filteredData = data.map((v) =&gt;
    Object.keys(v)
      .filter((k) =&gt; propertyNames.includes(k))
      .reduce((acc, key) =&gt; ((acc[key] = v[key]), acc), {})
  );
  return (
    &lt;table&gt;
      &lt;thead&gt;
        &lt;tr&gt;
          {propertyNames.map((val) =&gt; (
            &lt;th key={`h_${val}`}&gt;{val}&lt;/th&gt;
          ))}
        &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
        {filteredData.map((val, i) =&gt; (
          &lt;tr key={`i_${i}`}&gt;
            {propertyNames.map((p) =&gt; (
              &lt;td key={`i_${i}_${p}`}&gt;{val[p]}&lt;/td&gt;
            ))}
          &lt;/tr&gt;
        ))}
      &lt;/tbody&gt;
    &lt;/table&gt;
  );
};
```
:::

------------------------------------------------------------------------

::: {#cb26 .sourceCode}
``` {.sourceCode .js}
const people = [
  { name: &quot;John&quot;, surname: &quot;Smith&quot;, age: 42 },
  { name: &quot;Adam&quot;, surname: &quot;Smith&quot;, gender: &quot;male&quot; },
];
const propertyNames = [&quot;name&quot;, &quot;surname&quot;, &quot;age&quot;];
ReactDOM.render(
  &lt;MappedTable data={people} propertyNames={propertyNames} /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a Modal component, controllable through events.

-   Define `keydownHandler`, a method which handles all keyboard events
    and is used to call `onClose` when the `Esc` key is pressed.
-   Use the `useEffect()` hook to add or remove the `keydown` event
    listener to the `document`, calling `keydownHandler` for every
    event.
-   Add a styled `<span>` element that acts as a close button, calling
    `onClose` when clicked.
-   Use the `isVisible` prop passed down from the parent to determine if
    the modal should be displayed or not.
-   To use the component, import `Modal` only once and then display it
    by passing a boolean value to the `isVisible` attribute.

::: {#cb39 .sourceCode}
``` {.sourceCode .css}
.modal {  position: fixed;  top: 0;  bottom: 0;  left: 0;  right: 0;  width: 100%;  z-index: 9999;  display: flex;  align-items: center;  justify-content: center;  background-color: rgba(0, 0, 0, 0.25);  animation-name: appear;  animation-duration: 300ms; }  .modal-dialog {  width: 100%;  max-width: 550px;  background: white;  position: relative;  margin: 0 20px;  max-height: calc(100vh - 40px);  text-align: left;  display: flex;  flex-direction: column;  overflow: hidden;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);  -webkit-animation-name: animatetop;  -webkit-animation-duration: 0.4s;  animation-name: slide-in;  animation-duration: 0.5s; }  .modal-header, .modal-footer {  display: flex;  align-items: center;  padding: 1rem; }  .modal-header {  border-bottom: 1px solid #dbdbdb;  justify-content: space-between; }  .modal-footer {  border-top: 1px solid #dbdbdb;  justify-content: flex-end; }  .modal-close {  cursor: pointer;  padding: 1rem;  margin: -1rem -1rem -1rem auto; }  .modal-body {  overflow: auto; }  .modal-content {  padding: 1rem; }  @keyframes appear {  from {  opacity: 0;  }  to {  opacity: 1;  } }  @keyframes slide-in {  from {  transform: translateY(-150px);  }  to {  transform: translateY(0);  } }

```js
const Modal = ({ isVisible = false, title, content, footer, onClose }) => { const keydownHandler = ({ key }) => { switch (key) { case “Escape”: onClose(); break; default: } };
React.useEffect(() => { document.addEventListener(“keydown”, keydownHandler); return () => document.removeEventListener(“keydown”, keydownHandler); });
return !isVisible ? null : ( <div className=“modal” onClick={onClose}> <div className=“modal-dialog” onClick={(e) => e.stopPropagation()}> <div className=“modal-header”> <h3 className=“modal-title”>{title}</h3> <span className=“modal-close” onClick={onClose}> &times; </span> </div> <div className=“modal-body”> <div className=“modal-content”>{content}</div> </div> {footer && <div className=“modal-footer”>{footer}</div>} </div> </div> ); };


const App = () =&gt; {
  const [isModal, setModal] = React.useState(false);
  return (
    &lt;&gt;
      &lt;button onClick={() =&gt; setModal(true)}&gt;Click Here&lt;/button&gt;
      &lt;Modal
        isVisible={isModal}
        title=&quot;Modal Title&quot;
        content={&lt;p&gt;Add your content here&lt;/p&gt;}
        footer={&lt;button&gt;Cancel&lt;/button&gt;}
        onClose={() =&gt; setModal(false)}
      /&gt;
    &lt;/&gt;
  );
};

ReactDOM.render(&lt;App /&gt;, document.getElementById(&quot;root&quot;));
```
:::

------------------------------------------------------------------------

Renders a checkbox list that uses a callback function to pass its
selected value/values to the parent component.

-   Use the `useState()` hook to create the `data` state variable and
    use the `options` prop to initialize its value.
-   Create a `toggle` function that uses the spread operator (`…`) and
    `Array.prototype.splice()` to update the `data` state variable and
    call the `onChange` callback with any `checked` options.
-   Use `Array.prototype.map()` to map the `data` state variable to
    individual `<input type=“checkbox”>` elements, each one wrapped in a
    `<label>`, binding the `onClick` handler to the `toggle` function.

::: {#cb28 .sourceCode}
``` {.sourceCode .js}
const MultiselectCheckbox = ({ options, onChange }) =&gt; {
  const [data, setData] = React.useState(options);

const toggle = (index) =&gt; {
const newData = [...data];
newData.splice(index, 1, {
label: data[index].label,
checked: !data[index].checked,
});
setData(newData);
onChange(newData.filter((x) =&gt; x.checked));
};

return (
&lt;&gt;
{data.map((item, index) =&gt; (
&lt;label key={item.label}&gt;
&lt;input
readOnly
type=&quot;checkbox&quot;
checked={item.checked || false}
onClick={() =&gt; toggle(index)}
/&gt;
{item.label}
&lt;/label&gt;
))}
&lt;/&gt;
);
};
```
:::

------------------------------------------------------------------------

::: {#cb29 .sourceCode}
``` {.sourceCode .js}
const options = [{ label: &quot;Item One&quot; }, { label: &quot;Item Two&quot; }];

ReactDOM.render(
&lt;MultiselectCheckbox
options={options}
onChange={(data) =&gt; {
console.log(data);
}}
/&gt;,
document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a password input field with a reveal button.

-   Use the `useState()` hook to create the `shown` state variable and
    set its value to `false`.
-   When the `<button>` is clicked, execute `setShown`, toggling the
    `type` of the `<input>` between `“text”` and `“password”`.

::: {#cb30 .sourceCode}
``` {.sourceCode .js}
const PasswordRevealer = ({ value }) =&gt; {
  const [shown, setShown] = React.useState(false);
  return (
    &lt;&gt;
      &lt;input type={shown ? &quot;text&quot; : &quot;password&quot;} value={value} /&gt;
      &lt;button onClick={() =&gt; setShown(!shown)}&gt;Show/Hide&lt;/button&gt;
    &lt;/&gt;
  );
};
```
:::

------------------------------------------------------------------------

::: {#cb31 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(&lt;PasswordRevealer /&gt;, document.getElementById(&quot;root&quot;));
```
:::

------------------------------------------------------------------------

Renders a button that animates a ripple effect when clicked.

-   Use the `useState()` hook to create the `coords` and `isRippling`
    state variables for the pointer's coordinates and the animation
    state of the button respectively.
-   Use a `useEffect()` hook to change the value of `isRippling` every
    time the `coords` state variable changes, starting the animation.
-   Use `setTimeout()` in the previous hook to clear the animation after
    it's done playing.
-   Use a `useEffect()` hook to reset `coords` whenever the `isRippling`
    state variable is `false.`
-   Handle the `onClick` event by updating the `coords` state variable
    and calling the passed callback.

::: {#cb46 .sourceCode}
``` {.sourceCode .css}
.ripple-button {  border-radius: 4px;  border: none;  margin: 8px;  padding: 14px 24px;  background: #1976d2;  color: #fff;  overflow: hidden;  position: relative;  cursor: pointer; }  .ripple-button > .ripple {  width: 20px;  height: 20px;  position: absolute;  background: #63a4ff;  display: block;  content: "";  border-radius: 9999px;  opacity: 1;  animation: 0.9s ease 1 forwards ripple-effect; }  @keyframes ripple-effect {  0% {  transform: scale(1);  opacity: 1;  }  50% {  transform: scale(10);  opacity: 0.375;  }  100% {  transform: scale(35);  opacity: 0;  } }  .ripple-button > .content {  position: relative;  z-index: 2; }

```js
const RippleButton = ({ children, onClick }) => { const [coords, setCoords] = React.useState({ x: -1, y: -1 }); const [isRippling, setIsRippling] = React.useState(false);
React.useEffect(() => { if (coords.x !== -1 && coords.y !== -1) { setIsRippling(true); setTimeout(() => setIsRippling(false), 300); } else setIsRippling(false); }, [coords]);
React.useEffect(() => { if (!isRippling) setCoords({ x: -1, y: -1 }); }, [isRippling]);
return ( <button className=“ripple-button” onClick={(e) => { const rect = e.target.getBoundingClientRect(); setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top }); onClick && onClick(e); }} > {isRippling ? ( <span className=“ripple” style={{ left: coords.x, top: coords.y, }} /> ) : ( "" )} <span className=“content”>{children}</span> </button> ); };


ReactDOM.render(
  &lt;RippleButton onClick={(e) =&gt; console.log(e)}&gt;Click me&lt;/RippleButton&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders an uncontrolled `<select>` element that uses a callback function
to pass its value to the parent component.

-   Use the the `selectedValue` prop as the `defaultValue` of the
    `<select>` element to set its initial value..
-   Use the `onChange` event to fire the `onValueChange` callback and
    send the new value to the parent.
-   Use `Array.prototype.map()` on the `values` array to create an
    `<option>` element for each passed value.
-   Each item in `values` must be a 2-element array, where the first
    element is the `value` of the item and the second one is the
    displayed text for it.

::: {#cb33 .sourceCode}
``` {.sourceCode .js}
const Select = ({ values, onValueChange, selectedValue, ...rest }) =&gt; {
  return (
    &lt;select
      defaultValue={selectedValue}
      onChange={({ target: { value } }) =&gt; onValueChange(value)}
      {...rest}
    &gt;
      {values.map(([value, text]) =&gt; (
        &lt;option key={value} value={value}&gt;
          {text}
        &lt;/option&gt;
      ))}
    &lt;/select&gt;
  );
};
```
:::

------------------------------------------------------------------------

::: {#cb34 .sourceCode}
``` {.sourceCode .js}
const choices = [
  [&quot;grapefruit&quot;, &quot;Grapefruit&quot;],
  [&quot;lime&quot;, &quot;Lime&quot;],
  [&quot;coconut&quot;, &quot;Coconut&quot;],
  [&quot;mango&quot;, &quot;Mango&quot;],
];
ReactDOM.render(
  &lt;Select
    values={choices}
    selectedValue=&quot;lime&quot;
    onValueChange={(val) =&gt; console.log(val)}
  /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders an uncontrolled range input element that uses a callback
function to pass its value to the parent component.

-   Set the `type` of the `<input>` element to `“range”` to create a
    slider.
-   Use the `defaultValue` passed down from the parent as the
    uncontrolled input field's initial value.
-   Use the `onChange` event to fire the `onValueChange` callback and
    send the new value to the parent.

::: {#cb35 .sourceCode}
``` {.sourceCode .js}
const Slider = ({
  min = 0,
  max = 100,
  defaultValue,
  onValueChange,
  ...rest
}) =&gt; {
  return (
    &lt;input
      type=&quot;range&quot;
      min={min}
      max={max}
      defaultValue={defaultValue}
      onChange={({ target: { value } }) =&gt; onValueChange(value)}
      {...rest}
    /&gt;
  );
};
```
:::

------------------------------------------------------------------------

::: {#cb36 .sourceCode}
``` {.sourceCode .js}
ReactDOM.render(
  &lt;Slider onValueChange={(val) =&gt; console.log(val)} /&gt;,
  document.getElementById(&quot;root&quot;)
);
```
:::

------------------------------------------------------------------------

Renders a star rating component.

-   Define a component, called `Star` that will render each individual
    star with the appropriate appearance, based on the parent
    component's state.
-   In the `StarRating` component, use the `useState()` hook to define
    the `rating` and `selection` state variables with the appropriate
    initial values.
-   Create a method, `hoverOver`, that updates `selected` according to
    the provided `event`, using the .`data-star-id` attribute of the
    event's target or resets it to `0` if called with a `null` argument.
-   Use `Array.from()` to create an array of `5` elements and
    `Array.prototype.map()` to create individual `<Star>` components.
-   Handle the `onMouseOver` and `onMouseLeave` events of the wrapping
    element using `hoverOver` and the `onClick` event using `setRating`.

::: {#cb53 .sourceCode}
``` {.sourceCode .css}
.star {  color: #ff9933;  cursor: pointer; }

```js
const Star = ({ marked, starId }) => { return ( <span data-star-id={starId} className=“star” role=“button”> {marked ? "

```
:::
