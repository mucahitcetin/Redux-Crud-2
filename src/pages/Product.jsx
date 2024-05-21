import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { modalFunc } from "../redux/modalSlice";
import { createDataFunc } from "../redux/dataSlice";

const Product = () => {
  const { modal } = useSelector((state) => state.modal);
  const { data, keyword } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: "",
  });

  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo((prev) => ({
        ...prev,
        [e.target.name]: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setProductInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };
  const buttonFunc = () => {
    dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }));
    dispatch(modalFunc());
  };
  const contentModal = (
    <>
      <Input
        type="text"
        placeholder={"Ürün Ekle"}
        id={"name"}
        name={"name"}
        onChange={(e) => onChangeFunc(e, "name")}
      />
      <Input
        type="text"
        placeholder={"Fiyat Ekle"}
        id={"price"}
        name={"price"}
        onChange={(e) => onChangeFunc(e, "price")}
      />
      <Input
        type="file"
        placeholder={"REsim Seç"}
        id={"url"}
        name={"url"}
        onChange={(e) => onChangeFunc(e, "url")}
      />
      <Button btnText={"Oluştur"} onClick={buttonFunc} />
    </>
  );
  const filteredItems = data.filter((dt) =>
    dt.name.toLowerCase().includes(keyword)
  );
  return (
    <div>
      <div className="flex items-center flex-wrap">
        {filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && <Modal content={contentModal} title={"Ürün oluştur"} />}
    </div>
  );
};

export default Product;
