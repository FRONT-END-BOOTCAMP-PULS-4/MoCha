import { ReactNode } from 'react';

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

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
