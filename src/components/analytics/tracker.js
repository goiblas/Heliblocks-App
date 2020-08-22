import { useContext, useEffect } from "react";
import { AnalyticsContext } from "services/analytics";
import { AuthContext } from "services/auth";
import { useLocation } from "react-router-dom";

export const Tracker = () => {
    const { pathname } = useLocation();
    const { setCurrentScreen, setUserId } = useContext(AnalyticsContext);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setCurrentScreen(pathname);
    }, [pathname, setCurrentScreen]);

    useEffect(() => {
        if(user && user.uid) {
            setUserId(user.uid);
        }
    }, [user, setUserId]);
    
    return null;
}