import Maybe from "data.maybe";

const ShortCircuit = function(input, result) {
  this.input = input;
  this.result = result;
};

ShortCircuit.of = function(input, f) {
  return new ShortCircuit(input, Maybe.fromNullable(f(input)));
};

ShortCircuit.prototype.orElseMaybe = function(f) {
  return new ShortCircuit(this.input, this.result.orElse(() => Maybe.fromNullable(f(this.input))));
};

ShortCircuit.prototype.get = function() {
  return this.result.get();
};

export default ShortCircuit;
