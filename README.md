<div align="center">
    <h1>@sveltinio/ts-utils</h1>
    <a href="https://www.npmjs.com/package/@sveltinio/ts-utils" target="_blank"><img src="https://img.shields.io/npm/v/@sveltinio/ts-utils.svg?style=flat" alt="sveltinio/ts-utils NPM version badge" /></a>
    &nbsp;
    <img src="./coverage.svg" alt="sveltinio/ts-utils code coverage" />
     &nbsp;
    <a href="https://ts-utils.sveltin.io" target="_blank"><img src="https://img.shields.io/badge/api-tsdoc-a855f7" alt="sveltinio/ts-utils documentation" /></a>
    &nbsp;
    <a href="https://github.com/sveltinio/ts-utils/blob/main/LICENSE" target="_blank">
        <img src="https://img.shields.io/badge/license-mit-blue?style=flat&logo=none" alt="license" />
    </a>
</div>

A bunch of common utilities in pure Typescript to deal with primitives, strings, urls, objects, collections, dates etc.

> The package has been created to make my life easier with the requirements of [Sveltin] based projects and its [packages]. Anyhow, Sveltin is definitely not mandatory and you could find something fitting your needs.

## Installation

```bash
npm install @sveltinio/ts-utils
# or
pnpm add @sveltinio/ts-utils
# or
yarn add @sveltinio/ts-utils
```

## Usage

The package supports ES Module and Common JS formats.

### ESM

```javascript
import { isString, isRegExp } from '@sveltinio/ts-utils/is';
import { contains, uniq } from '@sveltinio/ts-utils/collections';
import { isEmpty, camelToKebab } from '@sveltinio/ts-utils';
// ...
```

### CJS

```javascript
const { hasProperty, hasPropertyValue } = require('@sveltinio/ts-utils/objects')
```

## Type-Safe Error Handling

Except the functions returning a `boolean` value, the others mainly return a `Result` type that represents either success (`Ok`) or failure (`Err`) from [neverthrow] for a [type-safe error handling].

```typescript
// from neverthrow docs
type Result<T, E>
  = Ok<T, E>  // contains a success value of type T
  | Err<T, E> // contains a failure value of type E
```

The ways to access the return value from a `Result` type may vary based on the use-case and your programming style. Below some samples for quick reference:

```javascript
import { toKebabCase } from '@sveltinio/ts-utils/strings';

toKebabCase('hello world').value;
// => "hello-world"

const result1 = toKebabCase('hello world');
if (result1.isOk()) {
  console.log(result1.value); // => "hello-world"
}

const result2 = toKebabCase('hello world').match(
  (str) => str, // => "hello-world"
  (err) => `${err.message}`
);
console.log(result2);

toKebabCase(2)
  .map((str) => console.log(str))
  .mapErr((err) => {
    throw new Error(err.message); // => Error: [strings.toKebabCase] Expected string value as input
  });
```

> Refer to the [neverthrow documentation] for the full picture.

## What's inside?

### Is

