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
import { useBlockProps, RichText, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ResponsiveWrapper } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { TextControl } from '@wordpress/components';
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

export default function Edit(props) {
	const blockProps = useBlockProps();
	const { attributes, setAttributes } = props;
	const removeMedia = () => {
		props.setAttributes({
			mediaId: 0,
			mediaUrl: ''
		});
	}

	const onSelectMedia = (media) => {
		props.setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	}

	const blockStyle = {
		// backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
		backgroundImage: attributes.mediaUrl != '' ? 'url("' + attributes.mediaUrl + '")' : 'url("/my-project/wp-content/uploads/2022/03/bg15.jpg")'
	};
	return (
		<>
				<InspectorControls>
					<PanelBody
						title={__('Select block background image', 'awp')}
						initialOpen={true}
					>
						<div className="editor-post-featured-image">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={onSelectMedia}
									value={attributes.mediaId}
									allowedTypes={['image']}
									render={({ open }) => (
										<Button
											className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
											onClick={open}
										>
											{attributes.mediaId == 0 && __('Choose an image', 'awp')}
											{props.media != undefined &&
												<ResponsiveWrapper
													naturalWidth={props.media.media_details.width}
													naturalHeight={props.media.media_details.height}
												>
													<img src={props.media.source_url} />
												</ResponsiveWrapper>
											}
										</Button>
									)}
								/>
							</MediaUploadCheck>
							{attributes.mediaId != 0 &&
								<MediaUploadCheck>
									<MediaUpload
										title={__('Replace image', 'awp')}
										value={attributes.mediaId}
										onSelect={onSelectMedia}
										allowedTypes={['image']}
										render={({ open }) => (
											<Button onClick={open} isDefault isLarge>{__('Replace image', 'awp')}</Button>
										)}
									/>
								</MediaUploadCheck>
							}
							{attributes.mediaId != 0 &&
								<MediaUploadCheck>
									<Button onClick={removeMedia} isLink isDestructive>{__('Remove image', 'awp')}</Button>
								</MediaUploadCheck>
							}
						</div>
					</PanelBody>
				</InspectorControls>
				<div className='imageStyle' style={blockStyle}>
				 <RichText
				 	tagName='button'
					 value={attributes.menuText}
					 placeholder="Button Text"
					 onChange={(newtext) => setAttributes({ menuText: newtext })}
				  />
				  <RichText  
					  tagName="h1"
					  className="titleText"
					  placeholder= "Your heading title"
					  value={attributes.titleText}
					  onChange={(headingText) => setAttributes({ titleText: headingText })}

				  />
						<RichText
						tagName="p"
						className='headerContent'
						placeholder="The riding of waves has likely existed since humans began swimming in the ocean."
						value={attributes.myRichText}
						onChange={(newtext) => setAttributes( { myRichText: newtext })}
					/>
				</div>
		</>

	);
}
