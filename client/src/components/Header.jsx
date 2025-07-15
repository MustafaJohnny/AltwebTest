import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  
  const handleSignOut = async () => {
    try {
      const res = await fetch ("/api/user/signout",{ method:"POST" })
      const data = await res.json()

      if(!res.ok){
        toast.error(data.message)
      }
      if (res.status === 404) {
        toast.error("Endpoint not found");
        return;
      }
     if(res.ok){
        dispatch(signoutSuccess())
        toast.success("User signed out")
        navigate('/sign-in')
       
      }
    } catch(error) {
     toast.error(error.message ||'an error has occured')
     console.log(error.message)
    }
  }

  return (
    <Navbar>
      {currentUser ? 
      <div style={{
        width:"100%",
        display:'flex',
        padding:'0px 4px',
        alignItems:'center',
        justifyContent:"space-between"
      }}>
        <Button
          outline
          onClick={handleSignOut}
          gradientDuoTone="purpleToBlue"
        >
          Sign Out
        </Button>
        <span>
          {currentUser?.username}
        </span>
      </div> : ''}
    </Navbar>
  );
};