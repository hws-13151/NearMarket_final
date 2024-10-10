import React from 'react'

const SearchBox = ({ handleChange }) => {
    return (
        <div className="searchbox">
            <div className="searchbox-con">
                <input
                    type="text"
                    placeholder="검색하기"
                    onChange={handleChange}
                />

            </div>
        </div>
    )
}

export default SearchBox