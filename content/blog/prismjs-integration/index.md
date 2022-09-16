I needed syntax highlighting in this project and decided to use [PrismJS](https://prismjs.com/). It’s a great library and supports a lot of different languages so I thought it would be a good fit. I ran into a few hiccups during the integration that I thought might help others. The issue was that I wanted to include the package as a dev resource in my package.json file and control which languages load. Their documentation for NPM is geared towards using it in a Node project but I wanted to use it with Webpack on the client. 

The first issue I ran into was that I was getting an error in the client when I imported the library and tried to define the languages I wanted to be included. After looking over Github issues and StackOverflow questions, I found that I needed to include only the core package and then I could add languages. 

```javascript
// Make sure to include prism-core rather than full package using 'prismjs'.
import Prism from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-php-extras';
import 'prismjs/components/prism-scss';
```

In addition to selecting the languages to load, I also had to ensure all the dependent language files were loaded. In order to figure this out, you need to look in the language component to see which dependencies are required. The [Javascript component](https://github.com/PrismJS/prism/blob/master/components/prism-javascript.js) extends the `clike` language component and the PHP component relies on `markup-templating` so you'll need to include these dependencies as well. 
