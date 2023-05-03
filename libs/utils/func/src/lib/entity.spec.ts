import { transformDictToArray } from './entity';

describe('transformDictToArray()', () => {
  it('should return empty array of keys array is nullish', () => {
    expect(transformDictToArray(undefined, {})).toEqual([]);
  });

  it('should return empty array of dictionary is nullish', () => {
    expect(transformDictToArray([], undefined)).toEqual([]);
  });

  it('should return array of entities', () => {
    expect(
      transformDictToArray(['KDV123'], {
        KDV123: {
          vin: 'KDV123',
          make: 'Test',
          model: 'Test',
        },
      }),
    ).toEqual([{ vin: 'KDV123', make: 'Test', model: 'Test' }]);
  });
});
