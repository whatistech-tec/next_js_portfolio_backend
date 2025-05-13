import {RiBarChartHorizontalLine} from "react-icons/ri";
import {GoScreenFull} from "react-icons/go";
import {BiExitFullscreen} from "react-icons/bi";
import {useState} from 'react';
import LoginLayout from "./LoginLayout";


export default function Header({handleAsideOpen}) {

    const [isFullscreen,setIsFullscreen] = useState(false);

    const toggleFullScreen = () => {
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen().then(() => {
                setIsFullscreen(true);
            })
        }else{
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            })
        }
    }
   
    return <>
        <LoginLayout>
            <header className="header flex flex-sb">
                <div className="logo flex gap-2">
                    <h1>ADMIN</h1>
                    {session ? <div className="headerham flex flex-center" onClick = {handleAsideOpen}>
                        <RiBarChartHorizontalLine/>
                    </div> : null}
                    
                </div>
                <div className="rightnav flex gap-2">
                    <div onClick={toggleFullScreen}>
                        {isFullscreen ? <BiExitFullscreen/> : <GoScreenFull/>}              
                    </div>
                    <div className="notification">
                        <img src="/img/notification.png" alt="notification"/>
                    </div>
                    <div classNmae="profilenav">
                        <img src="/img/user.png" alt="user"/>
                    </div>
                </div>
            </header>
            
        </LoginLayout>
    </>
}