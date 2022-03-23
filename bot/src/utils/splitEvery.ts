const splitEvery = (arr: any[], size: number) => arr.reduce((acc: any, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), []);

  export default splitEvery;
