<?php
/**
 * Plugin Name:       Presentation
 * Description:       A plugin to create powerpoint-like presentation
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Samin Yaser
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       presentation
 *
 * @package Ppt
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'PPT_VERSION', '0.1.0' );
define( 'PPT_DIR', plugin_dir_path( __FILE__ ) );
define( 'PPT_URL', plugin_dir_url( __FILE__ ) );

require_once PPT_DIR . 'includes/class-ppt-init.php';

new \Ppt\Ppt_Init();
