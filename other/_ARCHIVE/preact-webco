# web componentes with preact and snowpack

## index.jsx

```jsx
  const Greeting = ({name = "World"}) => (
    <p>Hello, {name}!</p>
  );
  preactCE(Greeting, "x-greeting", ["name"]);
```

## index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="module">
    // import * as React from 'https://cdn.skypack.dev/preact';
    import * as React from 'https://cdn.skypack.dev/-/preact@v10.5.12-AUHDlG9c8v865CiuCz34/dist=es2020,mode=imports/optimized/preact.js';
    // import register from 'https://cdn.skypack.dev/preact-custom-element';
    import preactCE from 'https://cdn.skypack.dev/-/preact-custom-element@v4.2.1-9XWZzR4CIDbspqnjvd2L/dist=es2020,mode=imports/optimized/preact-custom-element.js';
    Object.assign(window, {React, preactCE});
    import('./index.js');
  </script>
</head>
<body>
  <h1>preact ce</h1>
  <x-greeting name="yey"></x-greeting>
</body>
</html>
```

## dev and build

Having `npm install -g snowpack`

- snowpack dev
- snowpack build






