
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/teamdrumwork/wolf/blob/make/view/view.svg?raw=true' height='312'>
</p>

<h3 align='center'>wolf</h3>
<p align='center'>
  Link Text Standard Library Implementation
</p>

<br/>
<br/>
<br/>

### Welcome

The `wolf` library aims to be a very low-level implementation of the abstraction over programming language primitives. It is an implementation of [`moon`](https://github.com/teamdrumwork/moon).

That is, it implements the abstractions over basic "datatypes" like the string, integer, boolean, etc.. And also more complex but still basic data types like the list, array, map, etc.. It tries to normalize as much as possible to create a uniform interface across programming language environments. It doesn't delve into opinionated conventions too much, that is saved for the [`crow`](https://github.com/teamdrumwork/crow) project.

This project is to be validated against the moon, to make sure it adheres to the API specification. Basic type checking.

You typically won't use `wolf` directly, you should use [`base`](https://github.com/teamdrumwork/base) (still much a work in progress) for writing your daily code. The `base` project is the burgeoning entrypoint for doing stuff with link text.

### Relationships

| specification | implementation | description |
|:----:|:----:|:----|
| [`moon`](https://github.com/teamdrumwork/moon) | [`wolf`](https://github.com/teamdrumwork/wolf) | **Standard Library** |
| <a href="https://github.com/teamdrumwork/moon"><img src='https://github.com/teamdrumwork/moon/blob/make/view/moon.svg?raw=true' height='64'></a> | <a href="https://github.com/teamdrumwork/wolf"><img src='https://github.com/teamdrumwork/wolf/blob/make/view/view.svg?raw=true' height='64'></a> | These are the lowest-level datatypes and standards for abstracting away architectures in a basic programming language environment. |
| [`tree`](https://github.com/teamdrumwork/tree) | [`crow`](https://github.com/teamdrumwork/crow) | **Framework** |
| <a href="https://github.com/teamdrumwork/tree"><img src='https://github.com/teamdrumwork/tree/blob/make/view/view.svg?raw=true' height='64'></a> | <a href="https://github.com/teamdrumwork/crow"><img src='https://github.com/teamdrumwork/crow/blob/make/view/view.svg?raw=true' height='64'></a> | These are high-level framework components, which is an opinionated abstraction for common web app development paradigms. |

### License

Copyright 2022 <a href='https://drum.work'>DrumWork</a>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

### DrumWork

This is being developed by the folks at [DrumWork](https://drum.work), a California-based project for helping humanity master information and computation. DrumWork started off in the winter of 2008 as a spark of an idea, to forming a company 10 years later in the winter of 2018, to a seed of a project just beginning its development phases. It is entirely bootstrapped by working full time and running [Etsy](https://etsy.com/shop/mountbuild) and [Amazon](https://www.amazon.com/s?rh=p_27%3AMount+Build) shops. Also find us on [Facebook](https://www.facebook.com/teamdrumwork), [Twitter](https://twitter.com/teamdrumwork), and [LinkedIn](https://www.linkedin.com/company/teamdrumwork). Check out our other GitHub projects as well!
