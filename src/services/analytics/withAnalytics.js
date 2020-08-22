import React, { useState, useCallback } from "react";
import { AnalyticsContext } from "./analyticsContext";
import { analytics } from "./index";


export const withAnalytics = ( Component ) => (props) => {
    const [ analyticsFunctions, setAnalyticsFunctions] = useState({
        setUserId: () => {},
        setCurrentScreen: () => {}
    });
    
    const inicializeAnalitics = useCallback(() => {
        const { setUserId, setCurrentScreen} = analytics();
        setAnalyticsFunctions({
            setUserId,
            setCurrentScreen
        });
    }, [])

    const initialState = {
        acceptAnalytics: inicializeAnalitics,
        ...analyticsFunctions
    }
    return (
        <AnalyticsContext.Provider value={initialState}>
            <Component {...props} />
        </AnalyticsContext.Provider>
    )
}