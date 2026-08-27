// import { VideoDeviceInfo } from "@scannerproxy/dm-camera/dist/dce";

interface VideoDeviceInfo {
  /** The unique identifier for the camera. */
  deviceId: string;
  /** The label or name of the camera. */
  label: string;
  /** @ignore */
  _checked?: boolean;
}

export const isLandscape = () => window.matchMedia("(orientation: landscape)").matches;

export const createDocumentFragment = (text: string): DocumentFragment => {
  if (!text.trim().startsWith("<")) {
    throw Error("Unable to get valid HTMLElement.");
  }

  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", text);

  // text is wrapped by <template>
  if (1 === div.childElementCount && div.firstChild instanceof HTMLTemplateElement) {
    return div.firstChild.content;
  }

  // text is not wrapped by <template>
  const fragment = new DocumentFragment();
  for (let child of div.children) {
    fragment.append(child);
  }
  return fragment;
}

const getType = (value: any) => Object.prototype.toString.call(value).slice(8, -1);
export function deepMerge(target: any, source: any) {
  for (const key in source) {
    if (getType(source[key]) === "Object" && getType(target[key]) === "Object" && key in target) {
      deepMerge(target[key], source[key]);
    } else {
      if(key === "cameraFeatures") {
        source[key] = Array.isArray(source[key]) ? source[key] : [source[key]];
      }
      target[key] = source[key];
    }
  }
  return target;
}

export function isFrontCameraLabel(info: VideoDeviceInfo) {
  const frontCameraKeywords = [
    'front',
    'user',
    'selfie',
    '前置',
    '前摄',
    '自拍',
    '前面',
    'インカメラ',
    'フロント',
    '전면',
    '셀카',
    'фронтальная',
    'передняя',
    'frontal',
    'delantera',
    'selfi',
    'frontal',
    'frente',
    'avant',
    'frontal',
    'caméra frontale',
    'vorder',
    'vorderseite',
    'frontkamera',
    'anteriore',
    'frontale',
    'amamiya',
    'al-amam',
    'مقدمة',
    'أمامية',
    'aage',
    'आगे',
    'फ्रंट',
    'सेल्फी',
    'ด้านหน้า',
    'กล้องหน้า',
    'trước',
    'mặt trước',
    'ön',
    'ön kamera',
    'depan',
    'kamera depan',
    'przednia',
    'přední',
    'voorkant',
    'voorzijde',
    'față',
    'frontală',
    'εμπρός',
    'πρόσθια',
    'קדמית',
    'קדמי',
    'selfcamera',
    'facecam',
    'facetime'
  ];
  const label = info.label?.toLowerCase();
  if(!label) return false;
  return frontCameraKeywords.some(keyword => label.includes(keyword));
}

export function deepClone(obj: any): any {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result: any;
  if (Array.isArray(obj)) {
    result = [];
    for (let i = 0; i < obj.length; i++) {
      result[i] = deepClone(obj[i]);
    }
  } else {
    result = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        result[key] = deepClone(obj[key]);
      }
    }
  }
  return result;
}

export function isSupportedImageFile(file: File): boolean {
  if (!file) return false;
  const supportedExtensions = ['.jpg', '.jpeg', '.ico', '.gif', '.svg', '.webp', '.png', '.bmp'];
  const fileName = file.name.toLowerCase();
  const hasValidExtension = supportedExtensions.some(ext => fileName.endsWith(ext));
  if (!hasValidExtension) {
    return false;
  }
  const mimeType = file.type;
  if (!mimeType.startsWith('image/')) {
    return false;
  }
  return true;
}

type PointInit = { x: number, y: number }
// Determine the point P in the polygon - ray method
export function inPolygon(points: PointInit[], x: number, y: number) {
  let isHit = false;
  const n = points.length;
  if (n <= 2) {
    return false;
  }
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    if (pointOnSegment(p1, p2, { x, y })) {
      // Points on one side of the polygon
      return true;
    }
    // 1.min(p1[1],p2[1])<P.y<=max(p1[1],p2[1])
    // 2.The measured point is to the left of the intersection of the ray and the edge
    if (
      dcmp(p1.y - y) > 0 !== dcmp(p2.y - y) > 0
      && dcmp(x - ((y - p1.y) * (p1.x - p2.x)) / (p1.y - p2.y) - p1.x) < 0
    ) {
      isHit = !isHit;
    }
  }
  return isHit;
}

function pointOnSegment(p1: PointInit, p2: PointInit, q: PointInit) {
  if (
    (q.x - p1.x) * (p2.y - p1.y) === (p2.x - p1.x) * (q.y - p1.y)
    && Math.min(p1.x, p2.x) <= q.x
    && q.x <= Math.max(p1.x, p2.x)
    && Math.min(p1.y, p2.y) <= q.y
    && q.y <= Math.max(p1.y, p2.y)
  ) {
    return true;
  }
  return false;
}

// judge the size relationship of two double in eps accuracy
function dcmp(x: number) {
  const tolerance = 1e-6;
  if (Math.abs(x) < tolerance) {
    return 0;
  }

  return x < 0 ? -1 : 1;
}

/* eslint-disable no-bitwise */
export function isLineSegmentCross(
  p1: number[],
  p2: number[],
  q1: number[],
  q2: number[],
) {
  let line1 = p1[0] * (q1[1] - p2[1]) + p2[0] * (p1[1] - q1[1]) + q1[0] * (p2[1] - p1[1]);
  let line2 = p1[0] * (q2[1] - p2[1]) + p2[0] * (p1[1] - q2[1]) + q2[0] * (p2[1] - p1[1]);

  if (((line1 ^ line2) >= 0) && !(line1 === 0 || line2 === 0)) {
    return false;
  }

  line1 = q1[0] * (p1[1] - q2[1]) + q2[0] * (q1[1] - p1[1]) + p1[0] * (q2[1] - q1[1]);
  line2 = q1[0] * (p2[1] - q2[1]) + q2[0] * (q1[1] - p2[1]) + p2[0] * (q2[1] - q1[1]);

  if (((line1 ^ line2) >= 0) && !(line1 === 0 || line2 === 0)) {
    return false;
  }

  return true;
}