export const TOKEN_KEY = "@latineuropadigital-Token";
export const USER_KEY = "@latineuropadigital-User";
export const isAuthenticated = () => {
	if(getToken()) {
		return true;
	}
};
export const isAdmin = () => {
	if(getUser()) {
		if(getUser().role === "Admin") {
			return true;
		}
	}
}
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY));

export const updateUser = (username, email, phone) => {
	const user = getUser();
	user.username = username;
	user.email = email;
	user.phone = phone;
	localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export const login = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};