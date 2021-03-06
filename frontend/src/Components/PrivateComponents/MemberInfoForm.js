import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import jwt_decode from "jwt-decode";

import {
  memberInfoThunk,
  getAllUsernameThunk,
} from "../../Redux/memberProfile/memberProfileActions";
import { memberInfoFormSubmitThunk } from "../../Redux/signup/memberInfoFormActions";
import FailureModal from "../PublicComponents/FailureModal";
import { resetSuccessMsg } from "../../Redux/signup/memberInfoFormActions";

import S3 from "react-aws-s3";
import { s3Config } from "../../s3Bucket/s3Config";

import { Form } from "react-bootstrap";
import "../../Pages/SCSS/signupPage.scss";
import "../../Pages/SCSS/loginPage.scss";

const MemberInfoForm = () => {
  let memberId = jwt_decode(localStorage.getItem("token")).id;

  // Get existing member info from store
  const memberProfileFromStore = useSelector(
    (state) => state.memberProfileStore.memberInfo
  );

  // Get all username except current member from store
  const allUsernameFromStore = useSelector(
    (state) => state.memberProfileStore.allUsername
  );
  const filteredUsername = allUsernameFromStore.filter((name) => {
    return name.id !== memberId;
  });

  // Get msg from store
  const memberInfoFormStore = useSelector((state) => state.memberInfoFormStore);
  const { successMsg, errorMsg } = memberInfoFormStore;

  const dispatch = useDispatch();
  const history = useHistory();

  const [{ src, alt }, setPreviewImg] = useState({
    src: "https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg",
    alt: "Upload an image",
  });
  const [{ bucketSrc, bucketAlt }, setBucketImg] = useState({
    bucketSrc: "",
    bucketAlt: "Profile pic",
  });
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");

  const [failureModalBoolean, setFailureModalBoolean] = useState(false);
  const [missingInfoMsg, setMissingInfoMsg] = useState("");

  // Profile pic preview
  const ImgPreview = (e) => {
    if (e.currentTarget.files[0]) {
      setPreviewImg({
        src: URL.createObjectURL(e.currentTarget.files[0]),
        alt: e.currentTarget.files[0].name,
      });
      setBucketImg({
        bucketSrc: e.currentTarget.files[0],
        bucketAlt: e.currentTarget.files[0].name,
      });
    }
  };

  const memberInfoFormSubmit = (e) => {
    e.preventDefault();

    // if (bucketSrc.length === 0) {
    //   setFailureModalBoolean(true);
    //   setMissingInfoMsg("Please insert your profile picture");
    //   return;
    // }

    if (filteredUsername.some((list) => list.username === username) === true) {
      setFailureModalBoolean(true);
      setMissingInfoMsg("Username exists. Please input another username");
      return;
    }

    if (phone.toString().length !== 8) {
      setFailureModalBoolean(true);
      setMissingInfoMsg("Please input correct phone number");
      return;
    }

    if (src.includes("amazonaws") === false) {
      let file = bucketSrc;
      let newFileName = bucketAlt;
      const ReactS3Client = new S3(s3Config);
      ReactS3Client.uploadFile(file, newFileName).then((data) => {
        dispatch(
          memberInfoFormSubmitThunk(
            username,
            firstname,
            lastname,
            phone,
            district,
            data.location
          )
        );
      });
    } else {
      dispatch(
        memberInfoFormSubmitThunk(
          username,
          firstname,
          lastname,
          phone,
          district,
          src
        )
      );
    }
    setUsername("");
    setFirstname("");
    setLastname("");
    setPhone("");
    setDistrict("");
    setPreviewImg({
      src: "https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg",
      alt: "Upload an image",
    });
    setBucketImg({
      bucketSrc: "",
      bucketAlt: "",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    dispatch(memberInfoThunk(memberId));
    dispatch(getAllUsernameThunk());
  }, [dispatch, memberId]);

  useEffect(() => {
    localStorage.setItem("Member-info", JSON.stringify(memberProfileFromStore));
  });

  useEffect(() => {
    const memberInfo = JSON.parse(localStorage.getItem("Member-info"));
    setUsername(memberInfo.username || "");
    setFirstname(memberInfo.firstName || "");
    setLastname(memberInfo.lastName || "");
    setPhone(memberInfo.phone || "");
    setDistrict(memberInfo.district || "");
    if (memberInfo.profilePath) {
      setPreviewImg({ src: memberInfo.profilePath, alt: "Upload an image" });
    } else {
      setPreviewImg({
        src: "https://utopius.s3.ap-southeast-1.amazonaws.com/anonymous.jpeg",
        alt: "Upload an image",
      });
    }
    setBucketImg({
      bucketSrc: memberInfo.profilePath,
      bucketAlt: "Profile pic",
    });
  }, []);

  useEffect(() => {
    if (successMsg !== null) {
      dispatch(memberInfoThunk(memberId));
      dispatch(resetSuccessMsg());
      history.push("/member/profile");
    }
    return () => {
      localStorage.removeItem("Member-info");
    };
  }, [memberId, successMsg, dispatch, history]);

  const closeModal = () => {
    setFailureModalBoolean(false);
  };

  return (
    <>
      <Form onSubmit={memberInfoFormSubmit}>
        <div className="d-flex align-items-center justify-content-center landing-page">
          <div className="container row p-5">
            <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="text-center">
                <h3 className="mt-4">FILL IN PERSONAL INFORMATION</h3>
                <img src={src} alt={alt} className="my-5 previewPhoto" />
                <Form.Control type="file" onChange={ImgPreview} />
              </div>
            </div>
            <div className="footer-card col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
              <div className="container">
                <Form.Group className="mt-4 mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    className="input-text"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-4 mb-3">
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    className="input-text"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.currentTarget.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-4 mb-3">
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    className="input-text"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.currentTarget.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-4 mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    className="input-text"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.currentTarget.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mt-4 mb-3">
                  <Form.Label>District</Form.Label>
                  <Form.Select
                    className="input-text"
                    value={district}
                    onChange={(e) => setDistrict(e.currentTarget.value)}
                    required
                  >
                    <option></option>
                    <option>Central and Western</option>
                    <option>Eastern</option>
                    <option>Southern</option>
                    <option>Wan Chai</option>
                    <option>Kowloon City</option>
                    <option>Kwun Tong</option>
                    <option>Sham Shui Po</option>
                    <option>Wong Tai Sin</option>
                    <option>Yau Tsim Mong</option>
                    <option>Kwai Tsing</option>
                    <option>North</option>
                    <option>Sha Tin</option>
                    <option>Tai Po</option>
                    <option>Tsuen Wan</option>
                    <option>Tuen Mun</option>
                    <option>Yuen Long</option>
                    <option>Sai Kung</option>
                    <option>Islands</option>
                  </Form.Select>
                </Form.Group>
                {errorMsg && <div className="err-msg">{errorMsg}</div>}
                <div className="text-center">
                  <button className="btn-orange mt-3 mb-4" type="submit">
                    SUBMIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form>
      <FailureModal
        isOpen={failureModalBoolean}
        close={closeModal}
        message={missingInfoMsg}
      />
    </>
  );
};

export default MemberInfoForm;
