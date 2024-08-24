export const fetchPincodeData = async (pincode) => {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    return response.json();
};
