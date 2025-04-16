type DailyData = {
  date: string;
  income: number;
  expense: number;
};

export type FullCalendarWrapperProps = {
  daily: DailyData[];
};

export type SummaryHeaderProps = {
  summary: {
    totalIncome: number;
    totalExpense: number;
  };
};

export type FloatingButtonProps = {
  onClick: () => void;
};

export type IncomeExpenseFormProps = {
  onClose: () => void;
};
