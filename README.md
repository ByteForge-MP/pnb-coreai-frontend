# pnb-coreai-frontend

# Create the project with React and TypeScript (SWC for faster builds)
npm create vite@latest pnb-oneai-frontend -- --template react-swc-ts

# Enter the directory and install base dependencies
cd pnb-oneai-frontend
npm install

# Initialize in current folder
npm create vite@latest . -- --template react-swc-ts

# Install dependencies immediately
npm install


# Create the core enterprise directories
mkdir -p src/{api,assets,components,config,features,hooks,layouts,pages,stores,types,utils}

# Create the specific OneAI Chat feature structure
mkdir -p src/features/chat/{api,components,hooks,types}

