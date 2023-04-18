<div align="center">
    <h1>@sveltinio/ts-utils</h1>
     <a href="https://github.com/sveltinio/ts-utils/blob/main/LICENSE" target="_blank">
        <img src="https://img.shields.io/badge/license-mit-blue?style=flat-square&logo=none" alt="license" />
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/package/@sveltinio/ts-utils" target="_blank"><img src="https://img.shields.io/npm/v/@sveltinio/ts-utils.svg?style=flat" alt="sveltinio/ts-utils NPM version badge" /></a>
</div>

A bunch of utilities in pure Typescript created to be used across [Sveltin] based projects and its [packages] to deal with strings, urls, objects, collections and dates.

> Sveltin is not mandatory and you could find something useful into.

## Installation

```bash
npm install -D @sveltinio/ts-utils

# or
pnpm add -D @sveltinio/ts-utils

# or
yarn add -D @sveltinio/ts-utils
```

## What's inside?

```javascript
 import { isEmpty } from '@sveltinio/ts-utils';
```

| Name    | Description                                           |
|:--------|:----------------------------------------------------- |
| isEmpty | The function checks if a given value is empty or not. |

### Collections

```javascript
import {...} from '@sveltinio/ts-utils/collections';
```

| Name          | Description                                                                                 |
|:------------- |:------------------------------------------------------------------------------------------- |
| orderBy       | Given a collection, an iteratee, and an order, returns a sorted collection by the iteratee. |
| groupedByOne  | Given a collection of objects, groups them by a property, returns an array of objects with the grouped items. |
| groupedByMany | Given a collection of objects, a property name, and an array of properties to filter out, returns a new array of objects with the property name as the key and the filtered properties as the value. |
| pickRandom    | Picks a random value from an array of numbers, strings, or booleans. |
| contains      | Checks if a given value is present in a collection of numbers or strings. |

### Dates

```javascript
import {...} from '@sveltinio/ts-utils/dates';
```

| Name               | Description                                                                 |
|:------------------ |:--------------------------------------------------------------------------- |
| padTo2Digits       | Given a number, returns a string that is the number padded to two digits.   |
| dayOfMonthFromDate | Given a date string in the format MM/DD/YYYY, returns the day of the month. |
| formatDate         | Given a date object, returns a string in the format DD/MM/YYYY.             |
| formatDateISO      | Given a date object, returns a string in the format YYYY-MM-DD.             |
| monthShortFromDate | Given a date string in the format MM/DD/YYYY, returns the short month name. |

### Objects

```javascript
import {...} from '@sveltinio/ts-utils/objects';
```

| Name              | Description                                                               |
|:----------------- |:------------------------------------------------------------------------- |
| isPlainObject     | Checks if a given value is a plain javasctipt object.                     |
| checkPropValue    | Checks if a given object has a specified property with a specified value. |
| checkRequiredProp | Checks if a given object has all the required properties.                 |
| objToCssVars      | Converts a given object into a string of CSS variables.                   |

### Paths

```javascript
import {...} from '@sveltinio/ts-utils/paths';
```

| Name        | Description                                                                               |
|:----------- |:----------------------------------------------------------------------------------------- |
| dirname     | Returns the directory name from a given file path.                                        |
| filename    | Returns the filename from a given file path.                                              |
| isImage     | Checks if a given string is a valid image file name (jpg, jpeg, png, gif, webp, or avif). |
| lastSegment | Returns the last segment of a given path string.                                          |

### Strings

```javascript
import {...} from '@sveltinio/ts-utils/strings';
```

| Name                 | Description                                                                            |
|:-------------------- |:-------------------------------------------------------------------------------------- |
| capitalize           | Capitalizes first letter of the string and lowercase the rest.                         |
| capitalizeAll        | Capitalizes first letters of each word in a string.                                    |
| uppercase            | Uppercase the given string.                                                            |
| lowercase            | Lowercase the given string.                                                            |
| removeTrailingSlash  | Removes all trailing slashes from a string.                                            |
| textBetween          | Returns the substring between start and end delimiters.                                |
| toSlug               | Removes all non-word characters, and replaces all spaces with dashes.                  |
| toTitle              | Replaces all dashes with spaces, and capitalizes all words.                            |
| toSnakeCase          | Converts a given string to snake case format.                                          |
| toKebabCase          | Converts a given string to kebab case format.                                          |
| isCommaSeparated     | Checks if a given string contains a comma-separated list.                              |
| toCommaSeparated     | Replaces all whitespace and semicolons with commas to return a comma-separated string. |
| isHex                | Checks if a given string is a valid hexadecimal color code.                            |
| getHexValue          | Rreturns either the substring after the first character (if the string is a valid hex value) or an error message. |
| removeFirstOccurence | Removes the first occurrence of a specified string from a given text.                  |

### Urls

```javascript
import {...} from '@sveltinio/ts-utils/urls';
```

| Name               | Description                                                                        |
|:------------------ |:---------------------------------------------------------------------------------- |
| isUrl              | Checks if a given string is a valid URL.                                           |
| canonicalUrl       | Given a base URL and a pathname, returns a canonical URL.                          |
| makeImagePath      | Makes the full qualified path to the image file.                                   |
| parentUrl          | Given an URL, returns the parent url of it (w/o the last segment of the pathname). |
| parentPathname     | Given an URL, returns the parent pathname (w/o the last segment of the it).        |
| pathSegments       | Extracts the path segments from a valid URL and returns them as an array.          |

## License

Free and open-source software under the [MIT License](LICENSE)

[Sveltin]: https://github.com/sveltinio/sveltin
[packages]: https://github.com/sveltinio/components-library
