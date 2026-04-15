import type {UserInfo} from "../types.ts";

export const loginUser = async (userInfo: UserInfo) => {
    const response = await fetch("api/Auth/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        }
    );
    const responseText = await response.text();
    if (!response.ok) {
        throw Error(responseText)
    }
    const token = responseText;
    localStorage.setItem("authToken", token);
}

export const registerUser = async (userInfo: UserInfo) => {
    const response = await fetch("api/Auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInfo)
        }
    )
    if (!response.ok) {
        throw Error(await response.text())
    }
}

export const checkAuthorized = async () => {
    const authRequest = CreateAuthRequest({ method: "GET" });
    if (!authRequest) {
        return false;
    }
    const response = await fetch("api/Auth/who-am-i", authRequest);
    return response.ok;
}

export const CreateAuthRequest = (init: RequestInit = {}): RequestInit | null => {
    const token: string | null = localStorage.getItem("authToken");
    if (!token) {
        return null;
    }
    init.headers = {
        "Authorization": `Bearer ${token}`
    }
    return init;
}

export const logoutUser = async () => {
    localStorage.removeItem("authToken");
}