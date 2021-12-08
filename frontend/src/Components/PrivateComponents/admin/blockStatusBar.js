import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Modal, Button } from "react-bootstrap";
import { GetUserBlock, PutUserBlock } from "../../../Redux/adminData/action";

import "../../../Pages/SCSS/memberProfile.scss";
import "../../../Pages/SCSS/dashboard.scss";

export function BlockStatusBar() {
  const { userIsBlock } = useSelector((state) => state.adminDataStore);
  const [modalBoolean, setModalBoolean] = useState(false);
  const dispatch = useDispatch();
  let { id } = useParams();

  const closeModal = () => {
    setModalBoolean(false);
  };
  const BlockUser = (id) => {
    console.log(id);
    setModalBoolean(false);
    if (userIsBlock) {
      dispatch(PutUserBlock(id, false));
    } else {
      dispatch(PutUserBlock(id, true));
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(GetUserBlock(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <div className="container py-4">
        <div className="row">
          {userIsBlock ? (
            <div className="d-flex justify-content-center align-items-center col-lg-12 mb-5 memberProfileBottom-black">
              <Button
                className="btn-white-black"
                onClick={() => setModalBoolean(true)}
              >
                BLOCKED
              </Button>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center col-lg-12 mb-5 memberProfileBottom-blue">
              <Button
                className="btn-white-blue"
                onClick={() => setModalBoolean(true)}
              >
                BLOCK
              </Button>
            </div>
          )}
        </div>
      </div>
      <Modal
        show={modalBoolean}
        onHide={closeModal}
        contentClassName="block-user-modal"
        className="border-0"
      >
        <div closeButton className="block-user-heading p-3">
          {userIsBlock ? `Unblock` : `Are you going to block this user?`}
        </div>
        <div className="p-3">
          {userIsBlock
            ? `Are you going to unblock this user?`
            : `Are you going to block this user?`}
        </div>
        <div className="block-user-footer">
          <button className="btn-dark-blue m-2" onClick={() => BlockUser(id)}>
            Yes
          </button>
          <button className="btn-dark-blue m-2" onClick={closeModal}>
            No
          </button>
        </div>
      </Modal>
    </>
  );
}
