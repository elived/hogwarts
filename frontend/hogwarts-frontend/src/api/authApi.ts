import type {UserInfo, UserRoleInfo} from "../types.ts";

import { API_BASE_URL } from "../config/api";


export const fetchAllUsers = async() => {
    const response = await fetch(("api/Auth/users"));
    
    if (!response.ok) {
        throw new Error(
            `Fetch all Users failed: ${response.status} ${response.statusText}`
        );
    }
    
    return await response.json();
}

export const getUserByUsername = async (username: string) => {
    const response = await fetch(`api/Auth/users/${username}`);
    
    if (!response.ok) {
        throw new Error(
            `Fetch User by username failed: ${response.status} ${response.statusText}`
        );
    }
    
    const user = await response.json() as UserRoleInfo;
    return user;
    
}
export const loginUser = async (userInfo: UserRoleInfo) => {
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
    const response = await fetch("api/Auth/find-role", authRequest);
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

export const deleteUser = async (username: string): Promise<void> => {
    const authReq = CreateAuthRequest({ method: "DELETE" });
    if (!authReq) throw new Error("Missing JWT token!");
    
    const response = await fetch(`${API_BASE_URL}/api/Auth/user/${username}`, authReq);
    if (!response.ok) throw new Error(await response.text());
}