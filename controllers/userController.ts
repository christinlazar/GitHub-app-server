import {Request,response,Response,NextFunction} from 'express'
import User from '../models/userModel'
import { getUserFromGitHub,getFollowers,getFollowing,getMutualFollows, getUserRepositories } from '../services/githubServices'

export const searchUser = async (req: Request, res: Response, ):Promise<any>=> {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }
    try {
      let user = await User.findOne({ username });
      if (!user) {
        const gitHubData = await getUserFromGitHub(username as string);
        if (!gitHubData) {
          return res.status(404).json({ success: false, message: 'GitHub user not found' });
        }
        const followers = await getFollowers(username as string);
        const following = await getFollowing(username as string);
        const mutualFriends = await getMutualFollows(followers, following);
        user = new User({
          username: gitHubData.login,
          name: gitHubData.name,
          avatar_url: gitHubData.avatar_url,
          followers_url: gitHubData.followers_url,
          following_url: gitHubData.following_url,
          repos_url: gitHubData.repos_url,
          user_url:gitHubData.url,
          bio: gitHubData.bio,
          location: gitHubData.location,
          public_repos: gitHubData.public_repos,
          public_gists: gitHubData.public_gists,
          followers: gitHubData.followers,
          following: gitHubData.following,
          blog: gitHubData.blog,
          friends: mutualFriends,
          createdAt: gitHubData.created_at,
        });
  
        await user.save();
        const user_repositories = await getUserRepositories(user.username);
        return res.status(200).json({ success: true, repo_data: user_repositories,user });
      } else {
        if(user.isBlocked){
          return res.status(401).json({ blocked:true });
        }
        const user_repositories = await getUserRepositories(user.username);
        return res.status(200).json({ success: true, repo_data: user_repositories,user });
      }
    } catch (error:unknown) {
      return res.status(500).json({message:"internal Server Error",error:error})
    }
  };

  export const blockUser = async (req:Request,res:Response):Promise<any> =>{
      try {
        const {username} = req.body
        const user = await User.findOneAndUpdate({username},{$set:{isBlocked:true}})
        return res.status(200).json({success:true,message:"blocked successfullly",user})
      } catch (error) {
        return res.status(500).json({message:"internal Server Error",error:error})
      }
  }

  export const unblockUser = async (req:Request,res:Response):Promise<any> =>{
    try {
      const {username} = req.body
      const user = await User.findOneAndUpdate({username},{$set:{isBlocked:false}})
      return res.status(200).json({success:true,message:"blocked successfullly",user})
    } catch (error) {
      return res.status(500).json({message:"internal Server Error",error:error})
    }
}

export const editDetails = async (req:Request,res:Response):Promise<any> =>{
  try {
    const {formData} = req.body
    const user = await User.findOneAndUpdate({username:formData.username},{$set:{bio:formData.bio,blog:formData.blog,location:formData.Location}},{new:true})
    return res.status(200).json({success:true,message:"updated successfully",user})
  } catch (error) {
    return res.status(500).json({message:"internal Server Error",error:error})
  }
}

export const getAllUsers = async (req:Request,res:Response):Promise<any> =>{
  try {
    const users = await User.find({})
    return res.status(200).json({success:true,users})
  } catch (error) {
    return res.status(500).json({message:"internal Server Error",error:error})
  }
}

export const sortUsers = async (req: Request, res: Response, ): Promise<any> => {
  const { sortBy } = req.query;
  const validSortFields = ['public_repos', 'public_gists', 'followers', 'following', 'createdAt'];
  if (!validSortFields.includes(sortBy as string)) {
    return res.status(400).json({ message: 'Invalid sort field' });
  }
  try {
    const users = await User.find()
      .sort({ [sortBy as string]: 1 })  
      .exec();
    res.json({ users });
  } catch (error) {
    return res.status(500).json({message:"internal Server Error",error:error}) 
  }
};
export const seacrhByUser = async (req:Request,res:Response):Promise<any> =>{
  const { SearchBy } = req.query; 
  
  if (!SearchBy) {
    return res.status(400).json({ message: 'Search term is required' });
  }
  try {
    const query: any = {
      $or: [
        { username: { $regex: SearchBy as string, $options: 'i' } }, 
        { location: { $regex: SearchBy as string, $options: 'i' } }    
      ]
    };
    const users = await User.find(query).exec();
    if (users.length > 0) {
      return res.json({ users });
    } else {
      return res.status(404).json({ message: 'No users found matching the search term' });
    }
  } catch (error) {
    return res.status(500).json({message:"internal Server Error",error:error})
  }
}
