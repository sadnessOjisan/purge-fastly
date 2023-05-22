type PurgeIntent =
  | { type: "PURGE_A_URL"; url: string }
  | { type: "PURGE_ALL"; serviceId: string }
  | {
      type: "PURGE_BY_A_SURROGATE_KEY";
      serviceId: string;
      surrogateKey: string;
    }
  | {
      type: "PURGE_BY_MULTI_SURROGATE_KEYS";
      serviceId: string;
      surrogateKeys: ReadonlyArray<string>;
    };

/**
 * @see https://developer.fastly.com/reference/api/purging/
 */
const FASTLY_API_ORIGIN = "https://api.fastly.com";

const FASTY_HEADER_KEY = "Fastly-Key";
const FASTLY_HEADER_SOFT_PURGE_KEY = "fastly-soft-purge";
/** This is not typo. This means header key of surroate_key */
const FASTLY_HEADER_SURROGATE_KEY_KEY = "fastly-soft-purge";

class HttpError extends Error {
  static {
    this.prototype.name = "HttpError";
  }
}

class FastlyError extends Error {
  static {
    this.prototype.name = "FastlyError";
  }
}

export const purge = async (authToken: string, intent: PurgeIntent) => {
  switch (intent.type) {
    case "PURGE_ALL": {
      let res;
      try {
        res = await fetch(
          `${FASTLY_API_ORIGIN}/service/${intent.serviceId}/purge_all`,
          {
            headers: {
              [FASTY_HEADER_KEY]: authToken,
            },
          }
        );
      } catch (e) {
        throw new HttpError("Access error", { cause: e });
      }

      let json;
      try {
        json = await res.json();
      } catch (e) {
        throw new HttpError("Syntax error", { cause: e });
      }

      if (!res.ok) {
        throw new FastlyError(
          `HTTP Status Error. status: ${res.status} | json: ${json}`
        );
      }

      // FIXME: pluggable logger and flg
      console.info("success purge");

      return;
    }
    case "PURGE_A_URL": {
      let res;
      try {
        res = await fetch(`${FASTLY_API_ORIGIN}/purge/${intent.url}`, {
          headers: {
            [FASTY_HEADER_KEY]: authToken,
            [FASTLY_HEADER_SOFT_PURGE_KEY]: "1",
          },
        });
      } catch (e) {
        throw new HttpError("Access error", { cause: e });
      }

      let json;
      try {
        json = await res.json();
      } catch (e) {
        throw new HttpError("Syntax error", { cause: e });
      }

      if (!res.ok) {
        throw new FastlyError(
          `HTTP Status Error. status: ${res.status} | json: ${json}`
        );
      }

      // FIXME: pluggable logger and flg
      console.info("success purge");

      return;
    }
    case "PURGE_BY_A_SURROGATE_KEY": {
      let res;
      try {
        res = await fetch(
          `${FASTLY_API_ORIGIN}/service/${intent.serviceId}/purge/${intent.surrogateKey}`,
          {
            headers: {
              [FASTY_HEADER_KEY]: authToken,
              [FASTLY_HEADER_SOFT_PURGE_KEY]: "1",
            },
          }
        );
      } catch (e) {
        throw new HttpError("Access error", { cause: e });
      }

      let json;
      try {
        json = await res.json();
      } catch (e) {
        throw new HttpError("Syntax error", { cause: e });
      }

      if (!res.ok) {
        throw new FastlyError(
          `HTTP Status Error. status: ${res.status} | json: ${json}`
        );
      }

      // FIXME: pluggable logger and flg
      console.info("success purge");

      return;
    }

    case "PURGE_BY_MULTI_SURROGATE_KEYS": {
      const surrogateKeys = intent.surrogateKeys.join(" ");
      let res;
      try {
        res = await fetch(
          `${FASTLY_API_ORIGIN}/service/${intent.serviceId}/purge`,
          {
            headers: {
              [FASTY_HEADER_KEY]: authToken,
              [FASTLY_HEADER_SOFT_PURGE_KEY]: "1",
              [FASTLY_HEADER_SURROGATE_KEY_KEY]: surrogateKeys,
            },
          }
        );
      } catch (e) {
        throw new HttpError("Access error", { cause: e });
      }

      let json;
      try {
        json = await res.json();
      } catch (e) {
        throw new HttpError("Syntax error", { cause: e });
      }

      if (!res.ok) {
        throw new FastlyError(
          `HTTP Status Error. status: ${res.status} | json: ${json}`
        );
      }

      // FIXME: pluggable logger and flg
      console.info("success purge");

      return;
    }
    default:
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const _: never = intent.type;
  }
};
