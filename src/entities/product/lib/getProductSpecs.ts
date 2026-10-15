import { Category } from '@/shared/types/Category';
import type { Phone } from '@/shared/types/Phone';
import type { Tablet } from '@/shared/types/Tablet';
import type { Accessory } from '@/shared/types/Accessory';

export const getProductSpecs = (product: Phone | Tablet | Accessory) => {
  switch (product.category) {
    case Category.PHONES:
      return [
        { specName: 'Screen', specText: product.screen },
        { specName: 'Resolution', specText: product.resolution },
        { specName: 'Processor', specText: product.processor },
        { specName: 'RAM', specText: product.ram },
        { specName: 'Camera', specText: product.camera },
        { specName: 'Zoom', specText: product.zoom },
        { specName: 'Cell', specText: product.cell.join(', ') },
      ];

    case Category.TABLETS:
      return [
        { specName: 'Screen', specText: product.screen },
        { specName: 'Resolution', specText: product.resolution },
        { specName: 'Processor', specText: product.processor },
        { specName: 'RAM', specText: product.ram },
        { specName: 'Camera', specText: product.camera },
        { specName: 'Zoom', specText: product.zoom },
      ];

    case Category.ACCESSORIES:
      return [{ specName: 'Color', specText: product.color }];
  }
};
