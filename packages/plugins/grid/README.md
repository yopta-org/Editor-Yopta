# Grid plugin

Grid is plugin for Yoopta-Editor

### Installation

```bash
yarn add @yoopta/grid
```

### Usage

```jsx
import Grid from '@yoopta/grid';

const plugins = [Grid];

const Editor = () => {
  return <YooptaEditor plugins={plugins} />;
};
```

### Default classnames

- .yoopta-grid
- .yoopta-grid-theme-['default' | 'success' | 'warning' | 'error' | 'info']

### Default options

```js
const Grid = new YooptaPlugin({
  options: {
    display: {
      title: 'Grid',
      description: 'Make writing stand out',
    },
    shortcuts: ['<'],
  },
});
```

### How to extend

```tsx
const plugins = [
  Grid.extend({
    renders: {
      grid: (props) => <YourCustomComponent {...props} />
    },
    options: {
      shortcuts: [`<your custom shortcuts>`],
      display: {
        title: `<your custom title>`,
        description: `<your custom description>`,
      },
      HTMLAttributes: {
        className: '<your classname>',
        // ...other HTML attributes
      },
    },
  });
];
```
