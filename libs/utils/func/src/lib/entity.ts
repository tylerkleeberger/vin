export interface EntityDictionary<TEntity> {
  [key: string | number]: TEntity;
}

export const transformDictToArray = <TKey extends string | number, TEntity>(
  keys?: TKey[],
  dict?: EntityDictionary<TEntity>,
): TEntity[] => (dict ? keys?.map((key) => dict[key]) ?? [] : []);
