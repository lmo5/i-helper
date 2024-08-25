# i-Helper

i-Helper is a cross-platform desktop application that provides various productivity tools, including a chat interface.

## Installation

### Linux
- Download the AppImage or .deb file from the releases.
- For AppImage:
  1. Make it executable: `chmod +x i-helper-x.x.x.AppImage`
  2. Run it: `./i-helper-x.x.x.AppImage`
- For .deb:
  1. Install with: `sudo dpkg -i i-helper_x.x.x_amd64.deb`
  2. Run from the applications menu or command line: `i-helper`

### Windows
1. Download the installer (.exe) from the releases.
2. Run the installer and follow the prompts.
3. Launch i-helper from the Start menu or desktop shortcut.

### macOS
1. Download the .dmg file from the releases.
2. Open the .dmg file.
3. Drag the i-helper app to the Applications folder.
4. Launch i-helper from the Applications folder or Launchpad.

## Development

### Prerequisites
- Node.js (v14 or later)
- Rust (latest stable version)
- Cargo (comes with Rust)

### Setup
1. Clone the repository
2. Frontend setup:
   ```
   cd i-helper-frontend
   npm install
   ```
3. Backend setup:
   ```
   cd i-helper-backend
   cargo build
   ```

### Running in Development Mode
1. Start the backend:
   ```
   cd i-helper-backend
   cargo run
   ```
2. In a new terminal, start the frontend:
   ```
   cd i-helper-frontend
   npm run dev
   ```

### Building for Production
Run the build script from the project root:
```
./build.sh
```

## License
[Your chosen license]

## Contributing
[Your contribution guidelines]

## Support
[How users can get support or report issues]