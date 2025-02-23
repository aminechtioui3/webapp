// ProfileService.ts

interface Profile {
    id: string;
    name: string;
    lastname: string;
    email: string;
    mobile: string;
    subscriptionType: string;
    status: "paid" | "expired";
    picture: string;
  }
  
  const mockProfile: Profile = {
    id: "12345",
    name: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    subscriptionType: "acces libre",
    status: "paid",
    picture: "https://via.placeholder.com/80",
  };
  
  export const getProfile = async (clientId: string): Promise<Profile> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockProfile), 1000);
    });
  };
  
  export const updateProfile = async (clientId: string, updatedProfile: Profile): Promise<void> => {
    return new Promise((resolve) => {
      console.log("Updated profile:", updatedProfile);
      setTimeout(() => resolve(), 1000);
    });
  };
  