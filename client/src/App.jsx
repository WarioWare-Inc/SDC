import { React, useEffect, useState } from 'react';
import Overview from './components/overview/Overview';
import RatingAndReview from './components/ratings-and-reviews/index';
import RelatedAndOutfit from './components/related-items-and-outfit/index';

function App() {
  const [productId, setProductId] = useState('40306');

  return (
    <div>
      <Overview productId={productId} setProductId={setProductId} />
    </div>
    <>
      <RatingAndReview />
    </>
  );
}

export default App;
