import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET(request: Request) {
    console.log('Request:', request);

    const url = 'https://www.whatsapp.com';
    const screenshotInterval = 10000; // 10 seconds

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Log in to the page
    await page.goto(url);
    // Implement your login logic here

    // Start capturing screenshots every 10 seconds
    setInterval(async () => {
    const screenshotBuffer = await page.screenshot({ fullPage: true });

        // Here, you can save the screenshot buffer or perform any other desired action
        // For example, you can send the screenshot to a remote storage or display it on a webpage

        // Respond with a success message
        NextResponse.json({ message: 'Screenshot captured', screenshotBuffer }, { status: 200 });
    }, screenshotInterval);
};
    