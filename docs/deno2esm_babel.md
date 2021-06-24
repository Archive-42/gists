This is a solution using Babel (node)

## babel requirements

    npm install --save-dev @babel/core @babel/cli @babel/plugin-transform-typescript babel-plugin-replace-import-extensions

## babel.config.js

::: {#cb2 .sourceCode}

```{.sourceCode .js}
module.exports = function (api) {
  //api.cache(true);
  return {
    presets : [],
    plugins: [
      "@babel/plugin-transform-typescript",
      [ "replace-import-extensions",  {"\\.ts": '.js'} ]
    ]
  };
}
```

:::

## Convert

    babel --extensions ".ts" src/*.ts -d build

## optionally for node

Add `build/package.json` for Node to load esm imports with .js
extensions

::: {#cb4 .sourceCode}

```{.sourceCode .json}
/* build/package.json */
{"type":"module"}
```

:::
