export default function (userInput) {
  for (const field in userInput) {
    if (userInput[field].trim() == '') {
      throw new Error(`${field} is required!`);
    }
  }
  if (Number.isNaN(Number(userInput.price)) && Number(userInput.price) > 0) {
    throw new Error('Price must be a number!');
  }
  if (userInput.brand.length < 2) {
    throw new Error('The Brand should be at least 2 characters');
  }
  if (userInput.model.length < 5) {
    throw new Error('The Model should be at least 5 characters');
  }
  if (userInput.hardDisk.length < 5) {
    throw new Error('The Hard Disk should be at least 5 characters');
  }
  if (userInput.screenSize.length < 1) {
    throw new Error('The Screen Size should be at least 1 characters');
  }
  if (userInput.ram.length < 2) {
    throw new Error('The Ram should be at least 2 characters');
  }
  if (userInput.operatingSystem.length < 5 || userInput.operatingSystem.length > 20) {
    throw new Error('The Operating System should be between 5 and 20 characters long');
  }
  if (userInput.cpu.length < 10 || userInput.cpu.length > 50) {
    throw new Error('The CPU should be between 10 and 50 characters long');
  }
  if (userInput.gpu.length < 10 || userInput.gpu.length > 50) {
    throw new Error('The GPU should be between 10 and 50 characters long');
  }
  if (userInput.color.length < 2 || userInput.color.length > 10) {
    throw new Error('The Color should be between 2 and 10 characters long');
  }
  if (userInput.weight.length < 1) {
    throw new Error('The Weight should be at least 1 characters long');
  }
  if (!userInput.image.startsWith('http://') && !userInput.image.startsWith('https://')) {
    throw new Error('The Image should start with http:// or https://');
  }
}
