import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import { connect } from 'react-redux'
import { getStorage } from '../../../shared'
import {  setItemRating } from '../../../store/actions'

const StarRating = (props) => {

    const [rating, setRating] = useState({})

    const changeRating = (newRating) => {
        let token = getStorage("token")
        let sid = getStorage("sid")
        let obj = {
            Authorization: `Bearer ${token}`,
            rating: newRating,
            supplierid: sid ? sid : props.sid,
            customerid: props.userid
        }

        if (props.dealid) {
            obj = { ...obj, dealid: props.dealid }
        } else if (props.day) {
            obj = { ...obj, day: props.day }
        } else if(props.itemid){
            obj = {...obj, itemid: props.itemid}
        }
        setRating(obj);
    }

    const handleClick = () => {
        // if(rating.itemid){
            props.setItemRating(rating);
        // } else if(rating.dealid){
        //     props.setDealRating(rating)
        // }
            
    }

    return (
        <div className="modal fade" id={`starRating${props.modalID}`} tabIndex="-1" role="dialog" aria-labelledby="myModal-label" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content ratingModal">
                    <div className="modal-header">
                        <h5 className="modal-title" id="myModalTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ReactStars
                            count={5}
                            onChange={changeRating}
                            size={40}
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                            classNames="mt-2"
                        />
                        <div className="text-center mt-1">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary ml-1" onClick={handleClick}>Save</button>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return {
        userid: auth.user && auth.user._id,
    }
}

export default connect(mapStateToProps, {  setItemRating })(StarRating)
