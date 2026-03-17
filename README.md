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
docker tag frontend-v1 byteforgemp/pnb:frontend-v1
docker push byteforgemp/pnb:frontend-v1

% ####### Others will pull #########
docker pull byteforgemp/pnb:frontend-v1
docker run -p 3000:80 byteforgemp/pnb:frontend-v1





