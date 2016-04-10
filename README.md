# morningstar-node

Provides access to the financial quote data via an unsupported morningstar financial data API.

## API

```
morningstar.historical({
  symbol: SYMBOL,
  from: START_DATE,
  to: END_DATE
})
```
returns a Promise for a `historical` response object ([sample](static/vti-response.json))

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
