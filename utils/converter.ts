import { ConversionCategory, Unit, ConversionRate } from '@/types/converter';

// 単位定義
export const UNITS: Record<ConversionCategory, Unit[]> = {
  length: [
    { id: 'meter', name: 'メートル', symbol: 'm', category: 'length' },
    { id: 'kilometer', name: 'キロメートル', symbol: 'km', category: 'length' },
    { id: 'centimeter', name: 'センチメートル', symbol: 'cm', category: 'length' },
    { id: 'millimeter', name: 'ミリメートル', symbol: 'mm', category: 'length' },
    { id: 'mile', name: 'マイル', symbol: 'mi', category: 'length' },
    { id: 'yard', name: 'ヤード', symbol: 'yd', category: 'length' },
    { id: 'foot', name: 'フィート', symbol: 'ft', category: 'length' },
    { id: 'inch', name: 'インチ', symbol: 'in', category: 'length' },
  ],
  weight: [
    { id: 'kilogram', name: 'キログラム', symbol: 'kg', category: 'weight' },
    { id: 'gram', name: 'グラム', symbol: 'g', category: 'weight' },
    { id: 'milligram', name: 'ミリグラム', symbol: 'mg', category: 'weight' },
    { id: 'pound', name: 'ポンド', symbol: 'lb', category: 'weight' },
    { id: 'ounce', name: 'オンス', symbol: 'oz', category: 'weight' },
    { id: 'ton', name: 'トン', symbol: 't', category: 'weight' },
  ],
  temperature: [
    { id: 'celsius', name: '摂氏', symbol: '°C', category: 'temperature' },
    { id: 'fahrenheit', name: '華氏', symbol: '°F', category: 'temperature' },
    { id: 'kelvin', name: 'ケルビン', symbol: 'K', category: 'temperature' },
    { id: 'rankine', name: 'ランキン', symbol: '°R', category: 'temperature' },
  ],
  area: [
    { id: 'square_meter', name: '平方メートル', symbol: 'm²', category: 'area' },
    { id: 'square_kilometer', name: '平方キロメートル', symbol: 'km²', category: 'area' },
    { id: 'square_centimeter', name: '平方センチメートル', symbol: 'cm²', category: 'area' },
    { id: 'square_mile', name: '平方マイル', symbol: 'mi²', category: 'area' },
    { id: 'acre', name: 'エーカー', symbol: 'ac', category: 'area' },
    { id: 'hectare', name: 'ヘクタール', symbol: 'ha', category: 'area' },
  ],
  volume: [
    { id: 'cubic_meter', name: '立方メートル', symbol: 'm³', category: 'volume' },
    { id: 'liter', name: 'リットル', symbol: 'L', category: 'volume' },
    { id: 'milliliter', name: 'ミリリットル', symbol: 'mL', category: 'volume' },
    { id: 'gallon', name: 'ガロン', symbol: 'gal', category: 'volume' },
    { id: 'quart', name: 'クォート', symbol: 'qt', category: 'volume' },
    { id: 'pint', name: 'パイント', symbol: 'pt', category: 'volume' },
  ],
  speed: [
    { id: 'meter_per_second', name: 'メートル毎秒', symbol: 'm/s', category: 'speed' },
    { id: 'kilometer_per_hour', name: 'キロメートル毎時', symbol: 'km/h', category: 'speed' },
    { id: 'mile_per_hour', name: 'マイル毎時', symbol: 'mph', category: 'speed' },
    { id: 'knot', name: 'ノット', symbol: 'kn', category: 'speed' },
    { id: 'foot_per_second', name: 'フィート毎秒', symbol: 'ft/s', category: 'speed' },
  ],
};

