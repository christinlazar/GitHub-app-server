import { response } from "express";
import Api from "../utils/axios";

export const getUserFromGitHub = async (username:string) =>{
    try {
        const response = await Api.get(username)
        console.log("response.data",response.data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const getFollowers = async (username:string) =>{
    try {
        const response = await Api.get(`${username}/followers`)
        return response.data.map((follower: { login: string, repos_url: string,avatar_url:string }) => ({
            login: follower.login,
            repos_url: follower.repos_url,
            avatar_url:follower.avatar_url
          }));
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getFollowing = async (username:string) =>{
    try {
        const response = await Api.get(`${username}/following`)
        return response.data.map((following: { login: string, repos_url: string, avatar_url:string }) => ({
            login: following.login,
            repos_url: following.repos_url,
            avatar_url:following.avatar_url
          }));
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const getMutualFollows = async (
    followers: { login: string; repos_url: string,avatar_url:string }[],
    following: { login: string; repos_url: string,avatar_url:string  }[]
  ) => {
    const followingLogins = following.map(f => f.login); 
    return followers.filter(follower => followingLogins.includes(follower.login)); 
  };

  export const getUserRepositories = async (username:string)=>{
    try {
        const response = await Api.get(`${username}/repos`)
        return response.data
    } catch (error) {
        throw error
    }
  }