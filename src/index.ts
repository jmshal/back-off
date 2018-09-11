type BackOffAction = number | Error;

export function backOff(...actions: Array<BackOffAction>) {
  let index = 0;
  const err = actions[actions.length - 1] instanceof Error
    ? actions.pop() as Error
    : new Error('Ran out of retries.');
  function wait(): Promise<void> {
    return new Promise((resolve, reject) => {
      const action = actions[index++];
      if (typeof action === 'undefined') {
        reject(err);
      } else if (action === 0) {
        resolve(); // Prevent using setTimeout when 0 seconds provided
      } else {
        setTimeout(resolve, (action as number) * 1000);
      }
    });
  }
  return {
    wait,
  };
}
