import { React, useState, useEffect } from 'react';
import Star from '../../ratings-and-reviews/Star';

function PhotoGallery({ photoArr, setPhotoUrl, setShow }) {
  return (
    photoArr.map((url, index) => {
      if (url === null) {
        url = require('../assets/Image_not_available.jpg');
      }
      return (
        <li key={url + index} className="thumphoto">
          <img
            src={url}
            onError={(e) => { e.target.src = require('../assets/Image_not_available.jpg'); }}
            alt="header"
            width="40"
            height="40"
            onClick={() => {
              setPhotoUrl(url);
            }}
            onMouseEnter={() => { setShow(true); }}
            onMouseLeave={() => setShow(false)}
          />
        </li>
      );
    })
  );
}

function CardDetail({
  ratings, name, originalPrice, salePrice, category, mainUrl,
  photoArr, setProductId, id, setStoreArr, storeArr,
}) {
  const [show, setShow] = useState(false);
  const [photoUrl, setPhotoUrl] = useState('');
  console.log(storeArr);
  if (mainUrl === null) {
    mainUrl = require('../assets/Image_not_available.jpg');
  }

  const obj = {};
  obj.ratings = ratings;
  obj.name = name;
  console.log('name', obj.name);
  obj.originalPrice = originalPrice;
  obj.salePrice = salePrice;
  obj.category = category;
  obj.mainUrl = mainUrl;
  obj.photos = photoArr;
  const store = storeArr;
  store[id.toString()] = obj;
  setStoreArr(store);
  console.log('jj');
  useEffect(() => {
    setPhotoUrl(mainUrl);
  }, [mainUrl]);
  const handleClick = () => {
    setProductId(id);
  };
  const rating = Math.round((ratings) * 10) / 10;
  const ifSale = salePrice !== null;
  return (
    <div>
      <img
        className="mainImg"
        src={photoUrl}
        onError={(e) => { e.target.src = require('../assets/Image_not_available.jpg'); }}
        alt="header"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />
      {show && <ul className="list-gallery"><PhotoGallery setShow={setShow} photoArr={photoArr} setPhotoUrl={setPhotoUrl} /></ul>}
      <p className="category">
        {category}
      </p>
      <p onClick={() => { handleClick(); }} className="name">
        {name}
      </p>

      {ifSale && (
      <span className="price">
        <p>
          <s>
            $
            {' '}
            {originalPrice}
          </s>
        </p>
        <p className="salesPrice">
          $
          {' '}
          {salePrice}
        </p>
      </span>
      )}
      {!ifSale && (
      <p className="price">
        $
        {' '}
        {originalPrice}
      </p>
      )}

      <span className="ratings">
        <p>
          ratings:
          {' '}
          {rating}
        </p>
        <Star rating={rating} />
      </span>

    </div>

  );
}
export default CardDetail;
