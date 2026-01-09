# Usage Guide - Markdown to PDF Extension

## Quick Start

1. **Install the extension** in VS Code
2. **Open any Markdown file** (`.md` extension)
3. **Convert to PDF** using one of these methods:
   - Right-click in the editor → "Markdown to PDF: Convert to PDF"
   - Right-click on a `.md` file in Explorer → "Markdown to PDF: Convert to PDF"
   - Command Palette (`Cmd/Ctrl+Shift+P`) → "Markdown to PDF: Convert to PDF"

## Requirements

- Chrome, Chromium, or Microsoft Edge must be installed
- The extension will automatically detect your browser installation

## Features

### Supported Markdown Elements

✅ **Text Formatting**
- Bold (`**text**`)
- Italic (`*text*`)
- Strikethrough (`~~text~~`)
- Inline code (`` `code` ``)

✅ **Headings**
- All levels (H1-H6)
- Automatic styling with borders for H1 and H2

✅ **Lists**
- Ordered lists
- Unordered lists
- Nested lists

✅ **Code Blocks**
- Syntax highlighting
- Multiple languages supported

✅ **Tables**
- Full table support
- Alternating row colors
- Border styling

✅ **Links and Images**
- Clickable links in PDF
- Embedded images

✅ **Blockquotes**
- Single and multi-line quotes
- Left border styling

✅ **Horizontal Rules**
- Dividers between sections

## Output Location

The PDF will be created in the **same directory** as your Markdown file with the same name:
- `document.md` → `document.pdf`
- `README.md` → `README.pdf`

## Tips

1. **Image paths**: Use absolute paths or paths relative to your Markdown file
2. **Large files**: Very large Markdown files may take a few seconds to convert
3. **Styling**: The PDF uses GitHub-style markdown rendering
4. **Margins**: PDFs are generated with 20mm margins on all sides

## Troubleshooting

### Browser Not Found Error

If you see "Chrome/Chromium not found":
1. Install Google Chrome, Chromium, or Microsoft Edge
2. Restart VS Code after installation

### PDF Not Generated

1. Check you have write permissions in the directory
2. Ensure the Markdown file is valid
3. Check the Output panel for error messages

### Images Not Showing

- Ensure image paths are correct
- Use absolute paths if relative paths don't work
- Verify image files exist on your filesystem

## Development and Testing

To test the extension during development:
1. Press `F5` to launch Extension Development Host
2. Open a Markdown file in the new window
3. Run the conversion command
4. Check the generated PDF

## Building the Extension

```bash
# Install dependencies
npm install

# Compile for development
npm run compile

# Watch mode for development
npm run watch

# Build for production
npm run package

# Create .vsix package for distribution
npx vsce package
```

## Keyboard Shortcuts

There are no default keyboard shortcuts, but you can add your own:
1. Open Keyboard Shortcuts (`Cmd/Ctrl+K Cmd/Ctrl+S`)
2. Search for "Markdown to PDF: Convert to PDF"
3. Add your preferred shortcut

Example: `Cmd/Ctrl+Shift+P` then type the command name

## License

MIT License - See LICENSE file for details
