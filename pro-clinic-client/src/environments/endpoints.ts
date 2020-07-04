const baseApiUrl = 'http://localhost:3001';

export const endpoints = {
    authenticate: (): string => `${baseApiUrl}/authenticate`,
    authorizeOtp: (): string => `${baseApiUrl}/authorize`
};
