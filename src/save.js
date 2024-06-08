/** @format */

import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
export default function save() {
    const blockProps = useInnerBlocksProps.save(useBlockProps.save());

    return <div {...blockProps} />;
}
