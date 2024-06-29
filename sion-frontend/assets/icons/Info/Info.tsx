const Info = ({ className = '', ...props }) => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M14.334 0.75H5.665C2.644 0.75 0.75 2.889 0.75 5.916V14.084C0.75 17.111 2.635 19.25 5.665 19.25H14.333C17.364 19.25 19.25 17.111 19.25 14.084V5.916C19.25 2.889 17.364 0.75 14.334 0.75Z'
      stroke='#006D77'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M9.99463 14V10'
      stroke='#006D77'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M9.98987 6.2041H9.99987'
      stroke='#006D77'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default Info;
