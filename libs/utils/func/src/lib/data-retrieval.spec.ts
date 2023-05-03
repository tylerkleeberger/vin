import { get, tryGet } from './data-retrieval';

interface Test {
  name?: string;
  value?: number;
}

describe('get()', () => {
  it('should return value of specified property on object', () => {
    const test: Test = {
      name: 'test name',
      value: 123,
    };

    const value = get<Test, keyof Test>('name')(test);

    expect(value).toEqual('test name');
  });
});

describe('tryGet()', () => {
  it('should return value of specified property on object', () => {
    const test: Test = {
      name: 'test name',
      value: 123,
    };

    const value = tryGet<Test, keyof Test>('name')(test);

    expect(value).toEqual('test name');
  });

  it('should return undefined of specified property on object when property does not exist', () => {
    const test: Test = {
      value: 123,
    };

    const value = tryGet<Test, keyof Test>('name')(test);

    expect(value).toBeUndefined();
  });
});
