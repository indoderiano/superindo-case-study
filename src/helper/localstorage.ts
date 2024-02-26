import { UserData } from "../features/account/accountSlice";

// module.exports={
//     localstorage_set: ( user_data: UserData ) => {
//       let private_key = process.env.REACT_APP_LOCALSTORAGE_KEY;
//       localStorage.setItem(private_key, user_data);
//     }
// }

export function localstorage_set ( user_data: UserData ) {
  let private_key = process.env.REACT_APP_LOCALSTORAGE_KEY || "";
  localStorage.setItem(private_key, JSON.stringify(user_data));
}

export function localstorage_get () {
  let private_key = process.env.REACT_APP_LOCALSTORAGE_KEY || "";
  try {
    let localstorage_data_json = localStorage.getItem(private_key) || "{}";
    let localstorage_data = JSON.parse(localstorage_data_json);
    return localstorage_data;
  } catch {
    return undefined;
  }
}

export function localstorage_clear () {
  let private_key = process.env.REACT_APP_LOCALSTORAGE_KEY || "";
  localStorage.removeItem(private_key);
}