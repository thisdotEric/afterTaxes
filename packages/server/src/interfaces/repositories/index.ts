export interface BaseRepository<Entity, TId extends string | number> {
  // getById(id: TId): Promise<Entity | null>;
  add(entity: Entity): Promise<boolean>;
}
