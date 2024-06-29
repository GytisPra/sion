import { atom } from 'recoil';

enum Level {
  Blocked = 'Blocked',
  WatchList = 'WatchList',
  Zero = 'Zero',
  One = 'One',
  Two = 'Two',
  Three = 'Three',
  Veteran = 'Veteran',
  Elite = 'Elite',
}

interface IUserState {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  karmaPoints: number;
  phone: string;
  roles: string[];
  isVerified: boolean;
  level: Level;
}

const defaultUserState: IUserState | null = null;

export const userAtom = atom({
  key: 'userState',
  default: defaultUserState,
});
