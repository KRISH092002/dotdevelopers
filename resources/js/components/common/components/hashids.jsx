import Hashids from 'hashids';
const hashids = new Hashids((process.env.HASHIDS_SALT ?? 'App2024@SecureHashKey'), 6); 

export default hashids