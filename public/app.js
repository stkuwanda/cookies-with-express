console.log('Running...');

function getCookieValue(cookieName) {
	const name = cookieName + '=';
	const decodedCookie = decodeURIComponent(document.cookie); // Decode the entire cookie string
	const cookieArray = decodedCookie.split(';'); // Split into individual cookies

	for (let i = 0; i < cookieArray.length; i++) {
		let cookie = cookieArray[i];

		while (cookie.charAt(0) == ' ') {
			cookie = cookie.substring(1); // Remove leading spaces
		}

		if (cookie.indexOf(name) == 0) {
			let value = cookie.substring(name.length, cookie.length);
			return value; // Return the decoded value
		}
	}

	throw Error('Cookie not found!');
}

// Setting a cookie (for demonstration - you would typically do this on the server)
function setCookie(name, value, days) {
	let date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + date.toUTCString();
	document.cookie =
		name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/';
}

setCookie('my_encoded_cookie', 'This is a value with spaces and % signs!', 7);

setTimeout(() => {}, 1000);

// Example usage:
try {
	const decodedValue = getCookieValue('my_encoded_cookie');
	console.log('Decoded value:', decodedValue);
} catch (error) {
	console.error(error);
	// Handle the error appropriately (e.g., use the encoded value or a default)
}
