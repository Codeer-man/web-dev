export type Category = {
  id: number;
  name: string;
  createdAt: Date;
};

export interface cateroryManageProps {
  categories: Category[];
}
