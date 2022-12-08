import axios from "../api/axios";

const { useContext } = require("react")
const { default: AuthenticationContext } = require("./AuthenticationContext")

const useRefereshToken = () => {
    const {setAuth } = useContext(AuthenticationContext);
    const refresh =  async ()=> {
        console.log("jbjkjbjkhvjkv")
        const response = await axios.get("/api/refreshToken",{
            withCredentials:true
        });
        setAuth(prev =>{
            return{ ...response.data };
        })
        return response.data.accessToken;
    }
    return refresh
}


export default useRefereshToken;