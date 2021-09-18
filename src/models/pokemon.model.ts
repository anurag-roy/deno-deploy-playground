export interface Pokemon {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    'Sp. Attack': number;
    'Sp. Defense': number;
    Speed: number;
  };
}
