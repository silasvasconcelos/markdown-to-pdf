# Change Log

All notable changes to the "markdown-to-pdf" extension will be documented in this file.

## [0.0.1] - 2026-01-09

### Added
- Initial release of Markdown to PDF extension
- Convert Markdown files to PDF with a single command
- Beautiful GitHub-style formatting for PDF output
- Context menu integration for easy access
- Command palette support
- Progress notifications during conversion
- Auto-detection of Chrome/Chromium/Edge browsers
- Support for all standard Markdown features:
  - Headings (H1-H6)
  - Text formatting (bold, italic, strikethrough)
  - Code blocks with syntax highlighting
  - Inline code
  - Lists (ordered and unordered)
  - Tables with styling
  - Blockquotes
  - Links and images
  - Horizontal rules
- Professional PDF styling with proper margins and typography
- Option to open or reveal generated PDF after conversion

### Technical Details
- Uses `markdown-it` for Markdown parsing
- Uses `puppeteer-core` for PDF generation
- Supports Chrome, Chromium, and Microsoft Edge
- Cross-platform support (macOS, Windows, Linux)
