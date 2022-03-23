const generateRandomString = () => {
	let randomString = '';
	const randomNumber = Math.floor(Math.random() * 10);

	for (let i = 0; i < 20 + randomNumber; i++) {
		randomString += String.fromCharCode(65 + Math.floor(Math.random() * 25));
	}

	return randomString;
}

export default generateRandomString;
