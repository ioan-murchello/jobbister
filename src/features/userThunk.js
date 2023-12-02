import { customFetch } from "../utils/axios";
import { clearAllJobsState } from "./allJobsSlice";
import { clearValues } from "./jobSlice";
import { logoutUser } from "./userSlice";

export const registetUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.post(url, user);
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValues(error.response.data.msg)
    }
}
export const loginUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp =  await customFetch.post(url, user)
        return resp.data
    } catch (error) {
        return thunkAPI.rejectWithValues(error.response.data.msg)
    }
}
export const updateUserThunk = async (url, user, thunkAPI) => {
    try {
        const resp = await customFetch.patch(url, user, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        return resp.data
    } catch (error) {
        if(error.response.status == 401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValues('Unauthorized! Logging Out...')
        }
        return thunkAPI.rejectWithValues(error.response.data.msg)
    }
}

export const clearStoreThunk = async(message, thunkAPI) => {
    try {
        thunkAPI.dispatch(logoutUser())
        thunkAPI.dispatch(clearAllJobsState())
        thunkAPI.dispatch(clearValues())
        return Promise.resolve()
    } catch (error) {
        return Promise.reject()
    }
}