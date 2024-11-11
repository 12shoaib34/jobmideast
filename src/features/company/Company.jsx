import React, { useEffect, useState, useRef } from "react";
import { Slide } from "react-reveal";
import { Form, Input, Select, Row, Col, Upload, Spin } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./_Company.scss";
import "./_Responsive.scss";
import { Map } from "../../shared-ui/Map/Map";
import CompanyCard from "../../shared-ui/CompanyCard/CompanyCard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ReactPlayer from "react-player";
import EditCompanyForm from "./EditCompanyForm";
import {
  selectCompanyProfile,
  selectEditCompanyProfileSuccess,
  selectReviews,
} from "./slice";
import { editCompanyProfile, getCompanyProfile, getReviews } from "./thunk";
import { selectEmployerProfile, selectIsMainAdmin } from "../auth/slice";
import {
  createMarkup,
  removeUndefinedFromObj,
  useWindowSize,
} from "../../utils/helper";
import { getBranches } from "../dashboard/thunk";
import { selectBranches } from "../dashboard/slice";
import defaultImage from "../../assets/images/default.png";
import ImageUploader from "../../app-ui/ImageUploader/ImageUploader";
import defaultBanner from "../../assets/images/sample/job-banner.png";
import { getSector } from "../auth/service";
import { uploadFile } from "./service";
import { showWarningMessage } from "../../utils/message";
import { HiOutlineTrendingUp } from "react-icons/hi";

// {__________COMMITTING IMPORT THAT ARE NOT USING ___________}
// import ImageCropper from "../../shared-ui/ImageCropper/imageCroper";
// import TextArea from "antd/lib/input/TextArea";
// import LightBox from "./LightBox/lightBox";

