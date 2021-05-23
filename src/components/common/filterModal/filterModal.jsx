import React, { useEffect, useState } from "react";
import axios from "axios";
import "./filterModal.scss";
import { ReactComponent as Close } from "../../../assets/그룹 560.svg";
const FilterModal = (props) => {
  const { isOpen, close } = props;
  const [category, setCategory] = useState([]);
  let config = {
    method: "get",
    url: "https://problem.comento.kr/api/category",
    headers: {
      Accept: "application/json",
    },
  };
  useEffect(() => {
    axios(config)
      .then((res) => {
        setCategory(res?.data?.category);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {isOpen ? (
        <div className="filter_Container">
          <div>
            <div className="filter_Modal">
              <Close className="filter_Close" onClick={close} />
              <div className="filter_Tilte">필터</div>

              <form className="filter_Category">
                {category.map((items) => {
                  console.log(items);
                  return (
                    <div className="filter_Items">
                      <input
                        type="checkbox"
                        className="filter_CheckBox"
                        checked={true}
                      />
                      <label className="filter_ItemName">{items.name}</label>
                    </div>
                  );
                })}
              </form>
              <button onClick={close} className="filter_Button">
                저장하기
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FilterModal;
