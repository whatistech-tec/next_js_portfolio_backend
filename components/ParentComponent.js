import Header from "./Header";
import Aside from "./Aside";


export default function ParentComponent(props) {


    return (
        <div>
            <Header handleAsideOpen={props.appAsideOpen}/>
            <Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideOpen}/>
         
        </div>
    );
}

 
