/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, DefaultValue, selector } from 'recoil';

// TODO: split state into separate atoms (one selector for all state) or refactor to redux

const guardRecoilDefaultValue = (candidate: any): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true;
  return false;
};

type Notifications = {
  '24h': boolean;
  '1h': boolean;
  '5min': boolean;
  grandAuction: boolean;
};
export interface IAuctionCreation {
  title: string;
  categoryGroup: string;
  category: string;
  condition: string;
  description: string;
  photos: File[];
  brand: string;

  price: number | null;
  buyNowPriceToggle: boolean;
  buyNowPrice: number | null;

  durationInDays: string;
  durationInHours: string;
  startNowToggle: boolean;
  startDate: Date;
  startHour: number;
  autoExtend: boolean;
  grandAuction: boolean;

  autoRestartToggle: boolean;
  additionalCategoriesToggle: boolean;
  verboseStatisticsToggle: boolean;
  additionalCosts: number;

  '24h': boolean;
  '1h': boolean;
  '5min': boolean;
  grandAuctionNotification: boolean;
}

export const defaultAuctionCreationState: IAuctionCreation = {
  title: '',
  categoryGroup: '',
  category: '',
  condition: '',
  description: '',
  photos: [],
  brand: '',

  price: null,
  buyNowPriceToggle: false,
  buyNowPrice: null,

  durationInDays: '',
  durationInHours: '',
  startNowToggle: true,
  startDate: new Date(),
  startHour: Number(new Date().getHours()),
  autoExtend: false,
  grandAuction: false,

  autoRestartToggle: false,
  additionalCategoriesToggle: false,
  verboseStatisticsToggle: false,
  additionalCosts: 0,

  '24h': false,
  '1h': false,
  '5min': false,
  grandAuctionNotification: false,
};

export const auctionCreationAtom = atom({
  key: 'auctionCreation',
  default: defaultAuctionCreationState,
});

export const auctionCreationPhotos = selector<any[]>({
  key: 'auctionCreationPhotos',
  get: ({ get }) => get(auctionCreationAtom).photos,
  set: ({ set, get }, newValue) => {
    if (guardRecoilDefaultValue(newValue)) return;

    set(auctionCreationAtom, {
      ...get(auctionCreationAtom),
      photos: newValue,
    });
  },
});

export const auctionCreationTitle = selector<string>({
  key: 'auctionCreationTitle',
  get: ({ get }) => get(auctionCreationAtom).title,
});

export const auctionCreationDate = selector<{ startDate: Date; endDate: Date }>(
  {
    key: 'auctionCreationDate',
    get: ({ get }) => {
      const { startDate, startHour, durationInDays, durationInHours } =
        get(auctionCreationAtom);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + Number(durationInDays));
      endDate.setHours(Number(startHour) + Number(durationInHours));

      return { startDate, endDate };
    },
  },
);

export const auctionAdditionalCosts = selector<number>({
  key: 'auctionAdditionalCosts',
  get: ({ get }) => {
    return get(auctionCreationAtom).additionalCosts;
  },
  set: ({ set, get }, newValue) => {
    if (guardRecoilDefaultValue(newValue)) return;

    set(auctionCreationAtom, {
      ...get(auctionCreationAtom),
      additionalCosts: newValue,
    });
  },
});

export const auctionCreationNotifications = selector<Notifications>({
  key: 'auctionCreationNotifications',
  get: ({ get }) => {
    const notifications = {
      '24h': get(auctionCreationAtom)['24h'],
      '1h': get(auctionCreationAtom)['1h'],
      '5min': get(auctionCreationAtom)['5min'],
      grandAuction: get(auctionCreationAtom)['grandAuction'],
    };

    return notifications;
  },
  set: ({ set, get }, newValue) => {
    if (guardRecoilDefaultValue(newValue)) return;

    set(auctionCreationAtom, {
      ...get(auctionCreationAtom),
      ...newValue,
    });
  },
});

export enum AuctionType {
  buyNow = 'BUY_NOW',
  autoExtend = 'AUTO_EXTEND',
  grandAuction = 'GRAND_AUCTION',
  multiItemListing = 'MULTI_ITEM_LISTING',
}
export interface AuctionCreationStateForRequest {
  title: string;
  categoryGroup: string;
  category: string;
  description: string;
  brand: string;
  startingPrice: number;
  auctionType: AuctionType[];
  buyNowPrice?: number;
  endDate: Date;
  images: File[];
}

export const auctionCreationStateForRequest =
  selector<AuctionCreationStateForRequest>({
    key: 'auctionCreationStateForRequest',
    get: ({ get }) => {
      const auctionCreationState = get(auctionCreationAtom);

      const endDate = new Date(
        Date.now() +
          24 * 60 * 60 * 1000 * Number(auctionCreationState.durationInDays) +
          60 * 60 * 1000 * Number(auctionCreationState.durationInHours),
      );

      const requestObject: AuctionCreationStateForRequest = {
        title: auctionCreationState.title,
        categoryGroup: auctionCreationState.categoryGroup,
        category: auctionCreationState.category,
        description: auctionCreationState.description,
        brand: auctionCreationState.brand,
        startingPrice: Number(auctionCreationState.price),
        endDate,
        auctionType: [],
        images: auctionCreationState.photos,
      };

      if (auctionCreationState.autoExtend) {
        requestObject.auctionType.push(AuctionType.autoExtend);
      }

      if (auctionCreationState.grandAuction) {
        requestObject.auctionType.push(AuctionType.grandAuction);
      }

      if (auctionCreationState.buyNowPrice) {
        requestObject.buyNowPrice = Number(auctionCreationState.buyNowPrice);
        requestObject.auctionType.push(AuctionType.buyNow);
      }

      return requestObject;
    },
  });
