class Container<O> {
  private $value: any;

  constructor(x: any) {
    this.$value = x;
  }

  static of<O>(x: any) {
    return new Container<O>(x);
  }

  call<T, U>(f: (x: T, ...rest: any[]) => U, ...rest: any[]) {
    return (this.$value = f(this.$value, ...rest)), this;
  }

  value(): O {
    return this.$value;
  }
}

export { Container };
