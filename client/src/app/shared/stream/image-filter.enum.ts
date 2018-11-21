export interface ImageConfig {
  filter: ImageFilter;
  brightness: number;
  contrast: number;
}

export enum ImageFilter {
  GRAY_SCALE = 'grayscale',
  BLUR = 'blur',
  SECURITY = 'security',
  INVERT = 'invert'
}
