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
	// Handle the error appropriately (e.g., use the encoded value or a default)
	console.error(error);
}

// Custom Cookie Class
class Cookie {
	static get(name) {
		const cookieName = `${encodeURIComponent(name)}=`;
		const cookie = document.cookie;
		let value = null;

		const startIndex = cookie.indexOf(cookieName);

		if (startIndex > -1) {
			let endIndex = cookie.indexOf(';', startIndex);

			if (endIndex == -1) {
				endIndex = cookie.length;
			}

			value = decodeURIComponent(
				cookie.substring(startIndex + name.length + 1, endIndex)
			);
		}

		return value;
	}

	static set(name, value, expires, path, domain, secure) {
		let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
		if (expires instanceof Date) {
			cookieText += `; expires=${expires.toGMTString()}`;
		}

		if (path) cookieText += `; path=${path}`;
		if (domain) cookieText += `; domain=${domain}`;
		if (secure) cookieText += `; secure`;

		document.cookie = cookieText;
	}

	static remove(name, path, domain, secure) {
		Cookie.set(name, '', new Date(0), path, domain, secure);
	}
}

// set expiry data
const date = new Date();

// set a cookie
Cookie.set('username', 'admin', date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000));

// get a cookie
console.log(Cookie.get('username')); // admin

// remove a cookie by a name
Cookie.remove('username');
