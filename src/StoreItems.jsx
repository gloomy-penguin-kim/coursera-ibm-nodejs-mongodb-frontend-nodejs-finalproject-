import { createSlice } from '@reduxjs/toolkit';
import { React } from 'react';

export const StoreItems = createSlice({
  name: 'store',
  initialState: {
    user: { 'username': null, 
            'userId': null, 
            'email': null, 
    },
    isLoggedIn: false  
  },
  reducers: {
    updateUser: (state, action) => { 
        const user = action.payload; 
        console.log("updateUser", user)
        state.user.username = user.username
        state.user.email = user.email 
        state.user.userId = user.userId 
    },
    clearUser: (state) => { 
      state.user = { "username": null, 
                      "userId": null, 
                      "email": null, 
                    }
    },
    setIsLoggedIn: (state, action) => {
      const value = action.payload 
      state.isLoggedIn = value 
    }
  },
}); 

export const { updateUser, clearUser, setIsLoggedIn } = StoreItems.actions;

export default StoreItems.reducer;
