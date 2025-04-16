type IncomeCategories =
  | 'salary'
  | 'bonus'
  | 'interest'
  | 'dividend'
  | 'allowance'
  | 'sales'
  | 'other';
  
type ExpenseCategories =
  | 'food'
  | 'housing'
  | 'transportation'
  | 'communication'
  | 'medical'
  | 'insurance'
  | 'education'
  | 'living'
  | 'other';

export type Category = {
  name: string;
  price: number;
  category: IncomeCategories | ExpenseCategories;
};

export type CategoryChartProps = {
  categoryList: Category[];
};

export type CategoryListProps = {
    categoryList: Category[];
    className?: string;
};
