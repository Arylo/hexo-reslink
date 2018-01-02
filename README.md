# hexo-reslink
Automatically create resource links

[![node](https://img.shields.io/node/v/hexo-reslink.svg?style=flat-square)](https://www.npmjs.com/package/hexo-reslink)
[![David](https://img.shields.io/david/Arylo/hexo-reslink.svg?style=flat-square)][REPO]
[![Travis](https://img.shields.io/travis/Arylo/hexo-reslink.svg?style=flat-square)](https://travis-ci.org/Arylo/hexo-reslink)
[![Coveralls](https://img.shields.io/coveralls/github/Arylo/hexo-reslink.svg?style=flat-square)](https://coveralls.io/github/Arylo/hexo-reslink)
[![Author](https://img.shields.io/badge/Author-AryloYeung-blue.svg?style=flat-square)](https://github.com/arylo)
[![license](https://img.shields.io/github/license/Arylo/hexo-reslink.svg?style=flat-square)][REPO]

[![NPM](https://nodei.co/npm/hexo-reslink.png)](https://nodei.co/npm/hexo-reslink/)

## Installation

```shell
npm install hexo-reslink -S
```

## Example

Here is content of `a.md`

```markdown
The npm:hexo is a very nice framework.
```

After process of `hexo-reslink` and before `render`

`a.md` will be transformed as:

```markdown
The [hexo](https://www.npmjs.com/package/hexo) is a very nice framework.
```

This is a resource's url which capturing during `before_post_render` event

## License (MIT)

```
Copyright (C) 2017 by AryloYeung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

[REPO]: https://github.com/Arylo/hexo-reslink