// 変換レート定義
const CONVERSION_RATES: ConversionRate[] = [
  // 長さの変換
  { fromUnit: 'meter', toUnit: 'kilometer', rate: 0.001 },
  { fromUnit: 'meter', toUnit: 'centimeter', rate: 100 },
  { fromUnit: 'meter', toUnit: 'millimeter', rate: 1000 },
  { fromUnit: 'meter', toUnit: 'mile', rate: 0.000621371 },
  { fromUnit: 'meter', toUnit: 'yard', rate: 1.09361 },
  { fromUnit: 'meter', toUnit: 'foot', rate: 3.28084 },
  { fromUnit: 'meter', toUnit: 'inch', rate: 39.3701 },
  
  // 重さの変換
  { fromUnit: 'kilogram', toUnit: 'gram', rate: 1000 },
  { fromUnit: 'kilogram', toUnit: 'milligram', rate: 1000000 },
  { fromUnit: 'kilogram', toUnit: 'pound', rate: 2.20462 },
  { fromUnit: 'kilogram', toUnit: 'ounce', rate: 35.274 },
  { fromUnit: 'kilogram', toUnit: 'ton', rate: 0.001 },
  
  // 温度の変換（特殊な変換）
  { fromUnit: 'celsius', toUnit: 'fahrenheit', rate: 1.8, offset: 32 },
  { fromUnit: 'celsius', toUnit: 'kelvin', rate: 1, offset: 273.15 },
  { fromUnit: 'celsius', toUnit: 'rankine', rate: 1.8, offset: 491.67 },
  
  // 面積の変換
  { fromUnit: 'square_meter', toUnit: 'square_kilometer', rate: 0.000001 },
  { fromUnit: 'square_meter', toUnit: 'square_centimeter', rate: 10000 },
  { fromUnit: 'square_meter', toUnit: 'square_mile', rate: 0.000000386102 },
  { fromUnit: 'square_meter', toUnit: 'acre', rate: 0.000247105 },
  { fromUnit: 'square_meter', toUnit: 'hectare', rate: 0.0001 },
  
  // 体積の変換
  { fromUnit: 'cubic_meter', toUnit: 'liter', rate: 1000 },
  { fromUnit: 'cubic_meter', toUnit: 'milliliter', rate: 1000000 },
  { fromUnit: 'cubic_meter', toUnit: 'gallon', rate: 264.172 },
  { fromUnit: 'cubic_meter', toUnit: 'quart', rate: 1056.69 },
  { fromUnit: 'cubic_meter', toUnit: 'pint', rate: 2113.38 },
  
  // 速度の変換
  { fromUnit: 'meter_per_second', toUnit: 'kilometer_per_hour', rate: 3.6 },
  { fromUnit: 'meter_per_second', toUnit: 'mile_per_hour', rate: 2.23694 },
  { fromUnit: 'meter_per_second', toUnit: 'knot', rate: 1.94384 },
  { fromUnit: 'meter_per_second', toUnit: 'foot_per_second', rate: 3.28084 },
];

// 逆変換レートを自動生成
const generateReverseRates = (): ConversionRate[] => {
  const reverseRates: ConversionRate[] = [];
  
  CONVERSION_RATES.forEach(rate => {
    if (rate.offset !== undefined) {
      // 温度変換の逆変換
      if (rate.fromUnit === 'celsius' && rate.toUnit === 'fahrenheit') {
        reverseRates.push({ fromUnit: 'fahrenheit', toUnit: 'celsius', rate: 1/1.8, offset: -32/1.8 });
      } else if (rate.fromUnit === 'celsius' && rate.toUnit === 'kelvin') {
        reverseRates.push({ fromUnit: 'kelvin', toUnit: 'celsius', rate: 1, offset: -273.15 });
      } else if (rate.fromUnit === 'celsius' && rate.toUnit === 'rankine') {
        reverseRates.push({ fromUnit: 'rankine', toUnit: 'celsius', rate: 1/1.8, offset: -491.67/1.8 });
      }
    } else {
      // 通常の逆変換
      reverseRates.push({
        fromUnit: rate.toUnit,
        toUnit: rate.fromUnit,
        rate: 1 / rate.rate,
      });
    }
  });
  
  return reverseRates;
};

const ALL_CONVERSION_RATES = [...CONVERSION_RATES, ...generateReverseRates()];

// 単位変換関数
export const convertUnit = (value: number, fromUnit: string, toUnit: string): number => {
  if (fromUnit === toUnit) {
    return value;
  }
  
  const conversion: ConversionRate | undefined = ALL_CONVERSION_RATES.find(
    (rate: ConversionRate) => rate.fromUnit === fromUnit && rate.toUnit === toUnit
  );
  
  if (!conversion) {
    throw new Error(`変換レートが見つかりません: ${fromUnit} → ${toUnit}`);
  }
  
  if (conversion.offset !== undefined) {
    return value * conversion.rate + conversion.offset;
  }
  
  return value * conversion.rate;
};

// 入力値の検証
export const validateInput = (value: string): boolean => {
  if (value === '' || value === '-') {
    return true;
  }
  
  const num = parseFloat(value);
  return !isNaN(num) && isFinite(num);
};

// 数値のフォーマット
export const formatNumber = (num: number): string => {
  if (Math.abs(num) < 0.000001 || Math.abs(num) > 999999999) {
    return num.toExponential(6);
  }
  
  // 小数点以下6桁まで表示
  const rounded = Math.round(num * 1000000) / 1000000;
  return rounded.toString();
};

// カテゴリの日本語名
export const getCategoryName = (category: ConversionCategory): string => {
  const names: Record<ConversionCategory, string> = {
    length: '長さ',
    weight: '重さ',
    temperature: '温度',
    area: '面積',
    volume: '体積',
    speed: '速度',
  };
  return names[category];
}; 