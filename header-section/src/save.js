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
export default function save(props) {
	const { attributes } = props;
	const blockStyle = {
		backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};
	return (
		<>
			<div className='headerImage wp-block-post-content' style={blockStyle}>
			  <header>
			    <nav>
				<button><a href='#'>{attributes.menuText}</a> </button>
				</nav>
				   <div className='heading'>
						<h1 className='hexdingtxt'>{attributes.titleText}</h1>
				   </div>
				   <article className='headerText'>
					<p>{attributes.myRichText}</p>
				</article>
			  </header>
			    
			</div>
			
		</>
		
	);
}
