/** @format */

import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
import "./editor.scss";
import useSlideRename from "./hooks/useSlideRename";

export default function Edit({ clientId, attributes, setAttributes }) {

	useSlideRename(clientId);

    const blockProps = useInnerBlocksProps(useBlockProps({
		className: "alignfull"
	}),
	{
		allowedBlocks: [ 'core/group', 'core/columns' ]
	}
);

    return <div {...blockProps} />;
}
