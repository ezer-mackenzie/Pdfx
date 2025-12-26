export type PDFUnit = 'pt' | 'mm' | 'cm' | 'in' | 'px';
export type PDFLayout = 'flow' | 'absolute' | 'flex';
export type PDFPageOrientation = 'portrait' | 'landscape';
export type PDFImageFormat = 'jpeg' | 'png' | 'webp' | 'svg';

export interface PDFPageMargin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface PDFPagePadding {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface PDFLength {
  value: number;
  unit: PDFUnit;
}

export interface PDFPageSize {
  width: PDFLength;
  height: PDFLength;
}

export interface PDFFont {
  name: string;
  data: Uint8Array;
  weight?: number;
  style?: 'normal' | 'italic';
}

export interface RGBColor {
  r: number; // 0-1
  g: number; // 0-1
  b: number; // 0-1
}

export type HexColor = `#${string}`; // '#rrggbb' or '#rrggbbaa'

export type PDFColor = RGBColor | HexColor;

export interface PDFImageLike {
  format: PDFImageFormat;
  width: number;
  height: number;
  bitsPerComponent: number;
  data: Uint8Array;
  colorSpace: '/DeviceRGB';
  filter: '/DCTDecode' | '/FlateDecode';
  decodeParms?: {
    predictor: number;
    colors: number;
    bitsPerComponent: number;
    columns: number;
  };
}

export type PDFImageSource = string | Uint8Array | PDFImageLike;

export interface PDFImage {
  type: 'image';
  image: PDFImageSource;
  x: number;
  y: number;
  w: number;
  h: number;
  name?: string;
  objectId?: number;
}

export interface PDFBackground {
  color: PDFColor;
  image: PDFImageSource;
  opacity: number;
}

export interface PDFText {
  type: 'text';
  value: string;
  font?: PDFFont;
  fontSize?: number;
  color?: PDFColor;
  lineHeight?: number;
}

export interface PDFContainer {
  type: 'container';
  layout?: PDFLayout;
  gap?: number;

  direction?: 'row' | 'column';
  justify?: 'start' | 'center' | 'end' | 'space-between';
  align?: 'start' | 'center' | 'end';

  children: PDFNode[];
}

export interface PDFTable {
  type: 'table';
  columns: number;
  widths?: number[];
  rows: PDFNode[][];
}

export type PDFNode = PDFText | PDFImage | PDFContainer | PDFTable;

export interface PDFHeader {
  content: PDFNode[];
  height: number;
}

export interface PDFFooter {
  content: PDFNode[];
  height: number;
}

export interface PDFBorder {
  color: PDFColor;
  width: number;
  style?: 'solid' | 'dashed' | 'dotted';
  radius?: number;
}

export interface PDFPageAnnotation {
  type: string;
  data: string;
}

export interface PDFPageOptions {
  layout: PDFLayout;
  orientation: PDFPageOrientation;

  size: PDFPageSize;
  margin: PDFPageMargin;
  padding: PDFPagePadding;

  background: PDFBackground;
  border: PDFBorder;

  rotation: number;
  header: PDFHeader;
  footer: PDFFooter;

  annotations: Array<PDFPageAnnotation>;
}
