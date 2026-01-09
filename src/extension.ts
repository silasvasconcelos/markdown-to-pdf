// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import MarkdownIt from 'markdown-it';
import puppeteer from 'puppeteer-core';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdown-to-pdf" is now active!');

	// Register the convert to PDF command
	const disposable = vscode.commands.registerCommand('markdown-to-pdf.convertToPdf', async (uri?: vscode.Uri) => {
		try {
			// Get the active text editor or use the URI from context menu
			let markdownUri: vscode.Uri | undefined = uri;
			
			if (!markdownUri) {
				const editor = vscode.window.activeTextEditor;
				if (editor) {
					markdownUri = editor.document.uri;
				}
			}

			if (!markdownUri) {
				vscode.window.showErrorMessage('No markdown file is open or selected.');
				return;
			}

			// Check if the file is a markdown file
			if (!markdownUri.fsPath.endsWith('.md')) {
				vscode.window.showErrorMessage('The selected file is not a markdown file.');
				return;
			}

			// Show progress notification
			await vscode.window.withProgress({
				location: vscode.ProgressLocation.Notification,
				title: "Converting Markdown to PDF",
				cancellable: false
			}, async (progress) => {
				progress.report({ increment: 0, message: "Reading markdown file..." });

				// Read the markdown file
				const markdownContent = fs.readFileSync(markdownUri!.fsPath, 'utf-8');

				progress.report({ increment: 20, message: "Converting markdown to HTML..." });

				// Convert markdown to HTML
				const md = new MarkdownIt({
					html: true,
					linkify: true,
					typographer: true
				});
				const htmlContent = md.render(markdownContent);

				progress.report({ increment: 40, message: "Generating PDF..." });

				// Create full HTML document with styling
				const fullHtml = createStyledHtml(htmlContent, path.basename(markdownUri!.fsPath));

				// Generate PDF
				const pdfPath = markdownUri!.fsPath.replace(/\.md$/, '.pdf');
				await generatePdf(fullHtml, pdfPath);

				progress.report({ increment: 100, message: "PDF generated successfully!" });

				// Show success message with option to open
				const action = await vscode.window.showInformationMessage(
					`PDF generated successfully: ${path.basename(pdfPath)}`,
					'Open PDF',
					'Reveal in Finder/Explorer'
				);

				if (action === 'Open PDF') {
					vscode.env.openExternal(vscode.Uri.file(pdfPath));
				} else if (action === 'Reveal in Finder/Explorer') {
					vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(pdfPath));
				}
			});

		} catch (error) {
			vscode.window.showErrorMessage(`Failed to convert markdown to PDF: ${error}`);
			console.error(error);
		}
	});

	context.subscriptions.push(disposable);
}

/**
 * Creates a styled HTML document from the markdown content
 */
