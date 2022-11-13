import ContentLoader from 'react-content-loader';

const CardSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      viewBox="0 0 800 100"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  );
};

export default CardSkeleton;
