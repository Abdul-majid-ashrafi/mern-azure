import React, { useState } from 'react';
import btnBottom from '../../images/search-button-bottom.png';
import locationIcon from '../../images/location.png';
import line from '../../images/line.png';
import { Scrollbars } from 'react-custom-scrollbars';

const SearchComponent = (props) => {
  const category = ['Daily', 'Weekly', 'Frozen', 'Occasion', 'Cake',];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let locationRange = props.locationRange;
  const [isDropDown, setDropDown] = useState(false);
  console.log(isDropDown);
  return (
    <div className="row  mt-1">
      <div className="col-md-9 pl-4">
        <div className={`input-group has-search inner-addon left-addon input_border`}>
          <span className="fa fa-search form-control-feedback"></span>
          {isDropDown ? <span className="btn search_icon_button"><span className="fa fa-search form-control-feedback"></span>Search</span> : null}
          {isDropDown ? <div className="filter_icon"> <span className="icon icon-filter "></span></div> : null}
          {/* <input type="text" className="form-control" name='tags' onChange={props.onSearch} placeholder="Search" id="filterMenu" data-toggle="dropdown" aria-haspopup="true" /> */}
          <input type="text" onClick={() => setDropDown(isDropDown ? false : true)} className={`form-control search_input ${!isDropDown ? "search_icon_input" : null}`} name='tags' onChange={props.onSearch} placeholder={isDropDown ? "Filter" : "Search"} ></input>
          {/* <div className="dropdown-menu filter-menu" style={{ height: '430px' }} id="filter-menu" aria-labelledby="filterMenu"> */}
          <div className="dropdown-menu filter-menu" style={{ height: '430px', marginTop: "-2", display: isDropDown ? "block" : "none" }} >
            <img className="input_svg" alt="" src={line} />
            <Scrollbars style={{ height: 400, width: "100%" }}>
              <h6>Distance</h6>
              <div className="border-bottom py-1 mx-2 mb-3">
                <span>0 KM</span>
                <input className="slider" placeholder="123" step="0.5" value={locationRange} type="range" id='location' onChange={props.location} min="1" max="50" />
                <span>50 KM</span>
                {/* <p style={{ left: '95%', marginLeft: '10px', color: '#d70f64', textAlign: 'center' }}>{locationRange} KM</p> */}
              </div>
              <div className="row border-bottom py-2 mx-2 mb-3">
                <img src={locationIcon} alt="" className=" getLocationButton" />
                <iframe width="98%" height="350" frameBorder="0" title="map" style={{ border: "0" }} src={`https://maps.google.com/maps?q=${props.currentLocation.lat}, ${props.currentLocation.long}&z=15&output=embed`}></iframe>
              </div>
              <h6>Category</h6>
              <div className="row border-bottom py-2 mx-2 mb-3">
                {category.map((val, index) => {
                  return <div key={index} className="col-md-2 px-0">
                    <div className="checkbox">
                      <input type="checkbox" id={val} onChange={props.categoryCheckBoxHandler} className="mr-2" value={val} />
                      <label className='fontSize' htmlFor={val}>{val}</label>
                    </div>
                  </div>;
                })}
              </div>
              <h6>Days</h6>
              <div className="row border-bottom py-2 mx-2 mb-3">
                {days.map((val, index) => {
                  return <div key={index} className="col-md-3 px-0">
                    <div className="checkbox" style={{ alignItems: 'center' }}>
                      <input type="radio" onChange={props.dayCheckBoxHandler} name='days' className="mr-2" id={val} value={val} />
                      <label style={{ marginTop: '10px' }} htmlFor={val}>{val}</label>
                    </div>
                  </div>;
                })}
              </div>
              <div className="row border-bottom py-2 mx-2 mb-3">
                <div className="col-md-6 px-0">
                  <label htmlFor='priceFrom'>Price From</label>
                  <input type="number" id='priceFrom' name='priceFrom' min="0" onChange={props.inputHandler} className="form-control" />
                </div>
                <div className="col-md-6">
                  <label htmlFor='priceTo'>Price To</label>
                  <input type="number" id='priceTo' name='priceTo' min="0" onChange={props.inputHandler} className="form-control" />
                </div>
              </div>
              {/* <div className="row border-bottom py-2 mx-2 mb-3">
                <div className="col-md-6 px-0">
                  <label htmlFor='priceTo'>Serving</label>
                  <input type="number" id='serving' name='serving' onChange={props.inputHandler} className="form-control" />
                </div>
              </div> */}
            </Scrollbars>
          </div>
          {!props.isSearchResultClear &&
            <div className="input-group-append">
              <button onClick={props.clearSearchResults} className="btn btn-outline-secondary " type="button">Reset Search</button>
            </div>
          }
          {!isDropDown && <div onClick={() => setDropDown(isDropDown ? false : true)} className="input-group-append" data-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <button className="btn btn-outline-secondary search-button" type="button"><span className="icon icon-filter"></span><img alt='' src={btnBottom} /> </button>
          </div>}
        </div>
      </div>
      <div className="col-md-3 displaybtn">
        <button className="continue-button" onClick={() => {
          props.onContinue();
          setDropDown(false);
        }}>Continue <span className="icon icon-arrow-long"></span></button>
        {/* <button className="continue-button" onClick={() => setDropDown()}>Continue <span className="icon icon-arrow-long"></span></button> */}
      </div>
    </div >
  );
};

export default SearchComponent;