// const { Dragger } = Upload;
const CompanyPage = () => {
  const [editCompanyForm] = Form.useForm();
  const dispatch = useAppDispatch();
  const companyProfile = useAppSelector(selectCompanyProfile);
  const reviews = useAppSelector(selectReviews);
  const employerProfile = useAppSelector(selectEmployerProfile);
  const isMainAdmin = useAppSelector(selectIsMainAdmin);
  const companyUpdateSuccess = useAppSelector(selectEditCompanyProfileSuccess);
  const branches = useAppSelector(selectBranches);
  const [searchQuery, setSearchQuery] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [EditCompanyProfile, setEditCompanyProfile] = useState(false);
  const [showUploadMultiplePicsModal, setshowUploadMultiplePicsModal] =
    useState(false);
  const [companyLogoFile, setCompanyLogoFile] = useState(null);
  const [companyBannerFile, setCompanyBannerFile] = useState(null);
  const [companyPhotos, setCompanyPhotos] = useState([]);
  const [companyLocation, setCompanyLocation] = useState(null);
  const [companyLocationAddress, setCompanyLocationAddress] = useState(null);
  const [openReviewDiv, setOpenReviewDiv] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const { width } = useWindowSize();
  const scrollRef = useRef(null);

  // const companyNameType = useAppSelector(selectCompanyNameTypes);

  const {
    companyName,
    companyType,
    companyLogo,
    companyBanner,
    tagLine,
    introduction,
    specialities,
    companySize,
    photoUrl,
    videoUrl,
    category,
    city,
    country,
  } = companyProfile;

  // console.log("compnay profiles,", companyProfile);

  const companyImages = companyPhotos.map((item, index) => {
    return { uid: index, url: item };
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  useEffect(() => {
    window.$crisp.push(["do", "chat:show"]);
  }, []);

  useEffect(() => {
    if (employerProfile) {
      setCompanyId(employerProfile?.companyProfileId);
    }
  }, [employerProfile]);

  useEffect(() => {
    if (companyId) {
      dispatch(getCompanyProfile({ id: companyId }));
      dispatch(getBranches());
      dispatch(getReviews({ id: companyId }));
      // dispatch(getCompanyNameType());
    }
  }, [companyId]);

  useEffect(() => {
    if (companyProfile?.photoUrl) {
      setCompanyPhotos(companyProfile?.photoUrl);
    }
    if (companyProfile && companyId) {
      setCompanyLocation(companyProfile?.companyLocation);
      setCompanyLocationAddress(companyProfile?.location);
      dispatch(getReviews({ id: companyId }));
      const newCompanyProfileData = removeUndefinedFromObj(companyProfile);
      // console.log("edit data", newCompanyProfileData);
      editCompanyForm.setFieldsValue({
        ...newCompanyProfileData,
        cityId: companyProfile.city.title,
      });
    }
  }, [companyProfile]);

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [searchQuery]);

  let HandleImageUploader = () => {
    setshowUploadMultiplePicsModal(!showUploadMultiplePicsModal);
  };

  const executeScroll = () => {
    scrollRef.current.scrollIntoView();
    // console.log(scrollRef.current, "events");
  };

  const handleLocationSelect = (v) => {
    setCategoryId(Number(v));
  };

  const handleCompanyProfileEdit = async (v) => {
    // try {
    //   const temp = await editCompanyForm.validateFields();
    //   console.log(temp);
    // } catch (error) {
    //   console.log(error);
    //   showWarningMessage("Please provide required fields to update");
    //   return;
    // }
    // console.log("submit form payload -> ", v);
    if (!companyLocationAddress) {
      showWarningMessage("please provide company location");
      return;
    }
    // console.log("VALUES FROM FORM:", v);
    // v.countryId = companyProfile?.countryId;
    // v.cityId = companyProfile?.cityId;
    if (isNaN(parseInt(v.cityId))) v.cityId = companyProfile?.cityId;
    v.webUrl = companyProfile?.webUrl;
    v.companyLocation = companyLocation;
    v.photoUrl = companyPhotos;
    v.location = companyLocationAddress;
    // console.log(companyLogoFile, companyBannerFile);
    if (companyLogoFile?.length) {
      const payload = new FormData();
      payload.append("file", companyLogoFile[0], companyLogoFile[0].name);
      const res = await uploadFile(payload);
      v.companyLogo = res.url;
    }

    if (companyBannerFile?.length) {
      const payload = new FormData();
      payload.append("file", companyBannerFile[0], companyBannerFile[0].name);
      const res = await uploadFile(payload);
      v.companyBanner = res.url;
    }
    delete v.companyPhoneNumber;
    // console.log("VALUES FROM PAYLOAD:", v);

    await dispatch(editCompanyProfile({ id: companyProfile.id, payload: v }));
    executeScroll();
    // await dispatch(getCompanyProfile({ id: companyId }))
  };

  useEffect(() => {
    if (companyUpdateSuccess && companyId) {
      dispatch(getCompanyProfile({ id: companyId }));
      setEditCompanyProfile(false);
    }
  }, [companyUpdateSuccess, companyId]);

  const handleUpdateCompanyPhotos = (photos) => {
    setCompanyPhotos(photos);
  };

  const onRemove = (file, type) => {
    // setFile((prevState) => {
    //   const index = prevState.indexOf(file);
    //   const newFile = prevState.slice();
    //   newFile.splice(index, 1);
    //   return newFile;
    // });
    if (type === "banner") {
      setCompanyBannerFile(null);
      document.querySelector(
        ".upload-compnay-banner"
      ).src = require("../../assets/images/icons/imgupload-icon.svg");
    } else if (type === "logo") {
      setCompanyLogoFile(null);
      document.querySelector(
        ".upload-compnay-logo"
      ).src = require("../../assets/images/icons/imgupload-icon.svg");
    } else {
      return null;
    }
  };

  // Function to show temporary image from Local storage to a DOM element
  const showTempImgFromBaseURL = (file, className) => {
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        var base64dUrl = reader.result;
        document.querySelector(className).src = base64dUrl;
      };
    }
  };

  const companyLogoAndBannerBeforeUpload = (file, type, className) => {
    if (file && type === "banner") {
      setCompanyBannerFile([file]);
      showTempImgFromBaseURL(file, className);
    } else if (file && type === "logo") {
      setCompanyLogoFile([file]);
      showTempImgFromBaseURL(file, className);
    }
  };

  const pictureListBeforeUpload = async (file) => {
    // console.log("file -> ", file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", (event) => {
      const _loadedImageUrl = event.target.result;
      const image = document.createElement("img");
      image.src = _loadedImageUrl;
      image.addEventListener("load", async () => {
        const { width, height } = image;
        // set image width and height to your state here
        const isRecommendedSize = height >= 1920 || width >= 1080;
        if (isRecommendedSize) {
          const payload = new FormData();
          payload.append("file", file, file.name);
          const res = await uploadFile(payload);
          if (companyPhotos?.length < 5) {
            handleUpdateCompanyPhotos([...companyPhotos, res.url]);
          } else {
            const newArr = companyPhotos.slice(0, 4);
            handleUpdateCompanyPhotos([...newArr, res.url]);
            // setPhotos([...photos.splice(4, 1, res.url)]);
          }
          // setPhotos([...photos, res.url]);
          return false;
        } else {
          // console.log("SIZE IS NOT RECOMMENDED");
          showWarningMessage(`Recommended size is (1920 x 1080)`);
        }
      });
    });
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    // console.log("isJpgOrPng", isJpgOrPng);
  };

  const removeImage = (url, index) => {
    if (url || index) {
      const updatedPhotos = companyPhotos.filter((item, i) => i !== index);
      setCompanyPhotos([...updatedPhotos]);
    }
    //   setPhotos(updatedPhotos);
    // } else {
    //   const updatedPhotos = companyPhotos.filter(
    //     (item, i) => i !== selectedIndex
    //   );
    //   setPhotos(updatedPhotos);
    // }

    // setSelectedIndex(0);
  };

  const selectPlace = (value) => {
    // console.log("map locations: ", value);
    // console.log(value?.geometry?.location.lat());
    setCompanyLocation([
      value?.geometry?.location.lat(),
      value?.geometry?.location.lng(),
    ]);
    setCompanyLocationAddress(value?.formatted_address);
  };

  // {_____COMMINTING FUNCITONS THAT ARE NO USING AT ALL_____}

  // ________________________________________
  // const getCompanyPhotosText = () => {
  //   let removedCount = 0;
  //   let addedCount = 0;
  //   let str = [];
  //   if (photoUrl && companyPhotos) {
  //     for (const photo of photoUrl) {
  //       const companyPhoto = companyPhotos.find((item) => item === photo);
  //       if (!companyPhoto) {
  //         removedCount++;
  //       }
  //     }
  //     for (const companyPhoto of companyPhotos) {
  //       const photo = photoUrl.find((item) => item === companyPhoto);
  //       if (!photo) {
  //         addedCount++;
  //       }
  //     }
  //     if (addedCount) {
  //       str.push(`${addedCount} Added`);
  //     }
  //     if (removedCount) {
  //       str.push(`${removedCount} Removed`);
  //     }
  //   }
  //   return str?.length ? str.join(", ") : "";
  // };

  // ____________________________________
  // const onRemove = (file, type) => {
  //   // setFile((prevState) => {
  //   //   const index = prevState.indexOf(file);
  //   //   const newFile = prevState.slice();
  //   //   newFile.splice(index, 1);
  //   //   return newFile;
  //   // });
  //   if (type === "banner") {
  //     setCompanyBannerFile(null);
  //     document.querySelector(
  //       ".upload-compnay-banner"
  //     ).src = require("../../assets/images/icons/imgupload-icon.svg");
  //   } else if (type === "logo") {
  //     setCompanyLogoFile(null);
  //     document.querySelector(
  //       ".upload-compnay-logo"
  //     ).src = require("../../assets/images/icons/imgupload-icon.svg");
  //   } else {
  //     return null;
  //   }
  // };

  const setCompanyImages = (arr) => {
    let newArr = arr.map((i) => i.url);
    setCompanyPhotos(newArr);
  };

  const checkLength = (e, type) => {
    if (type === "specialTag") {
      if (e.length > 5) {
        e.pop();
        showWarningMessage("maximum 5 tags allowed");
      }
    }
    if (type === "tagLineLen") {
      if (e?.target?.value?.length >= 100) {
        showWarningMessage("Characters limit reached!");
      }
    }
  };

  return (
    <>
      <div ref={scrollRef}></div>
      <div className="company-page">
        {/* C O M P A N Y - B A N N E R */}
        <div className="company-banner">
          {/* <div className="back-btn" onClick={() => window.history.back()}>
          <img
            src={require("../../assets/images/icons/back-button-black.svg")}
            alt=""
          />
        </div> */}
          {/* =========================================== */}
          {/* THIS SECTION IS REMOVED AFTER COMPARING WITH XD DESIGN */}
          {/* <div className="banner-header">
          <span className="edit-company-profile">
            <Button
              onClick={() => setEditCompanyProfile(true)}
              themecolor="blue">
              Edit profile
            </Button>
          </span>
        </div> */}
          {/* =========================================== */}

          <div className="banner-items">
            <div className="display-flex">
              <span className="company-img">
                <img src={companyLogo || defaultImage} alt="logo" />
              </span>
              <span className="company-details">
                <h1 className="company-name">{companyName || ""}</h1>

                <h1 className="company-type">{tagLine || ""}</h1>
                <h1 className="company-location small-text-common">
                  {country?.title || ""} {country?.title && city?.title && ","}
                  {city?.title || " "}{" "}
                </h1>
                {width > 769 ? (
                  <>
                    {specialities?.length >= 1 && (
                      <h1 className="company-specialities">
                        Specialise in: {specialities?.join(", ")}
                      </h1>
                    )}
                  </>
                ) : null}
              </span>
            </div>

            {width > 769 ? (
              <div className="display-flex align-items">
                <span className="company-details center">
                  <img
                    className="mr-1"
                    src={require("./../../assets/images/icons/Pie.svg")}
                  />{" "}
                  <div>
                    <h1 className="company-type d-flex align-items-center">
                      {" "}
                      Company Sector{" "}
                    </h1>
                    <p className="company-category">{category?.title || ""}</p>
                  </div>
                </span>
                <span className="company-details center">
                  <img
                    className="mr-1"
                    src={require("./../../assets/images/icons/Users-3.svg")}
                  />{" "}
                  <div className="short-details">
                    <h1 className="company-type d-flex align-items-center">
                      Company Size{" "}
                    </h1>
                    <p className="company-category">{companySize || ""}</p>
                  </div>
                </span>
              </div>
            ) : null}
          </div>
          <img
            className="banner-img"
            src={companyBanner || defaultBanner}
            alt="banner"
          />
        </div>

        {/* D E T A I L S */}
        <div
          className="company-page-items"
          style={EditCompanyProfile ? { display: "none" } : null}>
          <div className="toggleMenu ">
            <div className="toggleSection">
              {isMainAdmin && (
                <>
                  <span
                    className="left-toggle flex"
                    onClick={() => setEditCompanyProfile(true)}>
                    Edit company page &nbsp;
                    <img
                      className="left-toggle"
                      src={require("./../../assets/images/icons/Edit Icon copy.svg")}
                      alt="edit"
                      height={15}
                    />
                  </span>
                </>
              )}
            </div>
          </div>

          <div className={`page-layouts ${width < 769 && "px-4"}`}>
            {introduction?.length >= 1 && (
              <h1 className="company-page-heading">About Company</h1>
            )}

            <p
              className="page-desc markup"
              className="markup"
              dangerouslySetInnerHTML={createMarkup(introduction)}></p>

            {/* D O  N O  T  D E  L E T E   B E L O W   C O M M E N T  */}

            {width < 769 ? (
              <>
                {specialities?.length >= 1 && (
                  <h1 className="company-page-heading mt-5">Specialities</h1>
                )}
                <div className="skills-tags">
                  {specialities?.map((tag) => (
                    <span className="tags">{tag}</span>
                  ))}
                </div>
                <div className="company-details">
                  <span>
                    {companyType && (
                      <h1 className="company-page-heading mt-4">
                        Company type
                      </h1>
                    )}
                    <p className="page-desc">{companyType}</p>
                  </span>
                  <span classname="id">
                    {companySize && (
                      <h1 className="company-page-heading mt-4">
                        Company size
                      </h1>
                    )}
                    <p className="page-desc">{companySize || ""}</p>
                  </span>
                </div>
              </>
            ) : null}
          </div>

          {/* ------------------------------------------------- */}
          {photoUrl && photoUrl?.length >= 1 && (
            <>
              <div className="page-layouts">
                <h1 className="company-page-heading">Company Photos</h1>
                {/* <LightBox images={photoUrl} /> */}
                <Carousel
                  className="company-photos-carousel"
                  swipeable={true}
                  draggable={true}
                  showDots
                  responsive={responsive}
                  infinite={true}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  customTransition="all 1s"
                  transitionDuration={1000}
                  partialVisbile={false}
                  containerClass="carousel-container"
                  // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                  // removeArrowOnDeviceType={["tablet", "mobile"]}
                  // deviceType={this.props.deviceType}
                  dotListClass="custom-dot-list-style"
                  // itemClass="carousel-item-padding-40-px"
                >
                  {photoUrl.map((img, i) => (
                    <img
                      style={{ borderRadius: "20px" }}
                      className="company-single-photo"
                      src={img}
                      alt={`image ${i}`}
                      height={250}
                      width="100%"
                    />
                  ))}
                </Carousel>
              </div>
            </>
          )}

          {/* ------------------------------------------------- */}
          {videoUrl && (
            <div className="page-layouts video-section">
              <div className="w-100">
                <h1 className="company-page-heading">Company Video</h1>
                <ReactPlayer
                  width={"100%"}
                  style={{ width: "100%" }}
                  url={videoUrl}
                  className="company-profile-video"
                  controls={true}
                  rel={0}
                />
              </div>
            </div>
          )}

          {/* ------------------------------------------------- */}
          {companyLocation && (
            <div className="page-layouts block-map">
              <Map data={companyProfile} location={companyLocation} />
            </div>
          )}

          {/* ------------------------------------------------- */}
          {/* R E V I E W S */}
          {/* P A Z HAVE  R E M O V E  THIS  SECTION  (28-AUG-2021),  HE  WANT  TO  CHANGE  IT */}
          {/* {----> P R E V I U S , C O N D I T I O N  {reviews && reviews.length >= 1 && (} */}
          {/* {reviews?.lenght >=1 && (
            <div className="page-layouts reviews-section">
              <div className="fixed-header">
                <h1 className="company-page-heading">Reviews</h1>
                <Button
                  onClick={() => setOpenReviewDiv(!openReviewDiv)}
                  themecolor="outlined blue">
                  {openReviewDiv ? "View less" : "View more "}
                </Button>
              </div>
              <div
                className={`reviews-main  ${openReviewDiv ? "open-review-div" : "close-review-div"
                  }`}>
                {reviews?.map((d, i) => (
                  <Reviews
                    key={i}
                    id={d?.id}
                    name={getFullName(d.user)}
                    title={d.jobSeekerProfile?.jobTitle?.title}
                    photo={d.jobSeekerProfile?.profilePhoto}
                    desc={d.description}
                    rating={d.rating}
                  />
                ))}
              </div>
            </div>
          )} */}

          {/* ------------------------------------------------- */}
          {/*  B R A N C H E S */}
          {branches?.length >= 1 && (
            <div className="page-layouts">
              <h1 className="company-page-heading">Other Branches</h1>
              <div className="flex-row branch-cards">
                {branches.map((d) => (
                  <CompanyCard
                    icon={d.branch?.companyLogo}
                    name={d.branch?.companyName}
                    sector={d.branch?.companyType}
                    location={`${d.branch?.city?.title} ${d.branch?.country?.title}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ------------------------------------------------- */}
        {/* Edit Company Form */}
        <EditCompanyForm
          setCompanyLogoFile={setCompanyLogoFile}
          setEditCompanyProfile={setEditCompanyProfile}
          handleCompanyProfileEdit={handleCompanyProfileEdit}
          editCompanyForm={editCompanyForm}
          EditCompanyProfile={EditCompanyProfile}
          setCompanyBannerFile={setCompanyBannerFile}
          getSector={getSector}
          checkLength={checkLength}
          companyPhotos={companyPhotos}
          removeImage={removeImage}
          pictureListBeforeUpload={pictureListBeforeUpload}
          companyLocationAddress={companyLocationAddress}
          setCompanyLocationAddress={setCompanyLocationAddress}
          selectPlace={selectPlace}
          companyProfile={companyProfile}
          companyLocation={companyLocation}
          companyLogoAndBannerBeforeUpload={companyLogoAndBannerBeforeUpload}
          onRemove={onRemove}
          categoryId={categoryId}
          handleLocationSelect={handleLocationSelect}
          setCategoryId={setCategoryId}
          companyBanner={companyBanner}
          companyLogo={companyLogo}
        />

        <ImageUploader
          setPhotos={handleUpdateCompanyPhotos}
          photos={companyPhotos}
          showUploadMultiplePicsModal={showUploadMultiplePicsModal}
          HandleClick={HandleImageUploader}
        />
        {/* </div> */}
      </div>
    </>
  );
};

export default CompanyPage;
