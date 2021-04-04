# Заключительный проект курса "Машинное обучение в бизнесе"

## Launch Way 1
```s
# Backend
cd backend
docker build . -t tommy/backend
docker run -d -p 8180:8180 -p 8181:8181 -v C:\work\study\geekbrains\geekbrains-ml-in-business\coursework\pretrained_models:/app/models tommy/backend

# Frontend
cd frontend
docker build . -t tommy/frontend
docker run -d -p 3000:3000 tommy/frontend
```

## Launch Way 2
```s
docker-compose up
```

## Launch Way 3
```s
make up
```