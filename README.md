# Markdown to PDF

A Visual Studio Code extension that converts Markdown files to beautifully formatted PDF documents.

## Features

- **Easy Conversion**: Convert any Markdown file to PDF with a single command
- **Beautiful Styling**: Professional GitHub-style formatting with syntax highlighting
- **Context Menu Integration**: Right-click on any Markdown file to convert
- **Command Palette Access**: Use the command palette for quick conversion
- **Progress Notifications**: Real-time feedback during the conversion process
- **Auto-Open**: Option to automatically open or reveal the generated PDF

## Requirements

This extension requires Chrome, Chromium, or Microsoft Edge to be installed on your system for PDF generation. The extension will automatically detect the browser installation.

### Supported Browsers
- Google Chrome
- Chromium
- Microsoft Edge
- Google Chrome Canary

## Installation

1. Install the extension from the VS Code Marketplace
2. Ensure you have Chrome, Chromium, or Edge installed
3. Open any Markdown file and start converting!

## Usage

There are multiple ways to convert a Markdown file to PDF:

### Method 1: Context Menu (Right-Click)
1. Right-click on a Markdown file in the Explorer
2. Select **"Markdown to PDF: Convert to PDF"**
3. The PDF will be generated in the same directory as the Markdown file

### Method 2: Editor Context Menu
1. Open a Markdown file in the editor
2. Right-click anywhere in the editor
3. Select **"Markdown to PDF: Convert to PDF"**

### Method 3: Command Palette
1. Open a Markdown file
2. Press `Cmd+Shift+P` (macOS) or `Ctrl+Shift+P` (Windows/Linux)
3. Type "Markdown to PDF: Convert to PDF" and press Enter

## Output

- The PDF file will be created in the same directory as your Markdown file
- The PDF filename will match your Markdown filename (e.g., `README.md` → `README.pdf`)
- After conversion, you'll see a notification with options to:
  - **Open PDF**: Opens the PDF in your default PDF viewer
  - **Reveal in Finder/Explorer**: Shows the PDF file in your file manager

## Styling

The generated PDFs include:
- GitHub-style markdown rendering
- Syntax highlighting for code blocks
- Professional typography
- Responsive tables
- Styled blockquotes
- Proper heading hierarchy
- Print-optimized layout with margins

## Supported Markdown Features

- Headings (H1-H6)
- Bold, italic, and strikethrough text
- Links and images
- Code blocks with syntax highlighting
- Inline code
- Lists (ordered and unordered)
- Tables
- Blockquotes
- Horizontal rules
- HTML (when enabled)

## Troubleshooting

### "Chrome/Chromium not found" Error

If you see this error, please install one of the supported browsers:
- **macOS**: Install from [Google Chrome](https://www.google.com/chrome/) or [Microsoft Edge](https://www.microsoft.com/edge)
- **Windows**: Install from [Google Chrome](https://www.google.com/chrome/) or [Microsoft Edge](https://www.microsoft.com/edge)
- **Linux**: Install via package manager:
  ```bash
  # Ubuntu/Debian
  sudo apt install chromium-browser
  
  # Fedora
  sudo dnf install chromium
  
  # Arch
  sudo pacman -S chromium
  ```

### PDF Generation Fails

- Ensure you have write permissions in the directory
- Check that the Markdown file is not corrupted
- Try closing and reopening VS Code
- Check the Output panel (View → Output → Markdown to PDF) for detailed error messages

## Known Issues

- Very large Markdown files (>10MB) may take longer to convert
- Some complex HTML embedded in Markdown may not render perfectly
- Images with relative paths must exist in the file system

## Release Notes

### 0.0.1

Initial release of Markdown to PDF:
- Convert Markdown files to PDF
- Beautiful GitHub-style formatting
- Context menu integration
- Command palette support
- Auto-detection of Chrome/Chromium

## Contributing

Found a bug or have a feature request? Please open an issue on our [GitHub repository](https://github.com/yourusername/markdown-to-pdf).

## License

This extension is licensed under the MIT License.

---

**Enjoy converting your Markdown files to beautiful PDFs!** 📄✨
