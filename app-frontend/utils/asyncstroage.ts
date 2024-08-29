import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../services/UserService";

export async function logoutUser() {
  try {
    await AsyncStorage.removeItem("jwt");
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCurrentUser(token: string) {
  try {
    console.log("token", token);
    let currentTokenAccount;
    if (token) {
      currentTokenAccount = token;
      await AsyncStorage.setItem("jwt", token);
    } else {
      currentTokenAccount = await AsyncStorage.getItem("jwt");
    }
    if (!currentTokenAccount) throw Error;
    const currentUser = await getUser(currentTokenAccount);
    console.log(currentUser);
    if (!currentUser) throw Error("Cant get Current User");
    const data = JSON.stringify(currentUser);
    await AsyncStorage.setItem("user", data);
    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCurrentToken() {
  try {
    const currentTokenAccount = await AsyncStorage.getItem("jwt");
    if (!currentTokenAccount) throw Error;
    return currentTokenAccount;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Get Current User
// export async function getCurrentUser() {
//   try {
//     const currentTokenAccount = await AsyncStorage.getItem("jwt");
//     if (!currentTokenAccount) throw Error;
//     if (!currentUser) throw Error;
//     const data = await AsyncStorage.getItem("user");
//     return JSON.parse(data);
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
