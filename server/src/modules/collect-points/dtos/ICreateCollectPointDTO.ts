export default interface ICreateCollectPointDTO {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  items: string;
  schedules: Array<{
    weekDay: string;
    start: string;
    end: string;
  }>;
}
