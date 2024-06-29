export const NO_ENTRIES_FOUND = <T>(meta?: T) => ({
  code: 20000,
  message: 'NoEntriesFound',
  description: 'No entry/entries with specified data was found.',
  meta: meta || undefined,
});

export const ITEM_IS_SOLD = <T>(meta: T) => ({
  code: 20001,
  message: 'ItemIsSold',
  description: 'The item has already been bought.',
  meta: meta || undefined,
});

export const NO_IMAGE_PROVIDED = () => ({
  code: 20004,
  message: 'NoImageProvided',
  description: 'There was no image provided.',
});

export const FILE_FORMAT_IS_WRONG = <T>(meta: T) => ({
  code: 20005,
  message: 'FileFormatIsWrong',
  description: 'The file format provided is wrong.',
  meta: meta || undefined,
});

export const AUCTION_NOT_AVAILABLE = <T>(meta: T) => ({
  code: 20002,
  message: 'AuctionIsNotAvailable',
  description: 'The auction for this item is unavailable.',
  meta: meta || undefined,
});

export const DUPLICATE_ENTRY = <T>(meta: T) => ({
  code: 20003,
  message: 'DuplicateEntry',
  description: 'Duplicate entry/entries has been found.',
  meta: meta || undefined,
});

export const PRICE_TOO_LOW = <T>(meta: T) => ({
  code: 20004,
  message: 'PriceTooLow',
  description: 'The price is too low.',
  meta: meta || undefined,
});

export const TWO_SAME_USER_BIDS_IN_A_ROW = () => ({
  code: 20005,
  message: 'TwoSameUserBidsInARow',
  description: 'he same user can not place two bids in a row.',
});

export const NOT_ENOUGH_KARMA = <T>(meta: T) => ({
  code: 20006,
  message: 'NotEnoughKarmaPoints',
  description: 'Not enough karma points.',
  meta: meta || undefined,
});

export const NOT_ENOUGH_TIME_HAS_PASSED = <T>(meta: T) => ({
  code: 20007,
  message: 'NotEnoughTimeHasPassed',
  description: 'Not enough time has passed.',
  meta: meta || undefined,
});

export const LINK_HAS_EXPIRED = <T>(meta: T) => ({
  code: 20008,
  message: 'LinkHasExpired',
  description: 'The link has expired.',
  meta: meta || undefined,
});

export const USER_IS_VERIFIED = <T>(meta: T) => ({
  code: 20009,
  message: 'UserIsVerified',
  description: 'User has already been verified.',
  meta: meta || undefined,
});

export const AUCTION_TIME_INVALID = <T>(meta: T) => ({
  code: 20010,
  message: 'AuctionTimeIsInvalid',
  description: 'Time for auction is invalid.',
  meta: meta || undefined,
});

export const NO_UPDATE_BODY_PROVIDED = <T>(meta: T) => ({
  code: 20011,
  message: 'NoUpdateBodyProvided',
  description: 'There was no update body provided.',
  meta: meta || undefined,
});

export const RESET_PASSWORD_STARTED = <T>(meta: T) => ({
  code: 20012,
  message: 'ResetPasswordStarted',
  description: 'The process of password reset has started.',
  meta: meta || undefined,
});

export const CANCELLATION_TIME_INVALID = <T>(meta: T) => ({
  code: 20013,
  message: 'CancellationTimeIsInavlid',
  description:
    'The end time for the auction is less then 4h or the auction has already finished.',
  meta: meta || undefined,
});

export const RENEWAL_TIME_INVALID = <T>(meta: T) => ({
  code: 20014,
  message: 'RenewalTimeInvalid',
  description: "The auction has not ended so it can't be renewed.",
  meta: meta || undefined,
});

export const RENEWAL_UNAVAILABLE = <T>(meta: T) => ({
  code: 20015,
  message: 'RenewalUnavailable',
  description:
    "The auction can't be renewd because there were bids placed and there already is a winner.",
  meta: meta || undefined,
});

export const RENEWAL_INVALID = <T>(meta: T) => ({
  code: 20016,
  message: 'RenewalInvalid',
  description: 'You must provide a new valid endDate when renewing an auction.',
  meta: meta || undefined,
});

export const OVER_MAXIMUM_BID_LIMIT = <T>(meta: T) => ({
  code: 20017,
  message: 'OverMaximumBidLimit',
  description: 'User has reached bid limit for auto extend auction.',
  meta: meta || undefined,
});

export const EMAIL_REGISTERED_WITH_ANOTHER_PROVIDER = <T>(meta: T) => ({
  code: 20018,
  message: 'EmailRegisteredWithAnotherProvider',
  description:
    'Email is already registered with another authentication provider.',
  meta: meta || undefined,
});

export const USER_TOO_YOUNG = <T>(meta: T) => ({
  code: 20019,
  message: 'UserTooYoung',
  description: 'User needs to be 14 or older.',
  meta: meta || undefined,
});

export const USER_NOT_FOUND = <T>(meta: T) => ({
  code: 20020,
  message: 'UserNotFound',
  description: 'User not found.',
  meta: meta || undefined,
});

export const CODE_HAS_EXPIRED = <T>(meta: T) => ({
  code: 20021,
  message: 'CodeHasExpired',
  description: 'The verification code has expired.',
  meta: meta || undefined,
});

export const POSSIBLE_BIDS_NUMBER_NOT_FOUND = () => ({
  code: 20022,
  message: 'PossibleBidsNumberNotFound',
  description: 'Possible bids number was not found for provided auction.',
});

// *********************************************

export const UNAUTHORIZED = () => ({
  code: 10001,
  message: 'Unauthorized',
  description: 'Authorization is not provided or is not valid.',
});

export const INSUFFICIENT_ROLES = <T>(meta: T) => ({
  code: 10002,
  message: 'InsufficientRoles',
  description: 'The user does not sufficient roles to perform this action.',
  meta: meta || undefined,
});

export const USER_IS_NOT_VERIFIED = () => ({
  code: 10003,
  message: 'UserIsNotVerified',
  description: 'The user is not verified to perform this action.',
});

export const WRONG_CREDENTIALS = () => ({
  code: 10004,
  message: 'WrongCredentials',
  description: 'Wrong user credentials were provided.',
});

export const TOKEN_REFRESH_NOT_AVAILABLE = <T>(meta: T) => ({
  code: 10005,
  message: 'TokenRefreshNotAvailable',
  description: 'Token refresh is not available.',
  meta: meta || undefined,
});

export const VALIDATION_ERROR = <T>(meta: T) => ({
  code: 10006,
  message: 'ValidationError',
  description: 'The request provided do not comply with the request format.',
  meta: meta || undefined,
});

// *********************************************

export const INTERNAL_SERVER_ERROR = () => ({
  code: 90000,
  message: 'InternalServerError',
  description: 'Internal server error has occured.',
});
