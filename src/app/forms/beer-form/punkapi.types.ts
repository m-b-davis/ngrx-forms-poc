interface PunkAPIResult {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: Volume;
  boil_volume: BoilVolume;
  method: Method;
  ingredients: Ingredients;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}
interface Volume {
  value: number;
  unit: string;
}
interface BoilVolume {
  value: number;
  unit: string;
}
interface Method {
  mash_temp: MashTempItem[];
  fermentation: Fermentation;
  twist: null;
}
interface MashTempItem {
  temp: Temp;
  duration: number;
}
interface Temp {
  value: number;
  unit: string;
}
interface Fermentation {
  temp: Temp;
}
interface Ingredients {
  malt: MaltItem[];
  hops: HopsItem[];
  yeast: string;
}
interface MaltItem {
  name: string;
  amount: Amount;
}
interface Amount {
  value: number;
  unit: string;
}
interface HopsItem {
  name: string;
  amount: Amount;
  add: string;
  attribute: string;
}
