class Container<T> {
  private $value: T;

  constructor(x: T) {
    this.$value = x;
  }

  static of<T>(x: T) {
    return new Container(x);
  }

  map(f: (x: T) => T) {
    return (this.$value = f(this.$value)), this;
  }

  value() {
    return this.$value;
  }
}

export { Container };
