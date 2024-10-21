# AD-BS Date Converter: Seamless Conversion Between Gregorian and Bikram Sambat Calendars

This package provides utility functions to convert dates from AD (Gregorian) to BS (Bikram Sambat) and vice versa. It is especially useful for handling date conversions between the two widely used calendar systems in Nepal.

## Installation

Node JS:

```sh
npm i ad-bs-converter
```

```js
import { adToBS, bsToAD } from "ad-bs-converter";
// or
const { adToBS, bsToAD } = require("ad-bs-converter");
```

## Basic Usage

```js
bsToAD("2053-06-25"); // will return {year:1996,month:10:day:11}
adToBS("1996-10-11"); // will return {year:1996,month:10:day:11}
```

Provide a valid date string. The current supported formats are:

```
YYYY/MM/DD
YYYY-MM-DD
YYYY MM DD
DD/MM/YYYY
DD-MM-YYYY
DD MM YYYY
```

Example:

```js
bsToAD("2051/02/01"); // YYYY/MM/DD
bsToAD("2051-02-01");
bsToAD("2051 02 01");
bsToAD("01/02/2051"); // DD/MM/YYYY
bsToAD("01-02-2051");
bsToAD("01 02 2051");
```
