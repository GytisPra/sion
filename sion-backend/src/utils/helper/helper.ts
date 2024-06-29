export const roundAuctionPrice = (price: number) => {
  if (price >= 100) {
    return Math.round(price);
  } else if (price >= 10 && price <= 100) {
    return Math.round(price * 10) / 10;
  }
  return price;
};
