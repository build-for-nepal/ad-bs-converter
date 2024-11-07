# AD-BS Date Converter: Seamless Conversion Between Gregorian and Bikram Sambat Calendars

This package provides utility functions to convert dates from AD (Gregorian) to BS (Bikram Sambat) and vice versa. It is especially useful for handling date conversions between the two widely used calendar systems in Nepal.

## Installation

To install the package, run:

```sh
  npm i ad-bs-converter
```

## Usage

You can import the functions using either ES6 modules or CommonJS:

### ES6 Modules

```js
import { adToBS, bsToAD } from "ad-bs-converter";
```

### CommonJS

```js
const { adToBS, bsToAD } = require("ad-bs-converter");
```

## Basic Usage

### Convert BS to AD

```js
bsToAD("2053-06-25"); // Returns {year:1996, month:10, day:11}
```

### Convert AD to BS

```js
adToBS("1996-10-11"); // Returns {year:2053, month:06, day:25}
```

### Parameters the function can take

**String**  
Provide a valid date string. The current supported formats are:

```
  YYYY/MM/DD
  YYYY-MM-DD
  YYYY MM DD
  DD/MM/YYYY
  DD-MM-YYYY
  DD MM YYYY
```

Example

```js
bsToAD("2051/02/01"); // YYYY/MM/DD
bsToAD("2051-02-01");
bsToAD("2051 02 01");
bsToAD("01/02/2051"); // DD/MM/YYYY
bsToAD("01-02-2051");
bsToAD("01 02 2051");
```

**Number**

The number value represents the UTC timestamp that will be converted to Nepali date.

> **Note:** this is only available in `adToBs` function.

Example:

```js
adToBs(1589638162879);
```

**Empty Value**

If no values are provided, the current day date will be returned.

```js
adToBS(); // will return the current bs date
bsToAD(); // will return the current ad date
```
