import Together from 'together-ai'
import { Resident } from '@/contexts/ResidentContext';


// Init Together.AI
const together = new Together({
	apiKey: import.meta.env.VITE_TOGETHER_API_KEY,
	baseURL: import.meta.env.VITE_TOGETHER_BASE_URL
});

// Model
const model = "black-forest-labs/FLUX.1-schnell";

// Age in years helps with the prompt to generate a more accurate image, with date of birth they look a bit younger then the age
function getAgeinYears(dob: string): number { // dob is in the format YYYY-MM-DD
	let year = parseInt(dob.split('/')[0]);
	let month = parseInt(dob.split('/')[1]);
	let day = parseInt(dob.split('/')[2]);
	let today = new Date();
	let birthDate = new Date(year, month, day);
	let age = today.getFullYear() - birthDate.getFullYear();
	return age;
}

function generatePrompt(resident: Resident): string {
	let residentName = `${resident.first_name} ${resident.last_name}`;
	let residentFeatures = [resident.hair, resident.eye];
	let residentAge = getAgeinYears(resident.dob);
	let residentGender = resident.gender;

	console.log(residentGender === "Prefer not to say");
	if (residentGender === "Prefer not to say" || residentGender === "Other") {
		residentGender = "a person";
	}

	let prompt = `Create a headshot photo of ${residentName}, with ${residentFeatures[0]} hair and ${residentFeatures[1]} eyes.
	 They are ${residentGender}. Try and make them look like they are ${residentAge} years old. Give them a random nationality. 
	 Have them look at the camera and smile.`;
	return prompt;
}

export default async function generateResidentImage(resident: Resident) {
	let prompt = generatePrompt(resident);
	console.log("Prompt: ", prompt);
	if (prompt === "") {
		throw new Error("Failed to generate prompt");
	}

	// Generate Image
	const response = await together.images.create({
		prompt: prompt,
		model: model,
		steps: 4,
	})

	return response.data[0].url;
}
