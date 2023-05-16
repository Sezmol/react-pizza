import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderCard = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="10" ry="10" width="280" height="260" />
    <rect x="0" y="317" rx="10" ry="10" width="280" height="85" />
    <rect x="0" y="271" rx="5" ry="5" width="280" height="24" />
    <rect x="0" y="426" rx="5" ry="5" width="89" height="27" />
    <rect x="125" y="420" rx="31" ry="31" width="155" height="40" />
  </ContentLoader>
);

export default LoaderCard;
