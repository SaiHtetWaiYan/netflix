export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/",
    "/profile",
    "/api/randon",
    "/api/movies",
    "/api/current",
    "/api/fav-movies",
    "/api/add-fav-movie",
  ],
};
