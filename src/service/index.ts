import { Album, Photo, User } from "../typings";

const runFecth = <Type>(url: string): Promise<Type> =>
  fetch(url)
    .then((res) => {
      if (res.ok) return res.json();
      else throw new Error(`${res.status}`);
    })
    .catch((err) => {
      console.error(err);
    });

const endpoints = {
  getUsers(): Promise<User[]> {
    return runFecth<User[]>("https://jsonplaceholder.typicode.com/users");
  },
  getAlbums(): Promise<Album[]> {
    return runFecth<Album[]>("https://jsonplaceholder.typicode.com/albums");
  },
  getPhotos(): Promise<Photo[]> {
    return runFecth<Photo[]>("https://jsonplaceholder.typicode.com/photos");
  },
};
export default endpoints;
