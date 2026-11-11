//your JS code here. If required.
const output = document.getElementById("output");

const btn = document.createElement("button");
btn.id = "download-images-button";
btn.textContent = "Download Images";
output.appendChild(btn);

btn.addEventListener("click" , () => {
	btn.disabled = true;
	output.textContent = "downloading...";
	
	const spinner = document.createElement("div");
	spinner.className = "spinner";
	spinner.id = "loading"
	output.appendChild(spinner);
	
	Promise.all(promises)
		.then((responses) => {
			const blobPromises = responses.map((response) =>{
				if (!response.ok) {
					throw new Error("Image download failed")
				}
				return response.blob();	
			});
			return Promise.all(blobPromises);
		})
	
		.then((blobs) => {
			blobs.forEach((blob) => {
				const imageURL = URL.createObjectURL(blob);
	
				const img = document.createElement("img");
				img.src = imageURL;
				output.appendChild(img);
				spinner.remove();
			});
		})
		.catch((error) => {
			const msg = document.createElement("div");
			msg.id = "error";
			msg.textContent = error.message;
			output.appendChild(msg);
			spinner.remove();
	
			
		});
});
btn.disabled = false;

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

const promises = images.map((image) => {
	return fetch(image.url);
});




