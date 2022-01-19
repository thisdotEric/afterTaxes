export interface BaseRepository<Entity, TId extends string | number> {
  getById(id: TId): Promise<Entity | undefined>;
  add(entity: Entity): Promise<boolean>;
}
