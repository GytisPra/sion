const LargeImage = ({ className = '', ...props }) => {
  return (
    <svg
      width='76'
      height='76'
      viewBox='0 0 76 76'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M55.2116 0.999023H20.6036C8.55563 0.999023 0.999634 9.53502 0.999634 21.615V54.199C0.999634 66.279 8.52363 74.815 20.6036 74.815H55.1916C67.2916 74.815 74.8116 66.279 74.8116 54.199V21.615C74.8276 9.53502 67.3036 0.999023 55.2116 0.999023Z'
        stroke='black'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M32.8141 25.1399C32.8141 29.2199 29.5101 32.5239 25.4301 32.5239C21.3541 32.5239 18.0461 29.2199 18.0461 25.1399C18.0461 21.0599 21.3541 17.7559 25.4301 17.7559C29.5061 17.7599 32.8101 21.0639 32.8141 25.1399Z'
        stroke='black'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M74.828 49.8036C71.136 46.0036 64.036 38.3276 56.316 38.3276C48.592 38.3276 44.14 55.2596 36.712 55.2596C29.284 55.2596 22.536 47.6036 16.584 52.5116C10.632 57.4156 5 67.4436 5 67.4436'
        stroke='black'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default LargeImage;