Type guard utilities helping with [primitive] values and basic objects. Read the [docs](https://ts-utils.sveltin.io/modules/is.html).

```javascript
import { ... } from '@sveltinio/ts-utils/is';
```

<br/>

| Name          | Description                                          |
|:--------------|:-----------------------------------------------------|
| isBool        | Checks if a given value is of type `boolean`         |
| isNumber      | Checks if a given value is of type `number`          |
| isBigInt      | Checks if a given value is of type `bigint`          |
| isString      | Checks if a given value is of type `string`          |
| isArray       | Checks if a given value is an array                  |
| isObject      | Checks if a given value is an object                 |
| isPlainObject | Checks if a given value is a plain JavaScript object |
| isFunction    | Checks if a given value is of type `function`        |
| isSymbol      | Checks if a given value is of type `symbol`          |
| isDate        | Checks if a given value is a valid `Date` object     |
| isRegExp      | Checks if a given value is a valid `RegExp` object   |
| isDefined     | Checks if a given value is defined and not null      |
| isTruthy      | Checks if a given value is a [truthy] value          |
| isNullish     | Checks if a value is null or undefined               |
| isNull        | Checks if a given value is null                      |
| isUndefined   | Checks if a given value is undefined                 |
| isEmpty       | Checks if a given value is empty or not              |

### Collections

Some utilities to deal with arrays. Read the [docs](https://ts-utils.sveltin.io/modules/collections.html).

```javascript
import { ... } from '@sveltinio/ts-utils/collections';
```

<br/>

| Name              | Description                                                                                         |
|:----------------- |:--------------------------------------------------------------------------------------------------- |
| sortBy            | Sorts an array of objects based on a specified property and order                                   |
| groupedByOne      | (1:1) Groups an array of objects by a specified property and returns an array of grouped objects    |
| groupedByMany     | (1:many) Groups an array of objects by a specified property and returns an array of grouped objects |
| pickRandom        | Picks random values from an array of numbers or strings                                             |
| shuffle           | Shuffles the elements of an array of number, or string values randomly                              |
| shuffleByProperty | Shuffles an array of plain JavaScript objects by the specified property                             |
| contains          | Checks if an array contains a given value or an array of values                                     |
| uniq              | Removes duplicates from an array of numbers or strings                                              |

### Colors

Some utilities to deal with hex color strings. Read the [docs](https://ts-utils.sveltin.io/colors/is.html).

```javascript
import { ... } from '@sveltinio/ts-utils/colors';
```

<br/>

| Name           | Description                                                                 |
|:-------------- |:--------------------------------------------------------------------------- |
| isHex          | Checks if a given string is a valid hexadecimal color code                  |
| getHexValue    | Returns either the substring after the first character (if the string is a valid hex value) or an error message |
| randomHexColor | Returns a string representing a random hex color                            |

### CSS

The `CSSHelper` class is a utility class that provides convenient methods for manipulating CSS classes on HTML elements. Read the [docs](https://ts-utils.sveltin.io/module/css.html).

```javascript
import { CSSHelper } from '@sveltinio/ts-utils/css';
```

<br/>

| Method Name   | Description                                        |
| :------------ | :------------------------------------------------- |
| hasClass      | Checks if an HTML element has a specific CSS class |
| addClass      | Adds a CSS class to an HTML element                |
| removeClass   | Removes a CSS class from an HTML element           |
| toggleClass   | Toggles a CSS class on an HTML element             |
| addClasses    | Adds multiple CSS classes to an HTML element       |
| removeClasses | Removes multiple CSS classes from an HTML element  |

### Dates

Some utilities to deal with javascript `Date`objects. Read the [docs](https://ts-utils.sveltin.io/modules/dates.html).

```javascript
import { ... } from '@sveltinio/ts-utils/dates';
```

<br/>

| Name          | Description                                                                |
|:------------- |:-------------------------------------------------------------------------- |
| padTo2Digits  | Given a number, returns a string that is the number padded to two digits   |
| dayOfMonth    | Given a date string in the format MM/DD/YYYY, returns the day of the month |
| formatDate    | Given a date object, returns a string in the format DD/MM/YYYY             |
| formatDateISO | Given a date object, returns a string in the format YYYY-MM-DD             |
| monthShort    | Given a date string in the format MM/DD/YYYY, returns the short month name |

### Objects

Some utilities to deal with javascript objects, their properties and values. Read the [docs](https://ts-utils.sveltin.io/modules/objects.html).

```javascript
import { ... } from '@sveltinio/ts-utils/objects';
```

<br/>

| Name                   | Description                                                                       |
|:---------------------- |:--------------------------------------------------------------------------------- |
| hasProperty            | Checks if a plain JavaScript object has a specified property                      |
| hasProperties          | Checks if an object has all the specified properties                              |
| hasPropertyValue       | Checks if an object has the specified property with the given value and same type |
| hasPropertiesWithValue | Checks if an object has the specified properties with the given values            |
| merge                  | Recursively merges two objects of compatible types                                |
| getPropertyValue       | Gets the value of a property on an object                                         |
| mapToCssVars           | Returns a CSS variable string from a plain object with key-value pairs            |

### Paths

Some utilities to deal with path strings. Read the [docs](https://ts-utils.sveltin.io/modules/paths.html).

The functions do not interface with the real file system but they are used to extract some information from the given path string. It means not ensuring e.g. a file exists or a folder is a real folder on the disk. For that, simply use what already [exists](https://nodejs.org/api/path.html).

> Some look useless at first glance but they are not for Sveltin project requirements.

```javascript
import { ... } from '@sveltinio/ts-utils/paths';
```

<br/>

| Name        | Description                                                                              |
|:----------- |:---------------------------------------------------------------------------------------- |
| isDir       | Checks if a given path is a directory                                                    |
| isFile      | Checks if a given path is a file path                                                    |
| dirname     | Returns the directory name from a given file path                                        |
| filename    | Returns the filename from a given file path                                              |
| isImage     | Checks if a given string is a valid image file name (jpg, jpeg, png, gif, webp, or avif) |
| lastSegment | Returns the last segment of a given path string                                          |

### Strings

Some utilities to deal with strings and string conversions. Read the [docs](https://ts-utils.sveltin.io/modules/strings.html).

```javascript
import { ... } from '@sveltinio/ts-utils/strings';
```

<br/>

| Name                 | Description                                                                           |
|:-------------------- |:------------------------------------------------------------------------------------- |
| normalize            | Normalizes a string by replacing non-word characters with a space character           |
| capitalize           | Capitalizes first letter of the string and lowercase the rest                         |
| capitalizeAll        | Capitalizes first letters of each word in a string                                    |
| uppercase            | Converts a string to uppercase                                                        |
| lowercase            | Converts a string to lowercase                                                        |
| removeTrailingSlash  | Removes all trailing slashes from a string                                            |
| textBetween          | Returns the substring between start and end delimiters                                |
| toSlug               | Removes all non-word characters, and replaces all spaces with dashes                  |
| toTitle              | Replaces all dashes with spaces, and capitalizes all words                            |
| toSnakeCase          | Converts a string to snake_case format                                                |
| toKebabCase          | Converts a string to kebab-case format                                                |
| toCamelCase          | Converts a string to camelCase format                                                 |
| toPascalCase         | Converts a string to PascalCase format                                                |
| camelToSnake         | Converts a camelCase string to snake_case format                                       |
| camelToKebab         | Converts a camelCase string to kebab-case format                                      |
| isCommaSeparated     | Checks if a given string contains a comma-separated list                              |
| toCommaSeparated     | Replaces all whitespace and semicolons with commas to return a comma-separated string |
| removeFirstOccurence | Removes the first occurrence of a specified string from a given text.                 |

### Urls

Some utilities to deal with urls. Read the [docs](https://ts-utils.sveltin.io/modules/urls.html).

> Some look useless at first glance but they are not for Sveltin project requirements.

```javascript
import { ... } from '@sveltinio/ts-utils/urls';
```

<br/>

| Name           | Description                                                                       |
|:-------------- |:--------------------------------------------------------------------------------- |
| isUrl          | Checks if a given string is a valid URL                                           |
| canonicalUrl   | Given a base URL and a pathname, returns a canonical URL                          |
| makeImagePath  | Makes the full qualified path to the image file                                   |
| parentUrl      | Given an URL, returns the parent url of it (w/o the last segment of the pathname) |
| parentPathname | Given an URL, returns the parent pathname (w/o the last segment of the it)        |
| pathSegments   | Extracts the path segments from a valid URL and returns them as an array          |

## License

Free and open-source software under the [MIT License](LICENSE)

<!-- resources -->
[Sveltin]: https://github.com/sveltinio/sveltin
[packages]: https://github.com/sveltinio/components-library
[neverthrow]: https://github.com/supermacro/neverthrow
[type-safe error handling]: https://gdelgado.ca/type-safe-error-handling-in-typescript.html
[neverthrow documentation]: https://github.com/supermacro/neverthrow#api-documentation
[truthy]: https://developer.mozilla.org/en-US/docs/Glossary/Truthy
[primitive]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values