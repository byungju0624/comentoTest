import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../common/button.jsx";
import FilterModal from "../common/filterModal/filterModal";
import "./writingList.scss";

const WritingList = (props) => {
  const [list, setList] = useState([]);
  let reverseList = list?.reverse();
  const [checked, setChecked] = useState("오름차순");
  const [max, setMax] = useState(33);
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(10);
  const [preItems, setPreItems] = useState(0);
  let config = {
    method: "get",
    url: `https://problem.comento.kr/api/list?page=1&ord=""&category[]=1&limit=${max}`,
    headers: {
      Accept: "application/json",
    },
  };
  const orderOnClick = (e) => {
    let ascending = document.getElementsByClassName("home_Ascending");
    let ascendingPoint = document.getElementsByClassName("home_AscendingPoint");
    let descending = document.getElementsByClassName("home_Descending");
    let descendingPoint = document.getElementsByClassName(
      "home_DescendingPoint"
    );
    if (e.target.innerText === "오름차순") {
      ascending[0].style.color = "#495057";
      ascendingPoint[0].style.backgroundColor = "#00C854";
      descending[0].style.color = "#ADB5BD";
      descendingPoint[0].style.backgroundColor = "#E1E4E7";
      setChecked(e.target.innerText);
    } else if (e.target.innerText === "내림차순") {
      ascending[0].style.color = "#ADB5BD";
      ascendingPoint[0].style.backgroundColor = "#E1E4E7";
      descending[0].style.color = "#495057";
      descendingPoint[0].style.backgroundColor = "#00C854";
      setChecked(e.target.innerText);
    }
  };

  useEffect(() => {
    axios(config)
      .then(function (response) {
        console.log(response.data);
        setList(response?.data?.data?.slice(preItems, items));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // const infiniteScroll = () => {
  //   let scrollHeight = Math.max(
  //     document.documentElement.scrollHeight,
  //     document.body.scrollHeight
  //   );
  //   let scrollTop = Math.max(
  //     document.documentElement.scrollTop,
  //     document.body.scrollTop
  //   );
  //   let clientHeight = document.documentElement.clientHeight;

  //   if (scrollTop + clientHeight === scrollHeight) {
  //     setItems(items + 10);
  //     setPreItems(preItems);
  //     return;
  //   }
  // };
  // console.log(items);
  // useEffect(() => {
  //   window.addEventListener("scroll", infiniteScroll, true);
  // }, [items]);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <header className="myName">
        <span>[2021.05.24]정병주</span>
      </header>
      <>
        <Button />
        <article className="home_Container">
          <header className="home_OrderBar">
            <div className="home_Order">
              <div className="home_AscendingPoint"></div>
              <div className="home_Ascending" onClick={orderOnClick}>
                오름차순
              </div>
              <div className="home_DescendingPoint"></div>
              <div className="home_Descending" onClick={orderOnClick}>
                내림차순
              </div>
            </div>
            <button className="home_FilterButton" onClick={openModal}>
              필터
            </button>
            <FilterModal isOpen={isOpen} close={closeModal} />
          </header>

          {checked === "오름차순"
            ? list?.map((u) => {
                let id = u.id;

                return (
                  <Link
                    to={`/${id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <section className="writingList">
                      <div className="home_IdContainer">
                        <div className="home_CategoryId">{u.category_id}</div>
                        <div className="home_Id">{u.id}</div>
                      </div>
                      <div className="home_User">
                        <div className="home_UserId">{u.user_id}</div>
                        <div className="home_Date">
                          {u.created_at.slice(0, 10)}
                        </div>
                      </div>
                      <div className="home_Contents">
                        <div className="home_ContentsTitle">{u.title}</div>
                        <div className="home_ContentsContext">{u.contents}</div>
                      </div>
                    </section>
                  </Link>
                );
              })
            : reverseList.map((u) => {
                let id = u.id;
                return (
                  <Link
                    to={`/${id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <section className="writingList">
                      <div className="home_IdContainer">
                        <div className="home_CategoryId">{u.category_id}</div>
                        <div className="home_Id">{u.id}</div>
                      </div>
                      <div className="home_User">
                        <div className="home_UserId">{u.user_id}</div>
                        <div className="home_Date">
                          {u.created_at.slice(0, 10)}
                        </div>
                      </div>
                      <div className="home_Contents">
                        <div className="home_ContentsTitle">{u.title}</div>
                        <div className="home_ContentsContext">{u.contents}</div>
                      </div>
                    </section>
                  </Link>
                );
              })}
        </article>
      </>
    </>
  );
};

export default WritingList;
