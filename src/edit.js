/** @format */

import { __ } from "@wordpress/i18n";
import { useBlockProps, useInnerBlocksProps, InspectorControls, BlockControls } from "@wordpress/block-editor";
import {PanelBody, SelectControl, Toolbar, ToolbarButton} from '@wordpress/components';
import "./editor.scss";
import useSlideRename from "./hooks/useSlideRename";
import { useDispatch } from "@wordpress/data";

export default function Edit({ clientId, attributes, setAttributes }) {
    useSlideRename(clientId);

    const { children, ...blockProps } = useInnerBlocksProps(useBlockProps(), {
        allowedBlocks: ["core/group", "core/columns"],
    });

	const { transition } = attributes;

	const {selectBlock} = useDispatch('core/block-editor');

    return (
        <>
			<BlockControls>
				<Toolbar>
					<ToolbarButton
						icon={<span className="dashicons dashicons-fullscreen-alt"></span>}
						label={__("Fullscreen Preview", "presentation")}
						onClick={console.log('clicked')}
					/>
				</Toolbar>
			</BlockControls>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={__("Transition", "presentation")}
						value={transition}
						options={[
							{ label: __("None", "presentation"), value: "" },
							{ label: __("Fade", "presentation"), value: "fade" },
							{ label: __("Slide In", "presentation"), value: "slide_in" },
						]}
						onChange={(transition) => setAttributes({transition})}
					/>
				</PanelBody>
			</InspectorControls>


            <div className="ppt-slide-wrapper alignwide">
                <div classname="ppt-slide-header" onClick={() => selectBlock(clientId)}>
                    {attributes?.metadata?.name ?? __("Slide", "presentation")}
                </div>
                <div {...blockProps}>{children}</div>
            </div>
        </>
    );
}
