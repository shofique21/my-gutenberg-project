/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps,RichText, MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ( props ) => {
	const {
		attributes: { title, mediaID, mediaURL, ingredients, instructions, healing },
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const onChangeTitle = ( value ) => {
		setAttributes( { title: value } );
	};

	const onSelectImage = ( media ) => {
		setAttributes( {
			mediaURL: media.url,
			mediaID: media.id,
		} );
	};
	const onChangeIngredients = ( value ) => {
		setAttributes( { ingredients: value } );
	};

	const onChangeInstructions = ( value ) => {
		setAttributes( { instructions: value } );
	};
	const onChangeHealing = ( value ) => {
		setAttributes( { healing: value } );
	};

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h2"
				placeholder={ __(
					'Write your section title…',
					'about-us-section'
				) }
				value={ title }
				onChange={ onChangeTitle }
			/>
			<div className="recipe-image">
				<MediaUpload
					onSelect={ onSelectImage }
					allowedTypes="image"
					value={ mediaID }
					render={ ( { open } ) => (
						<Button
							className={
								mediaID ? 'image-button' : 'button button-large'
							}
							onClick={ open }
							
						>
						{ ! mediaID ? ( __( 'Upload Image', 'about-us-section' )) : ( __( 'Replace Image', 'about-us-section' )) }
						</Button>
					) }
				/>
				{ ! mediaID ? (
								__( 'Upload Image', 'about-us-section' )
							) : (
								<img
									src={ mediaURL }
									alt={ __(
										'Upload section Image',
										'about-us-section'
									) }
								/>
							) }
			</div>
			<h3>{ __( 'Asset Management', 'about-us-section' ) }</h3>
			<RichText
				tagName="ul"
				multiline="li"
				placeholder={ __(
					'Write a list of Management…',
					'about-us-section'
				) }
				value={ ingredients }
				onChange={ onChangeIngredients }
				className="ingredients"
			/>
			<h3>{ __( 'Resource Utilization', 'about-us-section' ) }</h3>
			<RichText
				tagName="div"
				multiline="p"
				className="steps"
				placeholder={ __(
					'Write the Utilization',
					'about-us-section'
				) }
				value={ instructions }
				onChange={ onChangeInstructions }
			/>
			<h3>{ __( 'Self-Healing', 'about-us-section' ) }</h3>
			<RichText
				tagName="div"
				multiline="p"
				className="steps"
				placeholder={ __(
					'Write Healing…',
					'about-us-section'
				) }
				value={ healing }
				onChange={ onChangeHealing }
			/>
		</div>
	);
};

export default Edit;