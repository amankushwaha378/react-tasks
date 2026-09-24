import {
    forwardRef,
    useImperativeHandle,
    useRef,
} from "react";

const Scrollable = forwardRef((props, ref) => {

    const containerRef = useRef(null);

    useImperativeHandle(ref, () => ({
        scrollToTop() {
            containerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },

        scrollToBottom() {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: "smooth",
            });
        },
    }));

    return (
        <div
            ref={containerRef}
            className="h-[75vh] mb-2 overflow-y-auto rounded-lg border border-gray-300 p-5"
        >
            <div className="space-y-6">
                {Array.from({ length: 30 }, (_, index) => (
                    <div
                        key={index}
                        className="rounded bg-gray-100 p-5"
                    >
                        Content {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Scrollable;