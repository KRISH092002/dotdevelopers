const Icon = ({ name, size, className = '' }) => (
    <svg  className={className} width={size ? size : undefined} height={size ? size : undefined}>
      <use href={`/svg/spritemap.svg#icon-${name}`} />
    </svg>
  );
  
  export default Icon;
  