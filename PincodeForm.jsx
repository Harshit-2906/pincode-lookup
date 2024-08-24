import React from 'react';

function PincodeForm({ pincode, setPincode, handleLookup }) {
    return (
        <div>
            <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter 6-digit Pincode"
            />
            <button onClick={handleLookup}>Lookup</button>
        </div>
    );
}

export default PincodeForm;
