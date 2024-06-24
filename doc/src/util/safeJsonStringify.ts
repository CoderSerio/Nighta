const safeJsonStringify = (value: any) => {
  let cache: Array<any> | null = [];
  let isFirstRecord = true;

  const str = JSON.stringify(
    value,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache?.indexOf(value) !== -1) {
          return;
        }
        cache.push(value);
        if (!Object.keys(value).length) {
          return () => { };
        }
      }

      if (key === "record") {
        if (isFirstRecord) {
          isFirstRecord = false;
        } else {
          return () => { };
        }
      }

      if (key === "parent") {
        return () => { };
      } else if (key === "env") {
        return () => { };
      }

      if (value instanceof Array) {
        return () => { };
      }

      return value;
    },
    4
  );

  cache = null;

  return (str as any)?.replaceAll('{}', '[Object]') ?? str;
};

export default safeJsonStringify;
