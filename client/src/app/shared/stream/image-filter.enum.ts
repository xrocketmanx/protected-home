export interface ImageConfig {
  filter: ImageFilter;
  brightness: number;
  contrast: number;
  motionDetection: {
    enabled: boolean;
    threshold: number;
    checkDensity: number;
  };
}

export enum ImageFilter {
  GRAY_SCALE = 'grayscale',
  BLUR = 'blur',
  INVERT = 'invert'
}
