type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type HeroSliderData = {
  sectionTitle: string;
  sliderTitle: string;
  sliderSubtitle: string;
  sliderButtonText: string;
  sliderButtonLink: string;
  slides: Slide[];
};
