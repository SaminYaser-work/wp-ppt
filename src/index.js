/** @format */

import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import { registerPlugin } from "@wordpress/plugins";
import { render } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { useDispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";

registerBlockType(metadata.name, {
    edit: Edit,
    save,
});

const AddNewSlideButton = () => {
    const { insertBlock } = useDispatch("core/block-editor");

    const onClick = () => {
        insertBlock(
            createBlock("ppt/slide", {}, [createBlock("core/group", {})])
        );
    };

    return (
        <Button onClick={onClick} variant="primary">
            {__("Add New Slide", "presentation")}
        </Button>
    );
};

registerPlugin("ppt-add-new-slide", {
    render: () => {
        const unsub = wp.data.subscribe(() => {
            const settingsSection = document.querySelector(
                ".edit-post-header__settings"
            );
            if (
                settingsSection &&
                !settingsSection.querySelector(".ppt-add-new-slide-wrapper")
            ) {
                const div = document.createElement("div");
                div.classList.add("ppt-add-new-slide-wrapper");
                settingsSection.insertBefore(div, settingsSection.firstChild);
                render(<AddNewSlideButton />, div);
            }
        });
    },
});
