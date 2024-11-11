import React, { useEffect, useState } from "react";
import moment from "moment";
import { message, Popover } from "antd";

export const uuid = () => {
  let s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };
  //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
  // return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  return s4() + s4() + "-" + s4();
};

export const MappedElement = ({ data, renderElement, count }) => {
  if (data && data.length) {
    return data.map((obj, index, array) => {
      if (count) {
        return index <= count ? renderElement(obj, index, array) : null;
      } else {
        return renderElement(obj, index, array);
      }
    });
  }
  return null;
};
export const readableYearDate = (d) => {
  if (!d) {
    return null;
  }
  return moment(d).format("YYYY");
};

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export const navigateToHome = () => {
  window.location = process.env.REACT_APP_HOMEPAGE_URL;
};

export const isPendingAction = (action) => {
  return action.type.endsWith("/pending");
};

export const isRejectedAction = (action) => {
  return action.type.endsWith("/rejected");
};

export const getConsistentData = (response) => {
  if (response && response.data?.items) {
    return response.data.items;
  }
  return response.data;
};

export const readableShortDate = (d) => {
  if (!d) {
    return null;
  }
  return moment(d).format("MMMM YYYY");
};

export const readableShortDateTime = (d) => {
  if (!d) {
    return null;
  }
  return moment(d).format("DD MMM LT");
};

export const readableDate = (d) => {
  if (!d) {
    return null;
  }
  return moment(d).format("DD MMM YYYY");
};

export const readableDateCredits = (d) => {
  if (!d) {
    return null;
  }
  return moment(d).format("MMM D, YYYY");
};

export const readableDateTime = (d) => {
  if (!d) {
    return null;
  }
  return moment(d).format("DD MMM YYYY LT");
};

export const readableTime = (d) => {
  if (!d) {
    return null;
  }
  return moment(d).format("LT");
};

export const dayTimeLeftFromNow = (d) => {
  if (!d) {
    return null;
  }
  if (moment(d).fromNow() === "in a few seconds") {
    return "in a few secs";
  }
  if (moment(d).fromNow() === "a few seconds ago") {
    return "a few secs ago";
  }
  if (moment(d).fromNow() === "a few minutes ago") {
    return "a few mins ago";
  } else {
    return moment(d).fromNow();
  }

  // return moment(d).fromNow();
};

export const setTimeToZero = (d) => {
  if (!d) {
    return null;
  }
  return moment(d)
    .utcOffset(0)
    .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    .toISOString();
};

export const checkDisabledDate = (current) => {
  return current && current < moment().startOf("day");
  // if (!d) {
  //   return false;
  // }
  // const days = moment().diff(d);
  // if (days > 0) {
  //   return true;
  // }
  // return false;
};

export const getTitleById = (data, id) => {
  if (!id) {
    return null;
  }
  const d = data?.find((d) => d.id === id);
  return d?.title;
};

export const getLat = (location) => {
  if (!location) {
    return 25.3430485;
  }
  return location[0];
};

export const getLng = (location) => {
  if (!location) {
    return 50.6572839;
  }
  return location[1];
};

export const warning = (msg) => {
  message.warning(`${msg}`);
};
export const success = (msg) => {
  message.success(`${msg}`);
};

export const findTitleById = (data, id) => {
  const found = data?.find((d) => d.id === id);
  return found?.title || null;
};

export const findCurrencyCodeById = (data, id) => {
  const found = data?.find((d) => d.id === id);
  return found?.code || null;
};

export const findIdByTitle = (data, title) => {
  const found = data?.find((d) => d.title === title);
  return found?.id || null;
};

export const getFullName = (data) => {
  if (!data) {
    return "";
  }
  return data.firstName + " " + data.lastName;
};

export const jsonToQueryString = (data) => {
  if (!data) {
    return "";
  }
  const params = Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v != null)
  );
  // console.log(params);
  // if(params.length){
  //   const newId = params.map((i)=>)
  // }

  // const newId = id.map((i) => `&jobPostId=${i}`);
  // const newIDString = newId.join("");

  return "?" + new URLSearchParams(params).toString();
};

export const htmlToElements = (html) => {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
};

export const createMarkup = (string) => {
  return { __html: string };
};

export const sizeInMB = (number) => {
  const sizeMB = number / (1024 * 1024).toFixed(2);
  return parseFloat(String(sizeMB).slice(0, 2)) + "MB";
};

export const removeUndefinedFromObj = (obj) => {
  const newObj = Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v != null)
  );
  return newObj;
};

export const toCommas = (value) => {
  return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const disabledEndDate = (current, startDate) => {
  return current &&  current < startDate;
};

export const WithHintText = ({ content, children }) => {
  return (
    <Popover
      placement="topLeft"
      overlayInnerStyle={{ width: 400 }}
      content={content}
      trigger="click"
    >
      {children}
    </Popover>
  );
};

export const handleScrollToGivenRef = (refToScroll) => {
  refToScroll.current.scrollIntoView();
  console.log(refToScroll.current, "EVENETS");
};
