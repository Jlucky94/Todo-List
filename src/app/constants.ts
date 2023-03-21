import {isFulfilled, isPending, isRejectedWithValue} from "@reduxjs/toolkit";
import {updateProfileDataTC} from "../features/profile/profileSlice";
import {
    forgotTC,
    getAuthUserDataTC,
    loginTC,
    logoutTC,
    registrationTC,
    setNewPasswordTC
} from "../features/auth/authSlice";

// const pending = isPending(getAuthUserDataTC, loginTC, logoutTC, setNewPasswordTC, forgotTC, registrationTC,)
// const fulfilled = isFulfilled(updateProfileDataTC, getAuthUserDataTC, loginTC, logoutTC, registrationTC, forgotTC, setNewPasswordTC)
// const rejected = isRejectedWithValue(registrationTC)
// const infoFulfilled = isFulfilled(loginTC, logoutTC, registrationTC, forgotTC, setNewPasswordTC)
//
// export {pending, fulfilled, rejected, infoFulfilled}
