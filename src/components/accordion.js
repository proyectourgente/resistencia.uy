import React, {useEffect, useState} from "react"
import {FaArrowDown} from "react-icons/all";

const Accordion = ({title, seccion, articulos, children, alwaysOpen}) => {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(alwaysOpen)
    }, [alwaysOpen])

    return (
        <div className="border-l-2 border-transparent">
            <header
                className={`flex justify-between items-center p-2 pl-5 pr-5 cursor-pointer select-none accordion-title ${alwaysOpen || isOpen ? "open bg-azul text-white" : ""}`}
                onClick={() => setOpen(!isOpen)}>
                <div className="flex w-4/5 flex-col">
                    <span className={`font-book w-full text-md ${alwaysOpen || isOpen ? "text-white" : "text-azul"}`}>
                       {title}
                    </span>
                    <span className="w-full"><span className="text-sm">{seccion}</span><span
                        className="text-xs"> ({articulos} artículos)</span></span>
                </div>
                <div
                    className="rounded-full border border-grey w-7 h-7 flex items-center justify-center">
                    <FaArrowDown/>
                </div>
            </header>
            <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
                {children}
            </div>
        </div>
    );
};

export default Accordion