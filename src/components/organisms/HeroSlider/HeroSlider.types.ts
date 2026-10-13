type Slide = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

export type HeroSliderData = {
  sliderTitle: string;
  sliderSubtitle: string;
  sliderButtonText: string;
  sliderButtonLink: string;
  slides: Slide[];
};
