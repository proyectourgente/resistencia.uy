import React, {useState, useEffect} from "react"
import {FaArrowDown} from "react-icons/all";

const Accordion = ({title, children, alwaysOpen}) => {
    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        setOpen(alwaysOpen)
    }, [alwaysOpen])

    return (
        <div className="border-l-2 border-transparent">
            <header className={`accordion-title ${alwaysOpen || isOpen ? "open" : ""}`}
                    onClick={() => setOpen(!isOpen)}
                    className="flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none">

                                        <span className="text-grey-darkest font-thin text-lg">
                                           {title}
                                        </span>
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