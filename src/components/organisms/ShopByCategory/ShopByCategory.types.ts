type CategoryCard = {
  id: string;
  color: string;
  image: string;
  title: string;
  count: number;
  link: string;
};

export type ShopByCategoryData = {
  sectionTitle: string;
  categories: CategoryCard[];
};
