export default interface CreateRecyclingDTO {
  recycler_id: string;
  collect_point_id: string;
  items: string;
  finished: 0 | 1;
}
