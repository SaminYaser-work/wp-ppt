/** @format */

import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { useEffect } from "@wordpress/element";

export default function useSlideRename(clientId) {
    const { updateBlockAttributes } = useDispatch("core/block-editor");

    const { idx, metadata } = useSelect((select) => {
        const allBlocks = select("core/block-editor").getBlocks();
        const slideBlocks = allBlocks.filter((block) => block.name === 'ppt/slide');
        const currentBlockIdx = slideBlocks.findIndex(
            (block) => block.clientId === clientId
        );
        return {
            idx: currentBlockIdx,
            metadata:
                select("core/block-editor").getBlockAttributes(clientId)
                    ?.metadata,
        };
    }, []);

    useEffect(() => {
        updateBlockAttributes(clientId, {
            metadata: {
                ...metadata,
                name: __("Slide #" + (idx + 1), "presentation"),
            },
        });
    }, [idx]);
}
