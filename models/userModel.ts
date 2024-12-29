import mongoose, {Schema,Document} from 'mongoose'

export interface Iuser extends Document{
    username: string;
    name: string;
    avatar_url: string;
    followers_url: string
    following_url: string
    repos_url:string,
    user_url:string;
    bio: string ;
    location: string;
    public_repos: number;
    public_gists:number;
    followers: number;
    following: number;
    blog: string;
    friends:[];
    createdAt:string;
    isBlocked:boolean;
}

const userSchema= new Schema<Iuser>({
    username:{type:String,required:true},
    name:{type:String,required:true},
    avatar_url:{type:String,required:true},
    followers_url: {type:String,required:true},
    following_url:{type:String,required:true},
    repos_url:{type:String,required:true},
    user_url:{type:String,required:true},
    bio:{type:String,default:null},
    location: {type:String,default:null},
    public_repos: {type:Number},
    public_gists:{type:Number},
    followers:  {type:Number},
    following: {type:Number},
    blog:  {type:String,default:null},
    friends:{type:[],default:[]},
    createdAt:{type:String,required:true},
    isBlocked:{type:Boolean,default:false}
})

const User = mongoose.model<Iuser>('User',userSchema)
export default User