export const isProd = process.env.NODE_ENV === "production";
export const apiBaseUrl = isProd
  ? "https://api-9az4xg.fly.dev"
  : "http://localhost:4000";


export const queryKeys={
  books:["books"] as const,
  book:(id:string)=>['books',id]as const,
  users:["users"] as const,
  user:(id:string)=>["users",id] as const,
  userProfile:["userProfile"] as const,
}