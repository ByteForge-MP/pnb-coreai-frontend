# pnb-coreai-frontend

# Initialize in current folder
npm create vite@latest . -- --template react-swc-ts

# Install dependencies immediately
npm install
npm install react-markdown

# Create the core enterprise directories
mkdir -p src/{api,assets,components,config,features,hooks,layouts,pages,stores,types,utils}

# Create the specific OneAI Chat feature structure
mkdir -p src/features/chat/{api,components,hooks,types}

# Windows Command
$env:path (for sys variables print)
