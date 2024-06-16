<?php

namespace Ppt;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Ppt_Init {
	public function __construct() {
		add_action( 'init', array( $this, 'create_post_type' ) );
		add_action( 'init', array( $this, 'register_blocks' ) );

		add_action('enqueue_block_assets', function() {
			wp_enqueue_style('dashicons');
		});

		if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
			add_filter( 'block_categories_all', array( $this, 'register_block_category' ) );
		} else {
			add_filter( 'block_categories', array( $this, 'register_block_category' ) );
		}

        add_filter('the_content', array($this, 'prepare_slide_content'));
	}

    function prepare_slide_content($content) {
        $html = '';

        $html .= '<div class="ppt-slide-content" style="display: none;">';
        $html .= $content;
        $html .= '</div>';

        $html .= '<div class="ppt-slide-button-container">';
        $html .= '<button class="ppt-slide-button">';
        $html .= __('Start Presentation', 'presentation');
        $html .= '</button>';
        $html .= '</div>';

        return $html;
    }

	function register_blocks() {
		register_block_type( PPT_DIR . 'build' );
	}

	function register_block_category( $categories ) {

		array_unshift(
			$categories,
			array(
				'slug'  => 'presentation',
				'title' => 'Presentation',
			)
		);
		return $categories;
	}


	public function create_post_type() {
		register_post_type(
			'ppt_presentation',
			array(
				'labels'             => array(
					'name'               => __( 'Presentation', 'presentation' ),
					'singular_name'      => __( 'Presentation', 'presentation' ),
					'add_new'            => __( 'Add New', 'presentation' ),
					'add_new_item'       => __( 'Add New Presentation', 'presentation' ),
					'edit_item'          => __( 'Edit Presentation', 'presentation' ),
					'new_item'           => __( 'New Presentation', 'presentation' ),
					'view_item'          => __( 'View Presentation', 'presentation' ),
					'search_items'       => __( 'Search Presentations', 'presentation' ),
					'not_found'          => __( 'No presentations found', 'presentation' ),
					'not_found_in_trash' => __( 'No presentations found in Trash', 'presentation' ),
					'parent_item_colon'  => __( 'Parent Presentation:', 'presentation' ),
					'menu_name'          => __( 'Presentations', 'presentation' ),
				),
				'public'             => true,
				'show_in_rest'       => true,
				'publicly_queryable' => true,
				'show_ui'            => true,
				'query_var'          => true,
				'capability_type'    => 'post',
				'has_archive'        => true,
				'supports'           => array(
					'title',
					'editor',
					'author',
					'thumbnail',
				),
			)
		);
	}
}
