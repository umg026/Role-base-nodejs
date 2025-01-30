import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLogging: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            console.log("API response:", res.data);
            set({ authUser: res.data });

        } catch (error) {
            set({ authUser: null })
            console.log("error in auth user in store", error);
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        console.log("signup form data,", data);
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({ authUser: res.data });
            toast.success("Account created succesfully!")
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isSigningUp: false });
        }
    },

    login: async(data) => {
     set({ isLogging: true });
        console.log("login form data,", data);
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({ authUser: res.data });
            toast.success("Login succesfully!")
        }
        catch (error) {
            toast.error(error.response.data.message);
        }
        finally {
            set({ isLogging: false });
        }
    },
    
    logout: async () => {
      try {
        await axiosInstance.post("/auth/logout");
        set({ authUser: null });
        toast.success("logout suceessfully")
      } 
      catch (error) {
        toast.error(error.response.data.message)
      }
    }
}))