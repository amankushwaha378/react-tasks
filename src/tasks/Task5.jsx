import { useRef } from "react";
import Scrollable from "../components/Scrollable";

function Task5() {

    const scrollRef = useRef(null);

    return (
        <div className="p-10">

            <Scrollable ref={scrollRef} />

            <div className="mt-5 flex gap-3">

                <button
                    onClick={() =>
                        scrollRef.current.scrollToTop()
                    }
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    ↑ Top
                </button>

                <button
                    onClick={() =>
                        scrollRef.current.scrollToBottom()
                    }
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    ↓ Bottom
                </button>

            </div>

        </div>
    );
}

export default Task5;