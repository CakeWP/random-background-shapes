/**
 * Will be enqueued in the editor context.
 */
import './editor.scss';

/**
 * Will be enqueued on frontend.
 */
import './style.scss';

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';

import shapes from './shapes.json';

 
const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {

        if ( props.name !== "core/cover" ) {
            return <BlockEdit {...props} />
        }

        const updateBackgroundShape = () => {

            const newRandomShape = shapes[Math.floor(Math.random() * shapes.length)];
            const encodedShape = `data:image/svg+xml,` + encodeURIComponent(newRandomShape);

            props.setAttributes({ url: encodedShape });

        }

        return (
            <Fragment>
                <BlockEdit { ...props } />
                <BlockControls>
                    <ToolbarGroup>
                        <ToolbarButton 
                            showTooltip
                            icon="update"
                            onClick={updateBackgroundShape}
                            label={__('Update shape', 'gutenberghub-random-background')}
                        />
                    </ToolbarGroup>
                </BlockControls>
            </Fragment>
        );
    };
}, 'withInspectorControl' );
 
addFilter(
    'editor.BlockEdit',
    'my-plugin/with-inspector-controls',
    withInspectorControls
);
