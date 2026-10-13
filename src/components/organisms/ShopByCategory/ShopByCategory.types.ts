type CategoryCard = {
  id: string;
  color: string;
  image: string;
  title: string;
  count: number;
  link: string;
};

export type ShopByCategoryProps = {
  sectionTitle: string;
  categories: CategoryCard[];
};
