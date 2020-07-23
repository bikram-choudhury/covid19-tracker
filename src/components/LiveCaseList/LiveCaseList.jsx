import { InputAdornment, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import numeral from 'numeral';
import React, { useEffect, useState, memo } from 'react';
import './LiveCaseList.scss';

function LiveCaseList({ countriesWithData }) {

    const [filtterdCountries, setFiltterdCountries] = useState([]);
    const [filteredInput, setFilteredInput] = useState("");

    useEffect(() => {
        if (filteredInput) {
            const filtterdData = countriesWithData.filter(
                data => data.country.toLowerCase().includes(filteredInput.toLowerCase())
            );
            setFiltterdCountries(filtterdData);
        } else {
            setFiltterdCountries(countriesWithData);
        }
    }, [filteredInput, countriesWithData])

    const handleChange = ({ target: { value } }) => setFilteredInput(value);
    
    return (
        <div className="liveCaselist">
            <h3 className="liveCaselist__title">LIVE CASES</h3>
            <TextField
                label="With normal TextField"
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start"><SearchIcon /></InputAdornment>
                    )
                }}
                variant="outlined"
            />
            <div className="liveCaselist__body">
                {
                    filtterdCountries?.length > 0 ? (
                        filtterdCountries.map(({ country, cases }, index) => (
                            <div className="liveCaseList__row" key={index}>
                                <div className="liveCaseList__country">{country}</div>
                                <div className="liveCaseList__totalcase">
                                    <strong>{numeral(cases).format("0,0")}</strong>
                                </div>
                            </div>
                        ))
                    ) : (
                            <div className="liveCaselist__loading">
                                {filteredInput ? 'No data found.' : 'Loading ...'}
                            </div>
                        )
                }
            </div>
        </div >
    );
}

export default memo(LiveCaseList, (prevProps, nextProps) => {
    return prevProps.countriesWithData.length === nextProps.countriesWithData.length
});
