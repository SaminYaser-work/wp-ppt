/** @format */

import { useEffect, useRef, useState } from "@wordpress/element";
import { requestFullScreen } from "../utils";

export default function useFullScreen() {
    const ref = useRef();

    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        isFullscreen && requestFullScreen(ref.current);
    }, [isFullscreen]);

    useEffect(() => {
        function handleFullscreenChange(e) {
            if (document.fullscreenElement) {
                setIsFullscreen(true);
            } else {
                setIsFullscreen(false);
            }
        }
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () =>
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
    }, []);

    function toggleFullScreen() {
        setIsFullscreen((prev) => !prev);
    }

    return {
        fsRef: ref,
        isFullscreen,
        toggleFullScreen,
    };
}
