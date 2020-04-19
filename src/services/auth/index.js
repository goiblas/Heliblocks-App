import Auth from "./auth";

export const signInWithGithub = Auth.signInWithGithub.bind(Auth);
export const signOut = Auth.signOut.bind(Auth)

export * from "./withAuth"
export * from "./authContext"