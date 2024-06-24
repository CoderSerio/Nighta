class Environment {
  constructor(record = {}, parent = null) {
    this.record = record;
    this.parent = parent;
  }

  define(name, value) {
    this.record[name] = value;
    return value;
  }

  lookUp(name) {
    return this.resolve(name).record[name];
  }

  resolve(name) {
    if (this.record.hasOwnProperty(name)) {
      return this;
    }
    if (this.parent === null) {
      throw new ReferenceError(`Variable or property ${name} is not defined.`);
    }

    return this.parent.resolve(name);
  }

  assign(name, value) {
    this.resolve(name).record[name] = value;
    return value;
  }
}

module.exports = Environment;