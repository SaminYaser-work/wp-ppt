/** @format */

import { __ } from "@wordpress/i18n";
import {
    useBlockProps,
    useInnerBlocksProps,
    InspectorControls,
    BlockControls,
} from "@wordpress/block-editor";
import {
    PanelBody,
    SelectControl,
    ToolbarButton,
    ToolbarGroup,
} from "@wordpress/components";
import "./editor.scss";
import useSlideRename from "./hooks/useSlideRename";
import { useDispatch } from "@wordpress/data";
import useFullScreen from "./hooks/useFullScreen";

const TRANSITIONS = [
    { label: __("None", "presentation"), value: "" },
    {
        label: __("Fade", "presentation"),
        value: "fade",
    },
    {
        label: __("Slide In", "presentation"),
        value: "slide_in",
    },
];

export default function Edit({ clientId, attributes, setAttributes }) {
    const { transition } = attributes;

    useSlideRename(clientId);

    const { fsRef: ref, isFullscreen, toggleFullScreen } = useFullScreen();

    const { selectBlock } = useDispatch("core/block-editor");

    const blockProps = useInnerBlocksProps(
        useBlockProps({
            style: {
                height: isFullscreen ? "100%" : "fit-content",
            },
        }),
        {
            allowedBlocks: ["core/group", "core/columns"],
        }
    );

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon={
                            <span className="dashicons dashicons-fullscreen-alt"></span>
                        }
                        label={__("Fullscreen Preview", "presentation")}
                        onClick={toggleFullScreen}
                        isActive={isFullscreen}
                    />
                </ToolbarGroup>
                <ToolbarGroup
                    controls={TRANSITIONS.map(({ label, value }) => ({
                        icon: (
                            <span className="dashicons dashicons-embed-generic"></span>
                        ),
                        title: label,
                        onClick: () => setAttributes({ transition: value }),
                    }))}
                    icon={
                        <span>
                            {
                                TRANSITIONS.filter(
                                    ({ value }) => value === transition
                                )[0].label
                            }
                        </span>
                    }
                    isCollapsed
                    title="Transition"
                />
            </BlockControls>
            <InspectorControls>
                <PanelBody>
                    <SelectControl
                        label={__("Transition", "presentation")}
                        value={transition}
                        options={TRANSITIONS}
                        onChange={(transition) => setAttributes({ transition })}
                    />
                </PanelBody>
            </InspectorControls>

            <div className="ppt-slide-wrapper alignfull">
                <div
                    className="ppt-slide-header"
                    onClick={() => selectBlock(clientId)}
                >
                    {attributes?.metadata?.name ?? __("Slide", "presentation")}
                </div>
                {isFullscreen ? (
                    <div className="ppt-bg" ref={ref}>
                        <Content blockProps={blockProps} />
                    </div>
                ) : (
                    <Content blockProps={blockProps} />
                )}
            </div>
        </>
    );
}

function Content({ blockProps }) {
    return <div {...blockProps} />;
}

function Controls({ exitFullscreen, nextSlide, prevSlide }) {
    return (
        <div className="ppt-controls">
            <span
                onClick={prevSlide}
                role="button"
                className="dashicons dashicons-controls-back"
            ></span>
            <span
                onClick={nextSlide}
                role="button"
                className="dashicons dashicons-controls-forward"
            ></span>
            <span
                onClick={exitFullscreen}
                role="button"
                className="dashicons dashicons-fullscreen-exit-alt"
            ></span>
        </div>
    );
}
