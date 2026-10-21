import { useProductRating } from '@/entities/product/model/product-ratings.queries';

type Props = {
  namespaceId: string;
};

export const ProductRating = ({ namespaceId }: Props) => {
  const { data } = useProductRating(namespaceId);

  if (!data) {
    return <span>No reviews yet</span>;
  }

  return (
    <div>
      <strong>{data.rating.toFixed(1)} / 5</strong>
      <span> ({data.reviewsCount} reviews)</span>
    </div>
  );
};
