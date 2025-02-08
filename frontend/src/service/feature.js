import axios from "axios";

// Helper to get the auth token (replace with your actual implementation)
const getAuthToken = () => {
  // Example: Retrieve token from localStorage
  return localStorage.getItem("token");
};
const endpoint=   import.meta.env.VITE_API_URL;
// seeting the base url
const apiClient = axios.create({
  baseURL: endpoint, // Set your API's base URL
});

// Intercept request to add the token
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GEt Rankings Api
export const getRankings = async ()=>{
  try {
    const response = await apiClient.get('/get/rankings');
    console.log(response.data.users);
    return response.data.users || [];
  } catch (error) {
    console.error('Failed to get Rankings:', error);
    throw error;
  }
}

// Qust Complition 

export const doneQuest = async (missionId, questId) => {
  try {
    // Send `missionId` and `questId` in the request body using POST
    const response = await apiClient.post('/add/done', { missionId, questId });

    if (response && response.status === 200 && response.data) {
      // Assuming `response.data.questSet` contains the updated quest set
      return response.data; // Return the entire response data for flexibility
    } else {
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error('Failed to mark quest as done:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};


//Quests of a MIssion

export const getQuests = async (missionId) => {
  try {
    // Send `missionId` in the request body using POST
    const response = await apiClient.post('/get/quests', { missionId });

    // Return the questSet from the response
    return response.data.questSet; // Assuming `response.data.questSet` contains the desired data
  } catch (error) {
    console.error('Failed to get Quests Data:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// get mission
export const getMission = async (missionId) => {
  try {
    // Use POST to send `missionId` in the request body
    const response = await apiClient.post('/get/mission', { missionId });

    // Return the mission from the response
    return response.data; // Assuming `response.data.mission` contains the desired mission data
  } catch (error) {
    console.error('Failed to get Mission Data:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// Add Quest API
export const addQuestAPI = async (quest) => {
  try {
    const response = await apiClient.post("/add/quest", quest);
    return response.data; // Return the added quest object
  } catch (error) {
    console.error("Error adding quest:", error);
    throw error;
  }
};


// Add Mission API

export const addMissionAPI = async (mission) => {
  try {
    const response = await apiClient.post("/add/mission", mission);
    
    return response.data.mission; // Return the added mission object
  } catch (error) {
    console.error("Error adding mission:", error);
    throw error;
  }
};



