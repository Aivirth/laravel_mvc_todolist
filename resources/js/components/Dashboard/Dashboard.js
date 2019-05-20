import React from "react";
import ProjectCard from "../Card/ProjectCard";

export default function Dashboard() {
    return (
        <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2">
                <ProjectCard />
            </div>
            <div className="w-full lg:w-1/2">
                <ProjectCard />
            </div>
            <div className="w-full lg:w-1/2">
                <ProjectCard />
            </div>
            <div className="w-full lg:w-1/2">
                <ProjectCard />
            </div>
        </div>
    );
}
