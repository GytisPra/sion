const ArrowLeftCircle = ({ className = '', ...props }) => (
  <svg
    width='40'
    height='40'
    viewBox='0 0 40 40'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M20 1.50049C9.784 1.50049 1.5 9.78249 1.5 20.0005C1.5 30.2165 9.784 38.5005 20 38.5005C30.216 38.5005 38.5 30.2165 38.5 20.0005C38.5 9.78249 30.216 1.50049 20 1.50049Z'
      stroke='#979797'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M22.8846 13.0581L15.9126 20.0001L22.8846 26.9421'
      stroke='#979797'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export default ArrowLeftCircle;
