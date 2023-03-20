<div align="center">
    <h1>@sveltinio/ts-utils</h1>
     <a href="https://github.com/sveltinio/ts-utils/blob/main/LICENSE" target="_blank">
        <img src="https://img.shields.io/badge/license-mit-blue?style=flat-square&logo=none" alt="license" />
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/package/@sveltinio/ts-utils" target="_blank"><img src="https://img.shields.io/npm/v/@sveltinio/ts-utils.svg?style=flat" alt="sveltinio/ts-utils NPM version badge" /></a>
</div>

A bunch of utilities in Typescript used by [Sveltin] based projects to deal with strings, urls, collections and dates.

## Installation

```bash
npm install -D @sveltinio/ts-utils

# or
pnpm add -D @sveltinio/ts-utils

# or
yarn add -D @sveltinio/ts-utils
```

## What's inside?

### Collections

| Name            | Description                                                                                 |
|:--------------- |:------------------------------------------------------------------------------------------- |
| `orderBy`       | Given a collection, an iteratee, and an order, returns a sorted collection by the iteratee. |
| `groupedByOne`  | Given a collection of objects, groups them by a property, returns an array of objects with the grouped items. |
| `groupedByMany` | Given a collection of objects, a property name, and an array of properties to filter out, returns a new array of objects with the property name as the key and the filtered properties as the value. |

### Dates

| Name                 | Description                                                                 |
|:-------------------- |:--------------------------------------------------------------------------- |
| `padTo2Digits`       | Given a number, returns a string that is the number padded to two digits.   |
| `dayOfMonthFromDate` | Given a date string in the format MM/DD/YYYY, returns the day of the month. |
| `formatDate`         | Given a date object, returns a string in the format DD/MM/YYYY.             |
| `monthShortFromDate` | Given a date string in the format MM/DD/YYYY, returns the short month name. |

### Strings

| Name                    | Description                                                           |
|:----------------------- |:--------------------------------------------------------------------- |
| `capitalizeFirstLetter` | Capitalizes first letter of the string and lowercase the rest.        |
| `capitalizeAll`         | Capitalizes first letters of each word in a string.                   |
| `removeTrailingSlash`   | Removes all trailing slashes from a string.                           |
| `toSlug`                | Removes all non-word characters, and replaces all spaces with dashes. |
| `toTitle`               | Replaces all dashes with spaces, and capitalizes all words.           |

### Urls

| Name           | Description                                                                      |
|:-------------- |:-------------------------------------------------------------------------------- |
| `canonicalURL` | Given a base URL and a pathname, returns a canonical URL.                        |
| `makeImagePath`| Makes the full qualified path to the image file.                                 |
| `defaultImage` | Makes the full qualified path to the default (images/logos/logo.png) image file. |

## License

Free and open-source software under the [MIT License](LICENSE)

[Sveltin]: https://github.com/sveltinio/sveltin