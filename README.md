# `@sequencemedia/lsof`

Get a list of open files in a convenient structure

```bash
npm i -P @sequencemedia/lsof
```

## Usage

Get `lsof` as a string

```javascript
import {
  getLsof
} from '@sequencemedia/lsof'

/**
 *  ...
 */

const string = await getLsof()
```

Get `lsof` transformed into an array

```javascript
import {
  getLsofArray
} from '@sequencemedia/lsof'

/**
 *  ...
 */

const array = await getLsofArray()
```

Get `lsof` transformed into a set

```javascript
import {
  getLsofSet
} from '@sequencemedia/lsof'

/**
 *  ...
 */

const set = await getLsofSet()
```
