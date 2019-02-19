```js
/**
 * function showDbrVideoSmallTool
 * 
 * Please feel free to modfiy `dbrVideoSmallTool.js` and `dbrVideoSmallTool.css` to match your scenario.
 * 
 * | parameter        | type           | description
 * | ---------------- | -------------- | -----------
 * | *(return value)* | HTMLDivElement | 
 *     The element of the tool. You can put it somewhere else. By default it will be appended in body.
 * | ---------------- | -------------- | -----------
 * | callback         | function(txt)  | 
 *     It is called each time a reliable result is obtained.
 *     The same neighbour results would be regarded as one result.
 * | ---------------- | -------------- | -----------
 * | count            | number         | 
 *     if `count` is 0, the window would not automatically close. Default 0.
 *     if `count` == 1, the application will close the window after getting a reliable result.
 *     if the `count` > 1, the application will close the window after `count` reliable results are obtained.
 *     The same neighbour results would be regarded as one result.
 * | ---------------- | -------------- | -----------
 * | confidence       | number         | 
 *     A raw result, whose confidence equals or larger than the confidence, will be regarded as a reliable result. Dafault 30.
 * | ---------------- | -------------- | -----------
 * | styleObj         | object         | 
 *     A key-value style object to modify the style of `.dbrVideoSmallTool-outer`. 
 *     It is useful when you need to set the position or the size of the tool.
 * 
 *     e.g. `{postion: 'absolute', margin: '0', left: '200px', top: '100px', width: '200px', height: '160px'}`
 * 
 *     You may need some more custom styles to match your scenario.
 *     Please feel free to modfiy `dbrVideoSmallTool.js`(especially in `var html = ...`) and `dbrVideoSmallTool.css`.
 */
self.showDbrVideoSmallTool = function(callback, count, confidence, styleObj){/*...*/};
```