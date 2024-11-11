import Button from "../../shared-ui/Button/Button";
import React, { useEffect, useState } from "react";
import {
  selectCitiesByCountry,
  selectCountries,
} from "../../features/auth/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { selectCities } from "../../features/auth/slice";
import { Form, Checkbox, Empty } from "antd";
import { getCitiesByCountry } from "../../features/auth/thunk";
import "./CountryCityModal.scss";
import { selectCitiesId, setCitiesArr } from "../filterModal/slice";

const CountryCityModal = ({
  setSelectedCitiesIds,
  setCountriesCitiesModal,
  setSelectedCountryId,
  selectedCountryId,
  selectedCitiesIds,
  countriesCitiesModal,
}) => {
  const dispatch = useAppDispatch();

  const [activeCountry, setActiveCountry] = useState(false);
  const [combinedCitiesId, setCombinedCitiesId] = useState([]);
  // const [showChecked, setShowChecked] = useState([]);
  const [tempArr, setTempArr] = useState([]);
  const [countryId, setCountryId] = useState(0);

  const [checkedList, setCheckedList] = useState([]);
  // const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const countries = useAppSelector(selectCountries);
  const cities = useAppSelector(selectCitiesByCountry);
  const reduxCitiesId = useAppSelector(selectCitiesId);
  useEffect(() => {
    setCombinedCitiesId(reduxCitiesId);
  }, [reduxCitiesId]);
  /**
 
 arr = [
   {
     id,
     idArr: []
    },
    {
      id,
      idArr; []
    },
    {
      id,
      idArr: []
    }
  ] 
  var arr = tempArr
  
  arr.forEach((obj, index) => {
    if(obj.id) 
    {
      obj.idArr = checkedList
    }
    else {
      arr.push(
        {
          id: selectedCountryId, 
          idArr: []
        }
        )
    }
  })

  setTempArr(arr)
 */
  useEffect(() => {
    if (selectedCountryId) {
      dispatch(getCitiesByCountry(selectedCountryId));

      setCombinedCitiesId([...combinedCitiesId, ...checkedList]);

      var arr = tempArr;

      //check if country exists in arr
      let result = arr.find((ar) => ar.id === selectedCountryId);
      if (!result) {
        arr.push({ id: selectedCountryId });
      }

      arr.forEach((obj, index) => {
        if (obj.id === selectedCountryId) {
          obj.idArr = checkedList;
        }
      });
      setTempArr(arr);
    }
    if (!countriesCitiesModal) {
      var dispatchedArr = [];
      combinedCitiesId.filter((ar) => {
        if (!dispatchedArr.includes(ar)) dispatchedArr.push(ar);
      }); //to avoid redundancy

      dispatch(setCitiesArr(dispatchedArr));
      //save data to redux store
    }
  }, [selectedCountryId, countriesCitiesModal]);

  useEffect(() => {
    setCombinedCitiesId([...reduxCitiesId]);
  }, []);

  const handleSelectedCities = (v) => {
    // console.log(`country iD:  ${v} `)
    // console.log(checkedList)
    // if(checkedList)
    setCheckedList([...v]);
    // setSelectedCitiesIds(v);
    console.log(v);
    // setCombinedCitiesId([...combinedCitiesId, ...v])
    // console.log("my arr")
    // console.log(combinedCitiesId)
    // console.log("-------------")
    // console.log(v)
    // console.log('v')

    // setCombinedCitiesId(...combinedCitiesId, v) //state to manage combined cities id
    // console.log(combinedCitiesId +"&" + v)
    // console.log(v);
  };
  const maintainCitiesId = (id) => {
    // console.log(combinedCitiesId)
    // let result = new Set(combinedCitiesId)
    // console.log(result)
    // setCombinedCitiesId([...combinedCitiesId, id]) //state to manage combined cities id
  };

  const onSave = () => {
    setCountriesCitiesModal(false);
  };
  // old logic
  // const handleSelectAll = (e) => {
  //   if (e.target.checked) {
  //     const selectedAllCities = cities?.map((city) => String(city.id));
  //     setSelectedCitiesIds(selectedAllCities);
  //     console.log("seelcted cities all", selectedCitiesIds);
  //     setCheckAll(true);
  //   } else {
  //     setCheckAll(false);
  //   }
  // };

  const onCheckAllChange = (e) => {
    const selectedAllCities = cities?.map((city) => String(city.id));
    setCheckedList(e.target.checked ? selectedAllCities : []);
    // setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
  // const onChange = (list) => {
  // };

  return (
    <div className="countries-cities-selector">
      <Form onFinish={onSave}>
        <div className="header">Where would you like to work?</div>
        <div className="country-city-wrapper">
          <div className="country-list">
            <div className="title">Countries</div>
            {countries?.map((country, index) => (
              <div
                key={index}
                onClick={() => {
                  setActiveCountry(country);
                  setSelectedCountryId(country?.id);
                }}
                className={`country-list-item ${
                  activeCountry === country ? "active" : null
                }`}>
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/1x1/${country.code}.svg`}
                />
                <div className="country-name">{country?.title}</div>
              </div>
            ))}
          </div>
          <div className="city-list">
            <div className="title">
              <Checkbox checked={checkAll} onChange={onCheckAllChange}>
                {" "}
                <span className="inner-title">Select Cities</span>
              </Checkbox>
            </div>
            <Checkbox.Group
              onChange={handleSelectedCities}
              value={
                reduxCitiesId.length
                  ? reduxCitiesId
                  : combinedCitiesId.length
                  ? combinedCitiesId
                  : checkedList
              }>
              {/* {!cities && <Empty description="select a country" />} */}
              {cities?.map((city, index) => (
                <div id={city?.id} key={index} className="city-list-item">
                  <Checkbox value={`${city?.id}`}>{city?.title}</Checkbox>
                </div>
              ))}
            </Checkbox.Group>
          </div>
        </div>
        <div className="footer">
          <Button type="large" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CountryCityModal;
