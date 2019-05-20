import React from "react";

export default function ProjectCard(props) {
    return (
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
            <div className="border-r border-b border-l border-t border-gray-400  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                <div className="mb-8">
                    <div className="text-gray-900 font-bold text-xl mb-2">
                        Can coffee make you a better developer?
                    </div>
                    <p className="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Voluptatibus quia, nulla! Maiores et perferendis
                        eaque, exercitationem praesentium nihil.
                    </p>
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
                    <div className="ml-auto w-12 h-12 border-gray-600 border flex items-center justify-center">
                        <i className="fas fa-ellipsis-v" />
                    </div>
                </div>
            </div>
        </div>
    );
}
