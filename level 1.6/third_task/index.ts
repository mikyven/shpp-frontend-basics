interface objInterface {
  [i: string]: {cvalue: number | string | undefined | objInterface} | undefined
}

function summ(a: objInterface) {
  const x = Object.keys(a).map((k) => {
    const elem = a[k];
    if (elem === undefined) return 0
    if (typeof elem?.cvalue === 'string') return +elem.cvalue;
    if (typeof elem?.cvalue === 'object') return summ(elem.cvalue);
    if (typeof elem?.cvalue === 'number') return elem.cvalue;
    return 2021;
  });
  let sum = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i]
  }
  return sum;
}

console.log(summ({
  hello: undefined, 
  world: undefined
}))