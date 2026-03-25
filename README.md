## Important Commands

#### Initialize in current folder <br>
npm create vite@latest . -- --template react-swc-ts <br>

#### Install dependencies immediately <br>
npm install <br>
npm install react-markdown <br>

#### Create the core enterprise directories <br>
mkdir -p src/{api,assets,components,config,features,hooks,layouts,pages,stores,types,utils} <br>

#### Create the specific OneAI Chat feature structure <br>
mkdir -p src/features/chat/{api,components,hooks,types} <br>

#### Windows Command <br>
$env:path (for sys variables print) <br>

npm install jspdf <br>
npm install chart.js react-chartjs-2 <br>



boxicons <br>



% ######################

git remote -v <br>
If above not give like this -> git remote set-url origin https://github.com/<username>/<repo>.git then our pointing is wrong do like this <br>

(Takes remote changes + keeps your local changes + creates a merge commit) <br>
git pull --no-rebase

% #########################

docker build -t frontend-v1 .  <br>
docker images <br>
docker run -p 3000:80 frontend-v1 <br>

% ##### Delete Image #########
docker ps -a <br>
docker stop <container-id> <br>
docker rm <container-id> <br>
docker rmi <image_name> <br>

% #############################
Docker Hub requires this format: <br>
<dockerhub-username>/<repo-name>:<iamge_name> <br>
byteforgemp/pnb:frontend-v1

% ############ push image to docker hub ############
docker login
docker tag backend-v1 byteforgemp/pnb:backend-v1
docker push byteforgemp/pnb:backend-v1

% ####### Others will pull #########
docker pull byteforgemp/pnb:frontend-v1
docker run -p 3000:80 byteforgemp/pnb:frontend-v1

% ############ Create Network then below docker run #############

docker network create pnb-ai

% ########### Ollama D ##############

docker run -d \
  --name ollama \
  --network pnb-ai \
  ollama/ollama

docker exec -it ollama ollama pull mistral

http://ollama:11434

% ########### SearSnG D ##############

docker run -d \
  --name searxng \
  --network pnb-ai \
  searxng/searxng

http://searxng:8080

% ############## Backend ##############

docker run -d \
  --name backend \
  -p 8000:8000 \
  byteforgemp/pnb:backend-v2

http://localhost:8000

% ############## Frontend ##############

docker run -d \
  --name frontend \
  -p 4200:80 \
  byteforgemp/pnb:frontend-v2

Open:
http://localhost:4200

% ############## Diff Architecture ##############

docker buildx create --use (Enable buildx (one-time))

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t byteforgemp/pnb:frontend-v2 \
  --push .

Frontend is configured to call `http://localhost:8000` directly from the
browser, so make sure the backend container publishes port `8000` to the host.

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t byteforgemp/pnb:backend-v2 \
  --push .

docker buildx build \
  --platform linux/amd64 \
  --build-arg TORCH_INDEX_URL=https://download.pytorch.org/whl/cu121 \
  -t byteforgemp/pnb:backend-v2-gpu \
  --push .





% ##########################

docker run -d \
  --name ollama \
  -p 11434:11434 \
  ollama/ollama

docker exec -it ollama ollama pull mistral

docker run -d \
  --name searxng \
  -p 8080:8080 \
  searxng/searxng

docker run -d \
  --name backend \
  -p 8000:8000 \
  -e OLLAMA_URL=http://host.docker.internal:11434 \
  -e SEARXNG_URL=http://host.docker.internal:8080 \
  byteforgemp/pnb:backend-v2

docker run -d \
  --name frontend \
  -p 4200:80 \
  byteforgemp/pnb:frontend-v2



