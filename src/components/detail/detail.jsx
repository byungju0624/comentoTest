import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as Arrow } from "../../assets/-navigate-before_90417.svg";
import { Link } from "react-router-dom";
import "./detail.scss";
const Detail = ({ match }, props) => {
  const [data, setData] = useState([]);
  const { id } = match.params;

  let config = {
    method: "get",
    url: `https://problem.comento.kr/api/view?id=${id}`,
    headers: {
      Accept: "application/json",
    },
  };
  useEffect(() => {
    axios(config)
      .then(function (response) {
        setData(response?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="detail_Container">
      <div className="detail_arrow">
        <Link to="/">
          <Arrow />
        </Link>
      </div>
      <article className="detail_Contents">
        <div className="detail_Title">{data?.title}</div>
        <div className="detail_Story">{data?.contents}</div>
        <div className="detail_date">{data?.created_at?.slice(0, 10)}</div>
      </article>
      <article className="detail_Reply">
        <div className="detail_Counter">
          <div className="detail_Text">답변 </div>
          <div className="detail_Number">{data?.reply?.length}</div>
        </div>
        {data?.reply?.map((u) => {
          return (
            <article className="detail_ReplyList">
              <div className="detail_User">{u.user.name}</div>
              <div className="detail_ReplyText">{u.contents}</div>
              <div className="detail_ReplyDate">
                {u.created_at.slice(0, 10)}
              </div>
            </article>
          );
        })}
      </article>
    </div>
  );
};

export default Detail;