function createStyledHtml(htmlContent: string, filename: string): string {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${filename}</title>
	<style>
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		
		body {
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
				'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
			line-height: 1.6;
			color: #333;
			background-color: #fff;
			padding: 40px;
			max-width: 900px;
			margin: 0 auto;
		}
		
		h1, h2, h3, h4, h5, h6 {
			margin-top: 24px;
			margin-bottom: 16px;
			font-weight: 600;
			line-height: 1.25;
			color: #1a1a1a;
		}
		
		h1 {
			font-size: 2em;
			border-bottom: 2px solid #eaecef;
			padding-bottom: 0.3em;
			margin-top: 0;
		}
		
		h2 {
			font-size: 1.5em;
			border-bottom: 1px solid #eaecef;
			padding-bottom: 0.3em;
		}
		
		h3 {
			font-size: 1.25em;
		}
		
		h4 {
			font-size: 1em;
		}
		
		p {
			margin-bottom: 16px;
		}
		
		a {
			color: #0366d6;
			text-decoration: none;
		}
		
		a:hover {
			text-decoration: underline;
		}
		
		code {
			background-color: rgba(27, 31, 35, 0.05);
			border-radius: 3px;
			font-size: 85%;
			margin: 0;
			padding: 0.2em 0.4em;
			font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
		}
		
		pre {
			background-color: #f6f8fa;
			border-radius: 6px;
			font-size: 85%;
			line-height: 1.45;
			overflow: auto;
			padding: 16px;
			margin-bottom: 16px;
		}
		
		pre code {
			background-color: transparent;
			border: 0;
			display: inline;
			line-height: inherit;
			margin: 0;
			overflow: visible;
			padding: 0;
			word-wrap: normal;
		}
		
		blockquote {
			border-left: 4px solid #dfe2e5;
			color: #6a737d;
			padding-left: 16px;
			margin-bottom: 16px;
		}
		
		table {
			border-collapse: collapse;
			border-spacing: 0;
			width: 100%;
			margin-bottom: 16px;
		}
		
		table tr {
			background-color: #fff;
			border-top: 1px solid #c6cbd1;
		}
		
		table tr:nth-child(2n) {
			background-color: #f6f8fa;
		}
		
		table th,
		table td {
			border: 1px solid #dfe2e5;
			padding: 6px 13px;
		}
		
		table th {
			font-weight: 600;
			background-color: #f6f8fa;
		}
		
		ul, ol {
			margin-bottom: 16px;
			padding-left: 2em;
		}
		
		li {
			margin-bottom: 4px;
		}
		
		img {
			max-width: 100%;
			height: auto;
			margin-bottom: 16px;
		}
		
		hr {
			height: 0.25em;
			padding: 0;
			margin: 24px 0;
			background-color: #e1e4e8;
			border: 0;
		}
		
		@media print {
			body {
				padding: 20px;
			}
		}
	</style>
</head>
<body>
	${htmlContent}
</body>
</html>`;
}

/**
 * Generates a PDF from HTML content using Puppeteer
 */
async function generatePdf(html: string, outputPath: string): Promise<void> {
	let browser;
	
	try {
		// Try to find Chrome/Chromium installation
		const chromePath = await findChrome();
		
		if (!chromePath) {
			throw new Error('Chrome/Chromium not found. Please install Chrome or Chromium to use this extension.');
		}

		// Launch browser
		browser = await puppeteer.launch({
			executablePath: chromePath,
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		});

		const page = await browser.newPage();
		await page.setContent(html, { waitUntil: 'networkidle0' });

		// Generate PDF
		await page.pdf({
			path: outputPath,
			format: 'A4',
			margin: {
				top: '20mm',
				right: '20mm',
				bottom: '20mm',
				left: '20mm'
			},
			printBackground: true
		});

	} finally {
		if (browser) {
			await browser.close();
		}
	}
}

/**
 * Finds Chrome/Chromium executable path
 */
async function findChrome(): Promise<string | undefined> {
	// Common Chrome/Chromium paths for different platforms
	const possiblePaths = process.platform === 'darwin' 
		? [
			'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
			'/Applications/Chromium.app/Contents/MacOS/Chromium',
			'/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
			'/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'
		]
		: process.platform === 'win32'
		? [
			'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
			'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
			'C:\\Program Files\\Chromium\\Application\\chrome.exe',
			'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
		]
		: [
			'/usr/bin/google-chrome',
			'/usr/bin/chromium-browser',
			'/usr/bin/chromium',
			'/snap/bin/chromium'
		];

	// Check if any of the common paths exist
	for (const chromePath of possiblePaths) {
		if (fs.existsSync(chromePath)) {
			return chromePath;
		}
	}

	// Try using chrome-launcher to find Chrome dynamically
	try {
		const chromeLauncher = await import('chrome-launcher');
		const installations = await chromeLauncher.Launcher.getInstallations();
		if (installations.length > 0) {
			return installations[0];
		}
	} catch (error) {
		console.error('Error finding Chrome with chrome-launcher:', error);
	}

	return undefined;
}

// This method is called when your extension is deactivated
export function deactivate() {}
