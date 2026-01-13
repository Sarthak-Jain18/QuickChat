import SideBar from "../components/SideBar.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import RightSideBar from "../components/RightSideBar.jsx";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext.jsx";

export default function HomePage() {

    const { selectedUser } = useContext(ChatContext)

    return (
        <div className="HomePage border w-full h-screen sm:px-[15%] sm:py-[5%]">
            <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative text-white
                ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`}>

                <SideBar />
                <ChatContainer />
                <RightSideBar />

            </div>
        </div>
    )
}

