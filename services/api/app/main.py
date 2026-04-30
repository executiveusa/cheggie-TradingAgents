from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.health import router as health_router
from app.routers.analyze import router as analyze_router

app = FastAPI(title="ChatGPT Trade API", version="0.1.0")

origins = [origin.strip() for origin in __import__('os').getenv('CORS_ORIGINS', '*').split(',')]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(analyze_router, prefix="/api")
