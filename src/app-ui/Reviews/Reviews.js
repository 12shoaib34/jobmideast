import React, { useState } from "react";
import Rating from "react-rating";
import Button from "../../shared-ui/Button/Button";
import { AiFillStar } from "react-icons/ai";
import { HiOutlinePlus } from "react-icons/hi";
import Modal from "../../shared-ui/Modal/Modal";
import { Form, Input } from "antd";
import defaultImage from "../../assets/images/user.png";
import { useAppDispatch } from "../../store/hooks";
import { postReviewReply } from "../../features/company/thunk";

const { TextArea } = Input;

const Reviews = ({
  id,
  name,
  title,
  desc,
  rating = 0,
  photo = defaultImage,
}) => {
  const [showRespondToReviewModal, setShowRespondToReviewModal] =
    useState(false);
  const dispatch = useAppDispatch();
  const handleSubmitReviewReply = (v) => {
    const body = { ...v, companyRatingId: id };

    // const config = {
    //   headers: {
    //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTcsInJvbGVJZCI6Miwic29ja2V0SWQiOiIvY2hhdCM0NVBRajFiV1lOZFpzT2VZQUVnaiIsImZpcnN0TmFtZSI6IkthbWFsICIsImxhc3ROYW1lIjoiQWxhbSIsImVtYWlsIjoiZW1wbG95ZXJAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkVDlDVE1XSDZWTk9QOTk5N1BaaU1VLnk3eU0uVVE3dFQ0NjNjU2czdVU5VnRlL2xRYk9IZWkiLCJpc1ZlcmlmaWVkIjp0cnVlLCJpc0FjdGl2ZSI6ZmFsc2UsInJlc3RQYXNzd29yZFRva2VuIjpudWxsLCJzaGFyZVByb2ZpbGVJZCI6bnVsbCwiaXNEZWxldGVkIjpmYWxzZSwiY3JlYXRlZEF0IjoiMjAyMS0wNS0xMFQwOTozMjowMy40NTBaIiwidXBkYXRlZEF0IjoiMjAyMS0wNy0wMlQwODo1MjoyNy4yMDFaIiwiaWF0IjoxNjI1MjE2MDYzLCJleHAiOjE2MjU1NzYwNjN9.z8g49KihBDJ1xgUUqtwXFV9CqJ4Ss659d3RN7M84y3M`,
    //   },
    // };
    // Axios.post(
    //   "https://develop-backend.jobsmideast.com/review-reply",
    //   body,
    //   config
    // )
    //   .then((res) => console.log(res))
    //   .catch((err) => {
    //     console.log(err);
    //   });
    dispatch(postReviewReply({ body }));
  };

  return (
    <div className="reviews-detail">
      <img className="user-image" src={photo || defaultImage} alt="dp" />
      <div className="about-user">
        <span className="info">
          <h1 className="user-name">{name}</h1>{" "}
          <p className="user-job-type">{title}</p>
          <p className="user-desc">{desc}</p>
        </span>
        <span className="ratings">
          <Rating
            initialRating={rating}
            readonly
            className="rating"
            fullSymbol={<AiFillStar color="#5271FF" size="1.4em" />}
            emptySymbol={<AiFillStar color="#4B4B4B" size="1.4em" />}
          />
          <Button
            onClick={() => setShowRespondToReviewModal(true)}
            themecolor="blue"
            className="rounded plus-btn">
            <HiOutlinePlus />
          </Button>
          <Modal
            show={showRespondToReviewModal}
            className="center lg respond-review-modal"
            onHide={() => setShowRespondToReviewModal(false)}>
            <div className="review-modal-wrapper">
              <div className="header b-text">Respond to review</div>
              <div className="reviews-detail">
                <img className="user-image" src={defaultImage} alt="dp" />
                <div className="about-user">
                  <span className="info-full">
                    <h1 className="user-name">{name}</h1>{" "}
                    <p className="user-job-type">{title}</p>
                    <p className="user-desc">{desc}</p>
                  </span>
                  <span className="ratings-absolute">
                    <div className="report-review">Report review</div>
                    <Rating
                      readonly
                      initialRating={rating}
                      className="rating"
                      fullSymbol={<AiFillStar color="#5271FF" size="1.4em" />}
                      emptySymbol={<AiFillStar color="#808080" size="1.4em" />}
                    />
                  </span>
                </div>
              </div>
              <Form onFinish={handleSubmitReviewReply}>
                <Form.Item name="Reply" className="c-text-box pb-3">
                  <TextArea
                    style={{ resize: "none" }}
                    className="c-text-area"
                    rows={5}
                  />
                </Form.Item>
                <Button
                  htmlType="submit"
                  themecolor="outlined-green"
                  className="ml-auto mt-3">
                  Submit
                </Button>
                <div
                  className="header b-text"
                  style={{ marginBottom: "12px", marginTop: "18px" }}>
                  Share with a team member
                </div>
                <div className="d-flex review-modal-flex">
                  <Form.Item
                    name="id"
                    style={{ width: "40%" }}
                    className="c-input ">
                    <Input
                      autoComplete={"off"}
                      className="ant-input-w100"
                      placeholder="Name"
                    />
                  </Form.Item>
                  <span style={{ position: "relative", top: "10px" }}>or</span>
                  <Form.Item
                    name="id"
                    style={{ width: "60%" }}
                    className="c-input ">
                    <Input
                      autoComplete={"off"}
                      className="ant-input-w100 mb-1"
                      placeholder="Email"
                    />
                    <div className="hint-text">
                      Team members have to be registered on Jobsmideast.com to
                      see this review If this team member is not registered you
                      can send this review to them in an email.
                    </div>
                  </Form.Item>
                </div>
                <Button
                  htmlType="submit"
                  themecolor="outlined-green"
                  className="ml-auto mt-1">
                  Submit
                </Button>
              </Form>
            </div>
          </Modal>
        </span>
      </div>
    </div>
  );
};

export default React.memo(Reviews);
