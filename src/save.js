/** @format */

import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";
export default function save({ attributes }) {
    const blockProps = useInnerBlocksProps.save(
        useBlockProps.save({
            "data-attributes": encodeURIComponent(JSON.stringify(attributes)),
        })
    );

    return <div {...blockProps} />;
}
