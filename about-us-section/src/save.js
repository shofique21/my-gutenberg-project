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
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
const Save = ( props ) => {
	const {
		attributes: { title, mediaURL, ingredients, instructions, healing },
	} = props;

	const blockProps = useBlockProps.save();
	return (
		<div  { ...blockProps }>
		  <div className='row'>
		      <RichText.Content tagName="h2" className='sectionTitle' value={ title } />
		  </div>
			<div className='row'>
				<div className='col-6'>
				{ mediaURL && (
				<img
					className="recipe-image"
					src={ mediaURL }
					alt={ __( 'Recipe Image', 'about-us-section' ) }
				/>
			) }
				</div>
				<div className='col-6'>
				<h3>{ __( `Asset Management`, 'about-us-section' ) }</h3>
				<RichText.Content
					tagName="ul"
					className="ingredients"
					value={ ingredients }
				/>

				<h3>{ __( `Resource Utilization`, 'about-us-section' ) }</h3>
				<RichText.Content
					tagName="div"
					className="steps"
					value={ instructions }
				/>
				<h3>{ __( `Self-Healing`, 'about-us-section' ) }</h3>
				<RichText.Content
					tagName="div"
					className="steps"
					value={ healing }
				/>
				</div>
			</div>
		</div>
	);
};

export default Save;