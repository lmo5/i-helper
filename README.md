 i-Helper

i-Helper is a cross-platform desktop application that provides various productivity tools, including a chat interface.

## Development with Docker and X11 Forwarding

### Prerequisites
- Docker
- Docker Compose
- X11 server (typically pre-installed on Ubuntu)

### Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/i-helper.git
   cd i-helper
   ```

2. Install X11 (if not already installed):
   ```
   sudo apt-get update
   sudo apt-get install xorg openbox
   ```

3. Start the development environment:
   ```
   ./start-dev.sh
   ```

   This script will:
   - Allow local X11 connections
   - Start the Docker Compose services

This will start three services:
- Frontend (React): accessible at http://localhost:3000
- Backend (Rust): running on http://localhost:3030
- Electron: will open the Electron window on your host machine

4. View logs:
   ```
   docker-compose logs -f [service_name]
   ```
   Replace [service_name] with frontend, backend, or electron.

5. Stop the development environment:
   ```
   docker-compose down
   ```
6. The Electron application should start automatically. If you're running on a local machine with a display, you should see the Electron window. If you're running on a remote server, you might need to set up X11 forwarding to see the GUI.

## Troubleshooting

### Network Issues

If you encounter network-related errors when building the Docker images or running the containers, try the following steps:

1. Ensure you have a stable internet connection.

2. If you're behind a corporate proxy, configure Docker to use the proxy:
   - Edit or create `/etc/docker/daemon.json`:
     ```json
     {
       "proxies": {
         "default": {
           "httpProxy": "http://proxy.example.com:8080",
           "httpsProxy": "http://proxy.example.com:8080",
           "noProxy": "localhost,127.0.0.1"
         }
       }
     }
     ```
   - Restart the Docker daemon: `sudo systemctl restart docker`

3. If the issue persists, try rebuilding the images from scratch:
   ```
   docker-compose down --rmi all
   docker-compose up --build
   ```

4. If you're still encountering issues with fetching the crates.io index, you can try manually updating it:
   - Enter the backend container: `docker-compose run --rm backend bash`
   - Inside the container, run:
     ```
     mkdir -p ~/.cargo/registry
     git clone https://github.com/rust-lang/crates.io-index.git ~/.cargo/registry/index
     ```
   - Exit the container and rebuild: `docker-compose up --build`

If none of these steps resolve the issue, please check your firewall settings and ensure that Docker has the necessary network access.

### X11 Forwarding

If you encounter issues with the Electron window not appearing:

1. Ensure X11 forwarding is allowed:
   ```
   xhost +local:
   ```

2. Check if the DISPLAY environment variable is set correctly:
   ```
   echo $DISPLAY
   ```
   It should typically be ":0" or similar.

3. If issues persist, try running the Electron service with:
   ```
   docker-compose run --rm electron npm run dev:electron
   ```

### Making Changes

- Frontend: Edit files in `./i-helper-frontend/src`. Changes will be hot-reloaded.
- Backend: Edit files in `./i-helper-backend/src`. The server will restart automatically when files change.
- Electron: Changes to the main process (`./i-helper-frontend/src/main/main.ts`) require a rebuild. Stop the containers and run `./start-dev.sh` again.

## Building for Production

To build the application for production, use the existing build script:

```
./build.sh
```

This will create distributables for Linux, Windows, and macOS in the `i-helper-frontend/dist` directory.



## Installation (for end-users)

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

## License
[Your chosen license]

## Contributing
[Your contribution guidelines]

## Support
[How users can get support or report issues]

## Project Structure

### Backend (Rust)

The backend is structured as follows:

```
i-helper-backend/
├── src/
│   ├── main.rs
│   ├── routes/
│   │   ├── mod.rs
│   │   └── chat.rs
│   └── handlers/
│       ├── mod.rs
│       └── chat.rs
└── Cargo.toml
```

- `main.rs`: The entry point of the application. It sets up the server and routes.
- `routes/`: Contains route definitions.
  - `mod.rs`: Exports the routes.
  - `chat.rs`: Defines the chat route.
- `handlers/`: Contains request handlers.
  - `mod.rs`: Exports the handlers.
  - `chat.rs`: Implements the chat functionality.

### Frontend (React + Electron)

The frontend is structured as follows:

```
i-helper-frontend/
├── public/
│   └── index.html
├── src/
│   ├── index.tsx
│   ├── App.tsx
│   ├── features/
│   │   ├── chat/
│   │   │   └── ChatInterface.tsx
│   │   └── dashboard/
│   │       └── Dashboard.tsx
│   └── main/
│       └── main.ts
├── package.json
├── tsconfig.json
├── tsconfig.electron.json
└── Dockerfile.dev
```

- `public/`: Contains the main HTML file.
- `src/`: Contains the React application code and Electron main process.
  - `index.tsx`: The entry point for the React application.
  - `App.tsx`: The main React component.
  - `features/`: Contains feature-specific components.
  - `main/main.ts`: Contains Electron's main process code.
- `package.json`: Defines scripts and dependencies for both React and Electron.
- `tsconfig.json`: TypeScript configuration for React.
- `tsconfig.electron.json`: TypeScript configuration for Electron.
- `Dockerfile.dev`: Defines how to build the Docker image for development, including Electron setup.
