import {SiBloglovin} from "react-icons/si";
import Project from "@/components/Project";

export default function Addproject() {

    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add<span>Project</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin/><span>/</span> <span>Add Project</span>
                </div>
            </div>
            <div className="blogsadd">
                <Project/>
            </div>
        </div>
     
    </>
}