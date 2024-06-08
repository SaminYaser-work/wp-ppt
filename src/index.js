/** @format */

import { __ } from "@wordpress/i18n";
import { getCategories, setCategories } from "@wordpress/blocks";
import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";

registerBlockType(metadata.name, {
    edit: Edit,
    save,
});

