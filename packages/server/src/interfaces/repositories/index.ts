export interface BaseRepository<Entity> {
  // getById(id: TId): Promise<Entity | null>;
  add(entity: Entity): Promise<boolean>;
}
