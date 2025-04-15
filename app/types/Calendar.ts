type DailyData = {
  date: string;
  income: number;
  expense: number;
};

export type FullCalendarWrapperProps = {
  daily: DailyData[];
};
