/** @format */

import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";

export default function useSlides(clientId, ref) {
    const { selectBlock } = useDispatch("core/block-editor");

    const slides =
        useSelect((select) => {
            const allBlocks = select("core/block-editor").getBlocks();
            return allBlocks.filter((block) => block.name === "ppt/slide");
        }, []) ?? [];

    const getCurrentlySelectedSlideClientId = () => {
        const block = wp.data.select("core/block-editor").getSelectedBlock();
        return block?.name === "ppt/slide" ? block.clientId : null;
    }

    const nextSlide = () => {
        const currentBlockIdx = slides.findIndex(
            (block) => block.clientId === clientId
        );
        const nextBlockIdx = currentBlockIdx + 1;
        if (nextBlockIdx < slides.length) {
            ref.current?.exitFullscreen();
            selectBlock(slides[nextBlockIdx].clientId);
        }
    };

    const prevSlide = () => {
        const currentBlockIdx = slides.findIndex(
            (block) => block.clientId === clientId
        );
        const prevBlockIdx = currentBlockIdx - 1;
        if (prevBlockIdx >= 0) {
            ref.current?.exitFullscreen();
            selectBlock(slides[prevBlockIdx].clientId);
        }
    };

    return {
        slides,
        getCurrentlySelectedSlideClientId,
        nextSlide,
        prevSlide,
    };
}
