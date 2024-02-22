import { useState, useRef } from "react"
import { Auth } from "./components/Auth";
import Cookies from "universal-cookie";
import { Chat } from "./components/Chat";
import { signOut } from "firebase/auth";
import {auth} from "./firebase-config";
import Button from 'react-bootstrap/Button';

const cookies = new Cookies();



function App() {
  const [isAuth, setIsAuth] = useState<boolean>(cookies.get('auth-token'));
  const [room, setRoom] = useState<string | null>(null);
  const roomInputRef = useRef<HTMLInputElement | null>(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove('auth-token');
    setIsAuth(false);
    setRoom(null);
  }

 if(!isAuth) {
    return (
    <>
     <Auth setIsAuth={setIsAuth}/>
    </>
  )}
  return (
    <>
      {room ? (
      <Chat room={room}/>
      ) : (
      <div className="room">
        <label>Enter room name:</label>
        <input ref={roomInputRef}/>
        <Button className="btn-info" onClick={() => setRoom(roomInputRef.current && roomInputRef.current.value)}>Enter chat</Button>
      </div>
      )}
      <div className="sign-out">
        <Button onClick={signUserOut} className="btn-light">Sign Out</Button>
      </div>
    </>
  )
}

export default App
