<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<p align='center'>
  <img src='https://github.com/tunebond/wolf.link/blob/make/view/view.svg?raw=true' height='312'>
</p>

<h3 align='center'>wolf.link</h3>
<p align='center'>
  Base Link Standard Library Implementation
</p>

<br/>
<br/>
<br/>

## Welcome

The `wolf.link` library aims to be a very low-level implementation of the abstraction over programming language primitives. It is an implementation of [`moon.link`](https://github.com/tunebond/moon.link).

That is, it implements the abstractions over basic "datatypes" like the string, integer, boolean, etc.. And also more complex but still basic data types like the list, array, map, etc.. It tries to normalize as much as possible to create a uniform interface across programming language environments. It doesn't delve into opinionated conventions too much, that is saved for the [`crow.link`](https://github.com/tunebond/crow.link) project. It also doesn't do common but more complex things which have more variability like handling files, http, etc.. It literally just deals with the base data structures that are pretty hardened and don't change/evolve that often.

This project is to be validated against the moon, to make sure it adheres to the API specification. Basic type checking.

You typically won't use `wolf.link` directly, you should use [`base.link`](https://github.com/tunebond/base.link) (still much a work in progress) for writing your daily code. The `base.link` project is the burgeoning entrypoint for doing stuff with link text.

The tests in `wolf.link` are testing our implementations of basic programming data types and functions against runtime environments like JavaScript, Rust, and Swift.

## Basic Datatypes

| form   | common name     |
| :----- | :-------------- |
| `code` | bit             |
| `comb` | float / decimal |
| `date` | datetime        |
| `line` | array           |
| `mark` | integer         |
| `task` | function        |
| `text` | string          |
| `wave` | boolean         |
| `list` | list            |
| `tree` | tree            |
| `mesh` | graph           |
| `site` | object          |
| `hash` | map             |

## Extended Datatypes

| form                 | common name |
| :------------------- | :---------- |
| `b-plus-tree`        | b+ tree     |
| `bloom-filter`       |             |
| `queue`              |             |
| `stack`              |             |
| `unique-list`        | set         |
| `matrix`             |             |
| `matrix-2d`          |             |
| `matrix-3d`          |             |
| `matrix-4d`          |             |
| `skip-list`          |             |
| `binary-search-tree` |             |

## Relationships

|                                                                   specification                                                                    |                                                                   implementation                                                                   | description                                                                                                                        |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------- |
|                                                [`moon.link`](https://github.com/tunebond/moon.link)                                                |                                                [`wolf.link`](https://github.com/tunebond/wolf.link)                                                | **Standard Library**                                                                                                               |
| <a href="https://github.com/tunebond/moon.link"><img src='https://github.com/tunebond/moon.link/blob/make/view/moon.svg?raw=true' height='64'></a> | <a href="https://github.com/tunebond/wolf.link"><img src='https://github.com/tunebond/wolf.link/blob/make/view/view.svg?raw=true' height='64'></a> | These are the lowest-level datatypes and standards for abstracting away architectures in a basic programming language environment. |
|                                                [`tree.link`](https://github.com/tunebond/tree.link)                                                |                                                [`crow.link`](https://github.com/tunebond/crow.link)                                                | **Framework**                                                                                                                      |
| <a href="https://github.com/tunebond/tree.link"><img src='https://github.com/tunebond/tree.link/blob/make/view/view.svg?raw=true' height='64'></a> | <a href="https://github.com/tunebond/crow.link"><img src='https://github.com/tunebond/crow.link/blob/make/view/view.svg?raw=true' height='64'></a> | These are high-level framework components, which is an opinionated abstraction for common web app development paradigms.           |

## License

Copyright 2022-2023 <a href='https://tune.bond'>TuneBond</a>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

## TuneBond

This is being developed by the folks at [TuneBond](https://tune.bond), a California-based project for helping humanity master information and computation. TuneBond started off in the winter of 2008 as a spark of an idea, to forming a company 10 years later in the winter of 2018, to a seed of a project just beginning its development phases. It is entirely bootstrapped by working full time and running [Etsy](https://etsy.com/shop/tunebond) and [Amazon](https://www.amazon.com/s?rh=p_27%3AMount+Build) shops. Also find us on [Facebook](https://www.facebook.com/tunebond), [Twitter](https://twitter.com/tunebond), and [LinkedIn](https://www.linkedin.com/company/tunebond). Check out our other GitHub projects as well!
