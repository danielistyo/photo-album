export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type Album = {
  userId: number;
  id: number;
  title: string;
  photos: Photo[];
};

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  comments?: string[];
};

export type Actions =
  | {
      type: "ADD_USERS";
      payload: User[];
    }
  | {
      type: "ADD_ALBUMS";
      payload: Album[];
    }
  | {
      type: "ADD_PHOTOS";
      payload: Photo[];
    }
  | {
      type: "ADD_COMMENT";
      payload: { albumId: number; photoId: number; comment: string };
    }
  | {
      type: "LIKE_PHOTO";
      payload: { albumId: number; photoId: number; value: boolean };
    };

export type RouteAlbumParams = { id: string };
