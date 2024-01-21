import { GETUSERPROFILE, UPDATEPASSWORD, EDITUSER, DELETEUSER } from "../axios";


export const getUserProfile = async () => {
    try {
        const res = await GETUSERPROFILE()
        return res
    } catch (error) {
        console.log(error)
    }
}


export const updateUserPassword = async (payload) => {
    try {
      const res = await UPDATEPASSWORD(payload);
      if (res.status === 200) {
        return res;
      }
      console.error('Unexpected response:', res);
      throw new Error('Unexpected response from the server');
    } catch (error) {
      console.error('Update password failed:', error);
      throw new Error('Failed to update password');
    }
  };


export const deleteUserAccount = async () => {
    try {
        const res = await DELETEUSER()
        return res
    } catch (error) {
        console.log(error)
    }
}


export const editUserProfile = async (payload) => {
    try {
        const res = await EDITUSER(payload)
        if (res.status === 200) {
            return res
        }
    } catch (error) {
        console.log(error)
    }
}


