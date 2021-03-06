import React from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import GradeBall from "../PublicComponents/GradeBall";
import { Card } from "reactstrap";

function FellowProfileCard(props) {
  const list = props.list;

  let userId = jwt_decode(localStorage.getItem("token")).id;

  const history = useHistory();
  const showFellowDetail = (memberId) => {
    if (memberId === userId) {
      history.push("/member/profile");
    } else {
      history.push(`/member/fellow/${memberId}`);
    }
  };

  return (
    <>
      <div className="col-lg-3 col-md-3 p-3">
        <Card
          className="border-0 follow-card"
          onClick={() => showFellowDetail(list.followerId || list.followingId)}
        >
          <div className="row d-flex g-0">
            <div className="col-lg-3 text-center">
              <img
                src={list.profilePath}
                alt="Profile pic"
                className="follow-pic"
              />
            </div>
            <div className="col-lg-9 text-center follow-body">
              <div className="mt-3">
                <GradeBall grade={list.grade} />
                <span>
                  {list.username} <br />
                  UID#{list.followerId || list.followingId}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default FellowProfileCard;
