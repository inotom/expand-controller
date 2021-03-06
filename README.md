# expand-controller

The open / close state of the operation target element is switched by the click event of the handler element.

When switching elements, `aria-expanded` and `aria-hidden` attributes are automatically set.


## Demo

[Demo](https://sandbox.serendip.ws/expand-controller.html)


## Install

```
$ npm install -D @inotom/expand-controller
```


## Usage

### Browser

```html
<script src="expand-controller.min.js"></script>
<script>
ExpandController.expandController();
</script>
```


### Node.js

```js
import { expandController } from '@inotom/expand-controller';
expandController();
```


### HTML

Assign `js-expand-controller` class to handler element.

Set `id` of target element to be operated in `aria-controls` attribute of handler element.

```html
<button class="js-expand-controller" aria-controls="exc-1">
  Lorem ipsum
</button>
<div id="exc-1">
  Lorem ipsum dolor sit amet
</div>
```

To start in the open state, specify `true` in the `aria-expanded` attribute.

```html
<button class="js-expand-controller" aria-controls="exc-1" aria-expanded="true">
  Lorem ipsum
</button>
<div id="exc-1">
  Lorem ipsum dolor sit amet
</div>
```

When the height style is not changed, specify `false` in the `data-enable-height-style` attribute of the target element.

```html
<button class="js-expand-controller" aria-controls="exc-1">
  Lorem ipsum
</button>
<div id="exc-1" data-enable-height-style="false">
  Lorem ipsum dolor sit amet
</div>
```

To operate multiple target elements, specify the `id` of the target element in `aria-controls` separated by a space.

```html
<button class="js-expand-controller" aria-controls="exc-1 exc-2">
  Lorem ipsum
</button>
<div id="exc-1">
  Lorem ipsum dolor sit amet
</div>
<div id="exc-2">
  Ut enim ad minim veniam
</div>
```

For elements other than `button`, if the `role="button"` attribute is added, it operates with the `Enter/Space` key press event.

```html
<div class="js-expand-controller" aria-controls="exc-1" role="button" tabindex="0">
  Lorem ipsum
</div>
<div id="exc-1">
  Lorem ipsum dolor sit amet
</div>
```

When the value of `prevent` or `stop` is set in `data-disable-events` attribute in anchor element, etc., `preventDefault` and `stopPropagation` are executed.

```html
<a class="js-expand-controller" href="#" aria-controls="exc-1" role="button" tabindex="0" data-disable-events="prevent stop">
  Lorem ipsum
</a>
<div id="exc-1">
  Lorem ipsum dolor sit amet
</div>
```


## Options

```js
expandController({
  // selector name (default: .js-expand-controller)
  selector: '.js-custom-expand-controller',
});
```


## License

MIT


## Author

inotom
