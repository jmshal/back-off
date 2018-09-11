# @jmshal/back-off

A simple backoff approach utility.

## Example usage

```js
import { backOff } from '@jmshal/back-off';

function signJwt(digest) {
  const retry = backOff(1, 2, 4, 8, 16);
  while (true) {
    try {
      return await await keyVaultClient.sign(endpoint, kid, 'RS256', digest);
    } catch (err) {
      if (err.code === 'VaultOperationLimitReached') {
        // Azure Key Vault will throttle requests if there are considerable amount within a short
        // period of time. It may be worth notifying an error reporting system if this happens.
        await retry.wait();
      } else {
        throw err;
      }
    }
  }
}
```

## License

MIT ❤️
