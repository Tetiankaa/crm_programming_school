import { IAuthRes, ILogin, IManager, IToken } from '../interfaces';
import { apiService } from './apiService';
import { urls } from '../constants';

const ACCESS_TOKEN = 'access-token';
const REFRESH_TOKEN = 'refresh-token';
const authService = {
    async login(loginData: ILogin): Promise<IManager> {
        const { data } = await apiService.post<IAuthRes>(
            urls.auth.login,
            loginData
        );
        this.setTokens(data.tokens);
        return data.manager;
    },

    setTokens(tokens: IToken): void {
        localStorage.setItem(ACCESS_TOKEN, tokens.accessToken);
        localStorage.setItem(REFRESH_TOKEN, tokens.refreshToken);
    },
    getAccessToken(): string {
        return localStorage.getItem(ACCESS_TOKEN);
    },

    getRefreshToken(): string {
        return localStorage.getItem(REFRESH_TOKEN);
    },
};

export { authService };
