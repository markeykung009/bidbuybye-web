import { createContext, useEffect, useState } from 'react';
import { DEFAULT, STEP_SELLER, STEP_BUYER } from '../constants/productDetail';
import * as productApi from '../apis/product-api';
import * as bidApi from '../apis/bid-api';

export const ProductContext = createContext();

export default function ProductContextProvider({ children }) {
  //state for change to sell, buy, bid or ask
  const [step, setStep] = useState(DEFAULT);
  const [productDetail, setProductDetail] = useState();
  const [askPrice, setAskPrice] = useState();
  const [bidPrice, setBidPrice] = useState();
  const [size, setSize] = useState();
  //size to send to back
  const [selectSize, setSelectSize] = useState();
  //equipment to send to back
  const [selectEquipment, setSelectEquipment] = useState(null);
  //keep price from input
  const [priceSeller, setPriceSeller] = useState('');
  const [savedValue, setSavedValue] = useState('');
  //state keep product
  const [product, setProduct] = useState();
  const [error, setError] = useState('');
  const [typeUser, setTypeUser] = useState('');
  // state keep minPriceBySize
  const [minPriceBySize, setMinPriceBySize] = useState();
  const [maxPriceBySize, setMaxPriceBySize] = useState();
  // console.log(bidPrice, 'bidPrice');
  //get bids by user
  const [allBid, setAllbid] = useState();

  const [NewMinPriceBySize, setNewMinPriceBySize] = useState(
    JSON.parse(localStorage.getItem('minPrice')) || {}
  );
  const [NewmaxPriceBySize, setNewMaxPriceBySize] = useState(
    JSON.parse(localStorage.getItem('maxPrice')) || {}
  );

  //click to sell page
  const onClickSeller = () => {
    setStep(STEP_SELLER.productList);
  };

  //click to buy page
  const onClickBuyer = () => {
    setStep(STEP_BUYER.selectProduct);
  };
  //click back to buy page
  const onClickBackBuyer = () => {
    setStep(STEP_BUYER.selectProduct);
  };

  // click back to sell page
  const onClickBackProduct = () => {
    setStep(STEP_SELLER.productList);
  };
  // click back to product
  const onClickBack = () => {
    setStep(DEFAULT);
  };
  //click to ask page
  const onClickAsk = () => {
    setStep(STEP_SELLER.addPrice);
  };

  //click to bid page
  const onClickBid = () => {
    setStep(STEP_BUYER.BidPrice);
  };

  //get product from id
  const fetchProductDetail = async (id) => {
    try {
      const res = await productApi.getProductDetail(id);
      setProductDetail(res.data);
    } catch (err) {}
  };

  const fetchPriceAsk = async (id) => {
    try {
      const res = await productApi.getPriceAsk(id);
      setAskPrice(res.data);
    } catch (err) {}
  };

  const fetchPriceBid = async (id) => {
    try {
      const res = await productApi.getPriceBid(id);
      setBidPrice(res.data);
      console.log(res.data);
    } catch (err) {}
  };

  const fetchSize = async () => {
    try {
      const res = await productApi.getAllSize();
      setSize(res.data);
      console.log(res.data);
    } catch (err) {}
  };

  const handleSelectSize = (e) => {
    setSelectSize(e);
  };

  const resetSelectSize = () => {
    setSelectSize('');
  };

  const handleSelectEquipment = (e) => {
    setSelectEquipment(e);
  };

  const resetSelectEquipment = () => {
    setSelectEquipment(null);
  };

  //onChange price askPrice and save

  const handleInputPrice = (e) => {
    const input = e.target.value;

    // Only allow numbers and commas
    if (/^\d*$/.test(input)) {
      setPriceSeller(input);
      setError('');
    } else {
      setError('must contain only numbers.');
    }
  };
  const handleSaveClick = () => {
    if (isNaN(priceSeller)) {
      return;
    }
    setSavedValue(priceSeller);
  };

  const resetPriceBid = () => {
    setPriceSeller('');
  };

  const resetSavedValue = () => {
    setSavedValue('');
  };

  const showPriceBySize = async () => {
    const showPrice = await bidApi.getPriceAsk(
      productDetail.products.id,
      selectSize.id
    );

    setMinPriceBySize(showPrice.data);
    setNewMinPriceBySize(showPrice.data);
  };

  const showMaxPriceBySize = async () => {
    const showPrice = await bidApi.getPriceBid(
      productDetail.products.id,
      selectSize.id
    );
    console.log(showPrice, 'showPrice.data');
    setMaxPriceBySize(showPrice.data);
    setNewMaxPriceBySize(showPrice.data);
  };

  //create ask

  const createAsk = async () => {
    const bid = await bidApi.postBid({
      sizeId: selectSize.id,
      productId: productDetail.products.id,
      price: +savedValue,
      type: typeUser,
      equipment: selectEquipment
    });
  };

  //create bid

  const createBid = async () => {
    const bid = await bidApi.postBid({
      sizeId: selectSize.id,
      productId: productDetail.products.id,
      price: +priceSeller,
      type: typeUser,
      equipment: selectEquipment
    });
  };

  const fetchAllBids = async () => {
    try {
      const res = await bidApi.getBids();
      // console.log('fetchAllBids', res);
      setAllbid(res.data);
    } catch (err) {}
  };

  const resetAllSelected = () => {
    setSelectSize('');
    setSelectEquipment(null);
    setPriceSeller('');
    setSavedValue('');
    setTypeUser('');
    setStep(DEFAULT);
  };

  const cancelBid = async (id) => {
    try {
      const bid = await bidApi.deleteBid({
        id: id
      });
    } catch (err) {}
  };

  return (
    <ProductContext.Provider
      value={{
        step,
        onClickSeller,
        onClickBuyer,
        onClickAsk,
        onClickBack,
        onClickBackProduct,
        onClickBackBuyer,
        onClickBid,
        fetchProductDetail,
        productDetail,
        askPrice,
        fetchPriceAsk,
        bidPrice,
        fetchPriceBid,
        fetchSize,
        size,
        handleSelectSize,
        selectSize,
        resetSelectSize,
        handleSelectEquipment,
        selectEquipment,
        resetSelectEquipment,
        handleInputPrice,
        priceSeller,
        handleSaveClick,
        savedValue,
        resetPriceBid,
        error,
        product,
        setProduct,
        setTypeUser,
        showPriceBySize,
        minPriceBySize,
        createBid,
        maxPriceBySize,
        showMaxPriceBySize,
        NewMinPriceBySize,
        NewmaxPriceBySize,
        fetchAllBids,
        allBid,
        createAsk,
        resetAllSelected,
        resetSavedValue,
        cancelBid
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
