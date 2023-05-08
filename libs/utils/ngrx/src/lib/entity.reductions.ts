export const mergeEntity =
  <TKey extends string | number, TEntity, TState>(
    keyProp: keyof TEntity,
    idProp: keyof TState,
    entityProp: keyof TState,
  ) =>
    (
      state: TState,
      {
        entity,
      }: {
        entity: TEntity;
      },
    ): TState => ({
      ...state,
      [entityProp]: {
        ...state[entityProp],
        [entity[keyProp] as string | number]: entity,
      },
      [idProp]: [...(state[idProp] as (string | number)[]), entity[keyProp]],
    });
