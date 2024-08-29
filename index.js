const sharp = require('sharp');
const Tesseract = require('tesseract.js');

async function extractAadhaarNumber(imagePath) {
    try {
        // Process the image using Sharp (optional, depending on your use case)
        const processedImage = await sharp(imagePath)
            .grayscale()
            
            .toBuffer();

        // Use Tesseract.js to perform OCR on the processed image
        const { data: { text } } = await Tesseract.recognize(processedImage, 'eng', {
            tessedit_char_whitelist: '0123456789', // Restrict to numbers only
        });

        // Extract Aadhaar number pattern (12-digit number)
        const aadhaarNumberMatch = text.match(/\b\d{4}\s\d{4}\s\d{4}\b/);

        if (aadhaarNumberMatch) {
            return aadhaarNumberMatch[0].replace(/\s+/g, '');
        } else {
            throw new Error('Aadhaar number not found.');
        }
    } catch (error) {
        console.error('Error extracting Aadhaar number:', error);
        throw error;
    }
}

module.exports = extractAadhaarNumber;
