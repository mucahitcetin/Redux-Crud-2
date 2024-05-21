import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { deleteDataFunc, updateDataFunc } from "../redux/dataSlice";

const ProductCard = ({ dt }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [updatedProductInfo, setUpdatedProductInfo] = useState({
    name: dt.name,
    price: dt.price,
    url: dt.url,
  });
  const dispatch = useDispatch();

  const handleUpdateChange = (e) => {
    setUpdatedProductInfo({
      ...updatedProductInfo,
      [e.target.name]: e.target.value,
    });
  };

  const updateFunc = () => {
    setEditMode(true);
    setOpenEdit(false);
  };

  const saveUpdateFunc = () => {
    dispatch(updateDataFunc({ ...updatedProductInfo, id: dt.id }));
    setEditMode(false);
  };

  return (
    <div className="w-[200px] h-[200px] relative m-2 rounded-md border border-indigo-600">
      <img src={dt?.url} className="w-full h-full rounded-md" alt="" />
      <div className="absolute left-0 bottom-0 bg-indigo-600 text-white w-full px-2">
        <div className="text-lg font-semibold">{dt?.name}</div>
        <div>{dt?.price}$</div>
      </div>
      <div
        onClick={() => setOpenEdit(!openEdit)}
        className="absolute top-0 right-2"
      >
        <BsThreeDots color="indigo" size={24} />
      </div>
      {openEdit && (
        <div className="bg-indigo-600 border border-white text-white absolute top-5 right-2 p-2 text-sm">
          <div
            onClick={() => dispatch(deleteDataFunc(dt?.id))}
            className="cursor-pointer"
          >
            Sil
          </div>
          <div onClick={updateFunc} className="cursor-pointer">
            Güncelle
          </div>
        </div>
      )}
      {editMode && (
        <div className="absolute top-0 left-0 w-full h-full bg-white p-4">
          <div className="mb-2">
            <input
              type="text"
              name="name"
              value={updatedProductInfo.name}
              onChange={handleUpdateChange}
              placeholder="Ürün Adı"
              className="w-full"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="price"
              value={updatedProductInfo.price}
              onChange={handleUpdateChange}
              placeholder="Ürün Fiyatı"
              className="w-full"
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="url"
              value={updatedProductInfo.url}
              onChange={handleUpdateChange}
              placeholder="Ürün URL"
              className="w-full"
            />
          </div>
          <button
            onClick={saveUpdateFunc}
            className="bg-indigo-600 text-white p-2 rounded-md"
          >
            Kaydet
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
