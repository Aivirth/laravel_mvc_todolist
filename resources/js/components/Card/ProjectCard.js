import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function ProjectCard(props) {
    const { title, description, id } = props;
    return (
        <div className="max-w-sm w-full lg:max-w-full lg:flex mb-4">
            <div className="w-full mr-2 ml-2 border border-gray-400  bg-white  p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        {title}
                    </div>
                    <p className="text-gray-700 text-base">{description}</p>
                </div>
                {/* <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full mr-4"
                        src="/img/jonathan.jpg"
                        alt="Avatar of Jonathan Reinink"
                    />

                    <div className="text-sm">
                        <p className="text-gray-900 leading-none">
                            Jonathan Reinink
                        </p>
                        <p className="text-gray-600">Aug 18</p>
                    </div>
                </div> */}
                <div className="flex">
                    <div className=" flex items-center justify-center ">
                        <span className="flex items-center justify-center rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                            New
                        </span>
                        <span className="flex items-center justify-center rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                            New
                        </span>
                    </div>

                    {/* <div className="ml-auto w-8 h-8 border-gray-600 border flex items-center justify-center">
                        <i className="fas fa-ellipsis-v" />
                    </div> */}
                    <Link className="ml-auto" to={`/projects/${id}`}>
                        View
                    </Link>
                </div>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </div>
        </div>
    );
}
