import React from 'react';

function Results({ postOffices }) {
    return (
        <div className="results">
            {postOffices.length > 0 ? (
                postOffices.map((office) => (
                    <div key={office.Name} className="result-item">
                        <h3>{office.Name}</h3>
                        <p>Pincode: {office.Pincode}</p>
                        <p>District: {office.District}</p>
                        <p>State: {office.State}</p>
                    </div>
                ))
            ) : (
                <div className="no-results">
                    Couldn't find the postal data you're looking for...
                </div>
            )}
        </div>
    );
}

export default Results;
