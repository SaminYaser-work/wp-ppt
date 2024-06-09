/** @format */

import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import "./editor.scss";
import useSlideRename from "./hooks/useSlideRename";

export default function Edit({ clientId, attributes, setAttributes }) {
    useSlideRename(clientId);

    const { children, ...blockProps } = useInnerBlocksProps(useBlockProps(), {
        allowedBlocks: ["core/group", "core/columns"],
    });

    return (
        <div className="ppt-slide-wrapper alignwide">
            <div classname="ppt-slide-header">
                {attributes?.metadata?.name ?? __("Slide", "presentation")}
            </div>
            <div {...blockProps}>{children}</div>
        </div>
    );
}
