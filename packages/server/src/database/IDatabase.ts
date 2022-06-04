export default interface IDatabase<T> {
  db: () => T;
}
