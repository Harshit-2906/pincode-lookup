import React, { useState } from 'react';
import PincodeForm from './PincodeForm';
import Loader from './Loader';
import Results from './Results';
import Error from './Error';
import { fetchPincodeData } from '../utils/FetchPincodeData';
import '../styles/PincodeLookup.css';

function PincodeLookup() {
    const [pincode, setPincode] = useState('');
    const [postOffices, setPostOffices] = useState([]);
    const [filteredPostOffices, setFilteredPostOffices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLookup = async () => {
        if (pincode.length !== 6 || isNaN(pincode)) {
            setError('Please enter a valid 6-digit postal code.');
            return;
        }

        setLoading(true);
        setError('');
        try {
            const data = await fetchPincodeData(pincode);
            if (data[0].Status === 'Error') {
                setError(data[0].Message || 'Error fetching data.');
            } else {
                setPostOffices(data[0].PostOffice);
                setFilteredPostOffices(data[0].PostOffice);
            }
        } catch (err) {
            setError('Failed to fetch data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (query) => {
        const filtered = postOffices.filter((office) =>
            office.Name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPostOffices(filtered);
    };

    return (
        <div className="pincode-lookup">
            <h1>Pincode Lookup</h1>
            <PincodeForm
                pincode={pincode}
                setPincode={setPincode}
                handleLookup={handleLookup}
            />
            {loading && <Loader />}
            {error && <Error message={error} />}
            <input
                type="text"
                placeholder="Filter by post office name"
                onChange={(e) => handleFilter(e.target.value)}
            />
            <Results postOffices={filteredPostOffices} />
        </div>
    );
}

export default PincodeLookup;
