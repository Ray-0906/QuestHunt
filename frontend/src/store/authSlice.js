import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
  token: null, // Store the JWT token
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
      state.token = action.payload.token; // Save the token
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.token = null; // Clear the token
    },

    // Action to add a mission to current_missions
    addMission: (state, action) => {
      if (!state.userData?.profile?.current_missions) {
        return; // Do nothing if the user or profile data is missing
      }

      const newMission = action.payload;
      const isMissionAlreadyAdded = state.userData.profile.current_missions.some(
        (mission) => mission === newMission
      );

      if (!isMissionAlreadyAdded) {
        state.userData.profile.current_missions.push(newMission);
      }
    },

    // Action to remove a mission from current_missions
    removeMission: (state, action) => {
      if (!state.userData?.profile?.current_missions) {
        return; // Do nothing if the user or profile data is missing
      }

      const missionId = action.payload;
      state.userData.profile.current_missions = state.userData.profile.current_missions.filter(
        (mission) => mission !== missionId
      );
    },

    // Action to clear all missions in current_missions
    clearMissions: (state) => {
      if (state.userData?.profile?.current_missions) {
        state.userData.profile.current_missions = [];
      }
    },
    updateStats: (state, action) => {
      if (!state.userData?.profile?.stats) {
        return; // Do nothing if the stats object is missing
      }

      const newStats = action.payload;
      state.profile.stats=newStats;
      // Check if the stat exists and update it
     
  },
  updateExp: (state, action) => {
    if (!state.userData?.profile?.exp) {
      return; // Do nothing if the stats object is missing
    }

    const newStats = action.payload;
    state.profile.exp=newStats;
    // Check if the stat exists and update it
   
},
}});

export const { login, logout, addMission, removeMission, clearMissions ,updateStats,updateExp} = authSlice.actions;
export default authSlice.reducer;
