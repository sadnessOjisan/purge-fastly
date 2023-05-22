# purge-fastly

This is SDK for purge fastly.

## Motivation

TBD

## How to use

```
npm install purge-fastly
```

```ts
import { purge } from "purge-fastly";

// purge all selected your service.
purge("YOUR_FASTLY_TOKEN", { type: "PURGE_ALL", serviceId: "YOUR_SERVICE_ID" });

// purge a url you selected.
purge("YOUR_FASTLY_TOKEN", {
  type: "PURGE_A_URL",
  url: "YOUR_URL",
});

// purge all urls you selected surrogate key.
purge("YOUR_FASTLY_TOKEN", {
  type: "PURGE_BY_A_SURROGATE_KEY",
  serviceId: "YOUR_SERVICE_ID",
  surrogateKey: "YOUR_SURROGATE_KEY",
});

// purge all urls you selected surrogate keys.
purge("YOUR_FASTLY_TOKEN", {
  type: "PURGE_BY_MULTI_SURROGATE_KEYS",
  serviceId: "YOUR_SERVICE_ID",
  surrogateKeys: ["YOUR_SURROGATE_KEY1", "YOUR_SURROGATE_KEY2"],
});
```

## For developer

### Design Doc

TBD

### Fastly Doc

Fastly provides Fastly API which can purge and so on. The reference is

- https://developer.fastly.com/reference/api/
- https://developer.fastly.com/reference/api/purging/
