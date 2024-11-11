import Button from "../../shared-ui/Button/Button";
import React, { useEffect, useState } from "react";
import {
  selectCitiesByCountry,
  selectCountries,
  selectDesiredCountries,
} from "../../features/auth/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { selectCities } from "../../features/auth/slice";
import { Form, Checkbox, Empty } from "antd";
import {
  getCitiesByCountries,
  getDesiredCountry,
} from "../../features/auth/thunk";
import "./CountriesCityModal.scss";
import { selectCitiesId, setCitiesArr } from "../filterModal/slice";

const CountriesCityModal = ({
  setSelectedCitiesIds,
  setCountriesCitiesModal,
  setSelectedCountryIds,
  selectedCountryIds,
  selectedCitiesIds,
  countriesCitiesModal,
}) => {
  const dispatch = useAppDispatch();

  const [activeCountries, setActiveCountries] = useState([]);
  const [combinedCitiesId, setCombinedCitiesId] = useState([]);
  // const [showChecked, setShowChecked] = useState([]);
  const [countryId, setCountryId] = useState(0);

  const [checkedList, setCheckedList] = useState([]);
  // const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const desiredCountries = useAppSelector(selectDesiredCountries);

  const cities = useAppSelector(selectCitiesByCountry);
  const reduxCitiesId = useAppSelector(selectCitiesId);
  useEffect(() => {
    setCombinedCitiesId(reduxCitiesId);
  }, [reduxCitiesId]);

  useEffect(() => {
    if (selectedCitiesIds == null) return;
    setCheckedList([...selectedCitiesIds]);
  }, [selectedCitiesIds]);

  useEffect(() => {
    setActiveCountries(selectedCountryIds?.map((id) => ({ id })));
    dispatch(getCitiesByCountries(selectedCountryIds));
    if (selectedCountryIds?.length) {
      setCombinedCitiesId([...combinedCitiesId, ...checkedList]);
    }
    if (!countriesCitiesModal) {
      var dispatchedArr = [];
      combinedCitiesId.filter((ar) => {
        if (!dispatchedArr.includes(ar)) dispatchedArr.push(ar);
      }); //to avoid redundancy

      dispatch(setCitiesArr(dispatchedArr));
      //save data to redux store
    }
  }, [selectedCountryIds, countriesCitiesModal]);

  useEffect(() => {
    dispatch(getDesiredCountry());
    setCombinedCitiesId([...reduxCitiesId]);
  }, []);

  useEffect(() => {
    if (
      selectedCitiesIds &&
      selectedCitiesIds.length &&
      cities.map((c) => c.id).every((c) => selectedCitiesIds.includes(c))
    ) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [cities, selectedCitiesIds]);

  const handleSelectedCities = ({ target }) => {
    const value = Number(target.value);
    if (target.checked) setSelectedCitiesIds((prev) => [...prev, value]);
    else setSelectedCitiesIds((prev) => prev.filter((it) => it != value));
  };

  const onSave = () => {
    setSelectedCitiesIds(checkedList);
    setCountriesCitiesModal(checkedList);
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
    setSelectedCitiesIds(e.target.checked ? selectedAllCities : []);
    // setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleCountrySelect = (country) => {
    let _activeCountries = activeCountries;
    let activeCountryIds = activeCountries.map((item) => item.id);
    if (activeCountryIds.indexOf(country.id) >= 0) {
      _activeCountries = _activeCountries.filter(
        (item) => item.id !== country.id
      );
    } else {
      _activeCountries.push(country);
    }
    activeCountryIds = _activeCountries.map((item) => item.id);
    setActiveCountries(_activeCountries);
    setSelectedCountryIds(activeCountryIds);
  };

  const handleSelecteAllCities = ({ target }) => {
    setCheckAll(target.checked);
    if (target.checked) {
      setSelectedCitiesIds((prev) => [
        ...prev,
        ...cities.map((item) => item.id),
      ]);
    } else {
      const cityIds = cities.map((c) => c?.id);
      console.log(
        "well get",
        selectedCitiesIds.filter((p) => !cityIds.includes(p))
      );
      setSelectedCitiesIds((prev) => [
        ...prev.filter((p) => !cityIds.includes(p)),
      ]);
    }
  };

  return (
    <div className="countries-cities-selector">
      <Form onFinish={onSave}>
        <div className="header">Candidates who are interested to work in </div>
        <div className="country-city-wrapper">
          <div className="country-list">
            <div className="title">Countries</div>
            {desiredCountries?.map((country, index) => (
              <div
                key={index}
                onClick={() => handleCountrySelect(country)}
                className={`country-list-item ${
                  activeCountries.find((item) => item.id === country.id)
                    ? "active"
                    : null
                }`}>
                <img
                  src={`https://purecatamphetamine.github.io/country-flag-icons/1x1/${country.code}.svg`}
                />
                <div className="country-name">{country?.title}</div>
              </div>
            ))}
          </div>
          <div className="city-list">
            {/* <div className="title">
              <Checkbox checked={checkAll} onChange={onCheckAllChange}>
                {" "}
                <span className="inner-title">Select All Cities</span>
              </Checkbox>
            </div> */}
            <div className="hideCheckBox">
              {cities?.length ? (
                <div className="hideCheck title">
                  <Checkbox
                    onChange={handleSelecteAllCities}
                    checked={checkAll}></Checkbox>
                </div>
              ) : null}
              <div className="title">Select all cities</div>
            </div>
            <Checkbox.Group
              defaultValue={selectedCitiesIds?.map((item) => `${item}`)}
              value={selectedCitiesIds?.map((item) => `${item}`)}>
              {/* {!cities && <Empty description="select a country" />} */}
              {cities?.map((city, index) => (
                <div id={city?.id} key={index} className="city-list-item">
                  <Checkbox
                    onChange={handleSelectedCities}
                    value={`${city?.id}`}>
                    {city?.title}
                  </Checkbox>
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

export default CountriesCityModal;
