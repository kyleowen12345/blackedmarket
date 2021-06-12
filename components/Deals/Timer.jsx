import React from 'react'
import Cookie from 'js-cookie'
import Cookies from 'js-cookie';

const Timer = () => {
    const hoursMinSecs = {hours:1, minutes: 20, seconds: 40}

    const { hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
    const [[hrs, mins, secs], setTime] = React.useState([hours, minutes, seconds]);
    const getStarting=Cookie.get("starting")
    
   
   
    const tick = () => {
        if (hrs === 0 && mins === 0 && secs === 0) 
            reset()
        else if (mins === 0 && secs === 0) {
            setTime([hrs - 1, 59, 59]);
        } else if (secs === 0) {
            setTime([hrs, mins - 1, 59]);
        } else {
            setTime([hrs, mins, secs - 1]);
        }
    };
    const reset = () => setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

    // React.useEffect(() => {
    //     const timerId = setInterval(() => tick(), 1000);
    //     // setInterval(() => { alert("Hello") }, 86400000)
    //     return () => clearInterval(timerId);
    // },[]);
    // React.useEffect(() => {
    //     if(!getStarting){
    //         return  Cookie.set("starting",new Date(),{expires:1})
    //       }else{
    //           return
    //       }
    // },[]);
    return (
        <div>
            <p>{`${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`}</p> 
        </div>
    )
}

export default Timer
