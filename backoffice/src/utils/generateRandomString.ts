const generateRandomString = () => {
	let randomString = '';
	const randomNumber = Math.floor(Math.random() * 10);

	for (let i = 0; i < 20 + randomNumber; i++) {
		randomString += String.fromCharCode(60 + Math.floor(Math.random() * 79));
	}

	return randomString;
}

export default generateRandomString;
