// Run with: ./node_modules/.bin/karma start

var results, minisculeWinner, tinyWinner, shortWinner, mediumWinner, longWinner;

function recursive(n) {
  if (n < 3) return 1;
  return recursive(n - 1) + recursive(n - 2);
}

function iterative(n) {
  var vals = [1, 1],
      thisN;

  for (thisN = 2; thisN < n; ++thisN) {
    vals.push(vals.shift() + vals[0]);
  }
  return vals.pop();
}

function cachedIterative(n) {
  var seq = [1, 1];

  while (seq.length < n) {
    seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
  }
  return seq[seq.length - 1];
}

function threeWayFibonacci(n) {
  var results = {'recursive' : 0, 'iterative' : 0, 'cached' : 0};

  results.recursive = window.performance.now();
  recursive(n);
  results.recursive = (window.performance.now() - results.recursive) * 1000;
  results.recursive = Math.round(results.recursive);

  results.iterative = window.performance.now();
  iterative(n);
  results.iterative = (window.performance.now() - results.iterative) * 1000;
  results.iterative = Math.round(results.iterative);

  results.cached = window.performance.now();
  cachedIterative(n);
  results.cached = (window.performance.now() - results.cached) * 1000;
  results.cached = Math.round(results.cached);

  console.log('Regular Recursive (' + n + '): \t' + results.recursive + ' microseconds');
  console.log('Regular Iterative (' + n + '): \t' + results.iterative + ' microseconds');
  console.log('Cached Iterative (' + n + '): \t' + results.cached + ' microseconds');

  return results;
}

function evaluate(results, size) {
  if (results.recursive < results.iterative && results.recursive < results.cached) {
    chai.expect(results.recursive).to.be.below(results.iterative);
    chai.expect(results.recursive).to.be.below(results.cached);
    console.log('\n\tFastest ' + size + ' implementation: Recursive\n');
  } else if (results.iterative < results.recursive && results.iterative < results.cached) {
    chai.expect(results.iterative).to.be.below(results.recursive);
    chai.expect(results.iterative).to.be.below(results.cached);
    console.log('\n\tFastest ' + size + ' implementation: Iterative\n');
  } else if (results.cached < results.iterative && results.cached < results.recursive) {
    chai.expect(results.cached).to.be.below(results.iterative);
    chai.expect(results.cached).to.be.below(results.recursive);
    console.log('\n\tFastest ' + size + ' implementation: Cached Iterative\n');
  } else {
    console.log('\n\tUnable to determine winner--the fastest tests are equally fast\n');
  }
}

describe('Fibonacci performance test', function () {

  beforeEach(function () {
    // Clear the first performance.now() call, otherwise the first one will be dramatically slower than the others--not sure why...
    window.performance.now();
  });

  afterEach(function () {
    delete results;
  });

  it('should determine the fastest implementation of a miniscule (1) fibonacci sequence', function() {
    evaluate(threeWayFibonacci(1), 'miniscule');
  });

  it('should determine the fastest implementation of a tiny (5) fibonacci sequence', function() {
    evaluate(threeWayFibonacci(5), 'miniscule');
  });

  it('should determine the fastest implementation of a small (10) fibonacci sequence', function () {
    evaluate(threeWayFibonacci(10), 'small');
  });

  it('should determine the fastest implementation of a medium (25) fibonacci sequence', function () {
    evaluate(threeWayFibonacci(25), 'medium');
  });

  it('should determine the fastest implementation of a large (45) fibonacci sequence', function () {
    evaluate(threeWayFibonacci(45), 'large');
  });
});
