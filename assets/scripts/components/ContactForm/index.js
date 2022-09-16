import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import emailValidator from 'email-validator';
import './styles.scss';

/**
 * Validates a form element and also returns validation errors.
 *
 * @param {Element} el DOM element object.
 * @returns {object} Validation signals
 */
const validateInput = ( el ) => {
	let valid = false;
	let errorMsg;

	switch ( el.name ) {
		case 'name':
			// Validate the field length.
			valid = el.value.length >= 3;
			if ( ! valid ) {
				errorMsg = 'You need at least 3 characters.';
			}
			break;

		case 'email':
			// Validate the field length.
			valid = el.value.length >= 3;
			if ( ! valid ) {
				errorMsg = 'You need at least 3 characters.';
				break;
			}

			valid = emailValidator.validate( el.value );
			if ( ! valid ) {
				errorMsg = 'You must use a valid email address.';
			}
			break;

		case 'message':
			// Validate the field length.
			valid = el.value.length >= 10;
			if ( ! valid ) {
				errorMsg = 'You need at least 10 characters.';
			}
			break;

		case 'accepted-terms':
			// Validate that the checkbox is checked.
			valid = el.checked;
			if ( ! valid ) {
				errorMsg = 'You must accept the terms';
			}
			break;

		default:
			break;
	}

	return {
		valid,
		errorMsg,
	};
};

/**
 * Contact form component.
 *
 * @returns {string} React component
 */
function ContactForm() {
	const form = useRef();

	// Can either be invalid, valid, success, or error
	const [ formState, setFormState ] = useState( 'invalid' );
	const [ formVals, setFormVals ] = useState();
	const [ formValidation, setFormValidation ] = useState( {
		name: { valid: false },
		email: { valid: false },
		message: { valid: false },
		'accepted-terms': { valid: false },
	} );

	/**
	 * OnBlur handler.
	 *
	 * @param {Event} event Event interface
	 */
	const onBlur = ( event ) => {
		event.persist();
		setFormValidation( () => ( {
			...formValidation,
			[event.target.name]: validateInput( event.target ),
		} ) );
	};

	/**
	 * Either fires the on change handler immediately or passes it to a debounce function.
	 * The update is not postponed when the element has an active error
	 *
	 * @param {Event} event Event interface
	 * @returns {undefined} Void
	 */
	const onChange = ( event ) => {
		event.persist();

		setFormVals( () => ( {
			...formVals,
			[event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
		} ) );

		if ( event.target.name === 'accepted-terms' ) {
			onBlur( event );
		}
	};

	/**
	 * Form submission event handler.
	 *
	 * @param {Event} event Form submission event.
	 * @returns {undefined} Void
	 */
	const onSubmitHandler = async ( event ) => {
		event.preventDefault();

		emailjs.sendForm( 'service_hfygmy3', 'template_o92c8tf', form.current, '9UAwdVcxjatg6YnQG' )
			.then( ( result ) => {
				// @todo - Success handler.
			}, ( error ) => {
				// @todo - Error handler.
			} );

		// @tdo Handle the form submission with error and success states.
		formState( 'success' );
	};

	/**
	 * Creates an error message element for an input.
	 *
	 * @param {string} msg Error message to be displayed
	 * @returns {string} Input error markup
	 */
	const InputErrorEl = ( msg ) => <span className="msg">{ msg }</span>;

	/**
	 * Creates a form-level success message element.
	 *
	 * @param {string} msg Success message to be displayed
	 * @returns {string} Success markup
	 */
	const formSuccessEl = ( msg ) => <div className="success">{ msg }</div>;

	/**
	 * Creates a form-level error message elenent.
	 *
	 * @param {string} msg Error message to be displayed
	 * @returns {string} Form error markup
	 */
	const formErrorEl = ( msg ) => <div className="error">{ msg }</div>;

	/**
	 * Creates the form elements.
	 *
	 * @returns {string} Form elements
	 */
	const formEl = () => (
		<form
			ref={ form }
			className="contact-form"
			onSubmit={ onSubmitHandler }
		>

			<label className="contact-form__name-label" htmlFor="name">
				{ ! formValidation.name?.valid && InputErrorEl( formValidation.name.errorMsg ) }
				<input
					className="contact-form__name"
					id="contact-form__name"
					name="name"
					placeholder="Name"
					required
					type="text"
					onBlur={ onBlur }
					onChange={ onChange }
				/>
			</label>

			<label className="contact-form__email-label" htmlFor="email">
				{ ! formValidation.email?.valid && InputErrorEl( formValidation.email.errorMsg ) }
				<input
					className="contact-form__email"
					id="contact-form__email"
					name="email"
					placeholder="Email"
					required
					type="email"
					onBlur={ onBlur }
					onChange={ onChange }
				/>
			</label>

			<label className="contact-form__message-label" htmlFor="message">
				{ ! formValidation.message?.valid && InputErrorEl( formValidation.message.errorMsg ) }
				<textarea
					className="contact-form__message"
					id="contact-form__message"
					name="message"
					placeholder="Message..."
					required
					onBlur={ onBlur }
					onChange={ onChange }
				/>
			</label>

			<label className="contact-form__accepted-terms-label" htmlFor="accepted-terms">
				{ ! formValidation['accepted-terms']?.valid && InputErrorEl( formValidation['accepted-terms'].errorMsg ) }
				<a className="contact-form__accepted-terms-anchor" href="https://www.chadort.com/legal/terms-of-service/">I accept the terms of service</a>
				<input
					className="contact-form__accepted-terms"
					id="contact-form__accepted-terms"
					name="accepted-terms"
					required
					type="checkbox"
					onChange={ onChange }
				/>
			</label>

			<button
				className="contact-form__submit"
				disabled={ ! ( formState === 'valid' ) }
				type="submit"
			>
				Send Your Message
			</button>
		</form>
	);

	/**
	 * Returns the view that matches the form state.
	 *
	 * @returns {string} Form markup
	 */
	const getFormView = () => {
		switch ( formState ) {
			case 'success':
				return formSuccessEl( 'something' );
			case 'error':
				return formErrorEl( 'something' );
			default:
				return formEl();
		}
	};

	/**
	 * Runs after formValues states has changed.
	 *
	 * @returns {undefined} Void
	 */
	useEffect( () => {
		setFormState( Object.keys( formValidation ).every( ( item ) => formValidation[item].valid ) ? 'valid' : 'invalid' );
	}, [ formValidation ] );

	return ( getFormView() );
}

export default ContactForm;
