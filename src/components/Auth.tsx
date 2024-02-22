import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import Button from 'react-bootstrap/Button';

const cookies = new Cookies();
interface AuthProps {
    setIsAuth: (isAuth: boolean) => void;
}

export const Auth: React.FC<AuthProps> = ({setIsAuth}) => {
    const singInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set('auth-token', result.user.refreshToken);
            setIsAuth(true);
        } catch (error) {
            console.error(error);
        }
    }
    return (
    <div className="auth">
        <p>Sing In with Google to continue</p>
        <Button className=" btn-info" onClick={singInWithGoogle}>Sing In</Button>
    </div>
    )}