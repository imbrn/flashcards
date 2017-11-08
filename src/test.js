class TestClass {
  print(...args) {
    document.getElementById('root').innerHTML = args.join(' ');
  }
}

export default TestClass;
