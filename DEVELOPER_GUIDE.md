# Developer Guide for AD-BS Date Converter

This `DEVELOPER.md` file provides technical insights and development instructions for the `ad-bs-converter` package, which converts dates between the Gregorian (AD) and Bikram Sambat (BS) calendar systems used in Nepal.

---

## Overview

The `ad-bs-converter` package offers two main functions for date conversion:

- **`adToBS`**: Converts a date from the Gregorian calendar to the Bikram Sambat (BS) calendar.
- **`bsToAD`**: Converts a date from the Bikram Sambat (BS) calendar to the Gregorian calendar.

This package supports various date input formats for flexibility and is compatible with both ES6 and CommonJS modules.

---

## Installation

To install the package, run:

```sh
npm install ad-bs-converter
```

---

## Importing the Package

### ES6 Modules

```js
import { adToBS, bsToAD } from "ad-bs-converter";
```

### CommonJS

```js
const { adToBS, bsToAD } = require("ad-bs-converter");
```

---

## Core Functions

### 1. `bsToAD(dateString)`

Converts a Bikram Sambat date string to a Gregorian date object.

**Example Usage:**

```js
bsToAD("2053-06-25"); // { year: 1996, month: 10, day: 11 }
```

### 2. `adToBS(dateStringOrTimestamp)`

Converts a Gregorian date string or timestamp to a Bikram Sambat date object.

**Example Usage:**

```js
adToBS("1996-10-11"); // { year: 2053, month: 6, day: 25 }
```

---

## Supported Date Formats

The following formats are accepted by the conversion functions:

- `YYYY/MM/DD`, `YYYY-MM-DD`, `YYYY MM DD`
- `DD/MM/YYYY`, `DD-MM-YYYY`, `DD MM YYYY`

---

## Development Notes

- The functions support passing dates as either strings or, for `adToBS`, as a timestamp (UTC).
- If no date is provided, the functions default to converting the current date.

---

## Running Tests

To verify the functionality of the package, add tests under the `tests` directory and run:

```sh
npm test
```

---

> **Note:** Contributions are welcome! Please follow the guidelines for code style and ensure all tests pass before submitting a pull request.
