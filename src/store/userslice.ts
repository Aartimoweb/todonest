    import { createSlice, PayloadAction } from "@reduxjs/toolkit";

    interface User {
    id:string;
    username: string;
    lastName: string;
    password: string;
    email: string;
    contact: string;
    gender: string;
    profile:string;
    }

    interface UserState {
    users: User[];
    user: User | null;
    }

    const initialState: UserState = {
    users: [],
    user:null,
    };

    const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
        state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            // Delete user by id
            state.users = state.users.filter(user => user.id !== action.payload);
          }
          
    },
    });

    export const { addUser,deleteUser } = userSlice.actions;
    export default userSlice.reducer;
