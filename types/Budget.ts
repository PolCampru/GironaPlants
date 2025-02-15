export type BudgetDataType = {
  title: string;
  button: string;
} & SpecificBudgetDataType;

export type SpecificBudgetDataType = {
  emptyCard: string;
  emptyState: string;
  total: string;
  articles: string;
  addPlant1: string;
  addPlant2: string;
};
