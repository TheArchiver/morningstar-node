# morningstar-node

[![npm](https://img.shields.io/npm/v/morningstar-node.svg?maxAge=2592000)]()

Provides access to the financial quote data via an unsupported morningstar financial data API.
Many functions return a cleaned view of data.

## API

#### historical

```
morningstar.historical({
  symbol: SYMBOL,
  from: START_DATE,
  to: END_DATE
})
```
=> Promise for a raw `historical` response object ([sample](static/vti-response.json))

#### dividend

```
morningstar.dividend({
  symbol: SYMBOL,
  from: START_DATE,
  to: END_DATE
})
```
=> Promise for array of `dividend` objects:

```
[
  {
    date: '2015-03-25',
    amount: 0.5080,
    type: 'dividend'
  },
  ...
]
```

## development

To install dependencies:

```
make install
```

To run unit tests:

```
make test
```

## implementation

This client is based on [hahnicity's tutorial](https://gist.github.com/hahnicity/45323026693cdde6a116) of morningstar API functionality.
