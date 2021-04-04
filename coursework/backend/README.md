```s 
docker build . -t tommy/backend
docker run -d -p 8180:8180 -p 8181:8181 -v C:\work\study\geekbrains\geekbrains-ml-in-business\coursework\pretrained_models:/app/models tommy/backend
```