const Flame = ({ className = '', ...props }) => (
  <svg
    width='10'
    height='14'
    viewBox='0 0 10 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
    {...props}
  >
    <path
      d='M2.5 5.00029C2.5 4.20875 1.44722 3.99895 1.16791 4.73957C0.492283 6.53109 0 8.13374 0 9.00022C0 11.7616 2.23858 14.0002 5 14.0002C7.76142 14.0002 10 11.7616 10 9.00022C10 8.06931 9.43178 6.28866 8.67844 4.33698C7.70257 1.80879 7.21464 0.544691 6.61233 0.476604C6.4196 0.454817 6.20934 0.493988 6.03739 0.583715C5.5 0.864126 5.5 2.24285 5.5 5.00029C5.5 5.82872 4.82843 6.50029 4 6.50029C3.17157 6.50029 2.5 5.82872 2.5 5.00029Z'
      fill='white'
    />
  </svg>
);

export default Flame;
