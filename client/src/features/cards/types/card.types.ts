export interface IUserCard {
  id: number;
  cardLast4: string;
  cardBrand: CardBrand;
}

export type CardBrand = 'MIR' | 'VISA' | 'MASTERCARD';

export interface ICreateCard {
  expireMonth: number;
  expireYear: number;
  cardLast4: string;
  cardBrand?: CardBrand;
}
