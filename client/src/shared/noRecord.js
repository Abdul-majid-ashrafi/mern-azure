import React from 'react';
export const NoRecordFound = (props) => {
    return (
        <div className='noRecord' style={{ top: props.daily ? '17%' : '', left: props.daily ? '25%' : '' }}>
            <h1>{props.children ? props.children : 'No Kitchen Available'}</h1>
            {/* <button type='primary' className='createWeeklyDealsCloseModal continue-button background-color' onClick={history.goBack}>Back</button> */}
        </div>
    )
}

