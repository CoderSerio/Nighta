const safeJsonStringify = (value: any) => {
  let cache: Array<any> | null = [];

  const str = JSON.stringify(value, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache?.indexOf(value) !== -1) {
        return;
      }
      cache.push(value);
    }
    return value;
  });

  cache = null;

  return str;
}

export default safeJsonStringify;