from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from PIL import Image
import io
import tensorflow as tf
import os

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model (In production, replace with path to actual saved model)
# For demo, we'll use a mocked function or load if file exists
MODEL_PATH = "plant_disease_model.h5"
model = None

# Sample Class Names (PlantVillage Subset)
CLASS_NAMES = [
    "Apple___Apple_scab", "Apple___Black_rot", "Apple___Cedar_apple_rust", "Apple___healthy",
    "Potato___Early_blight", "Potato___Late_blight", "Potato___healthy",
    "Tomato___Early_blight", "Tomato___Late_blight", "Tomato___healthy"
]

def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = tf.keras.models.load_model(MODEL_PATH)
        print("Model loaded.")
    else:
        print("Model file not found. Running in demo mode with random predictions.")

@app.on_event("startup")
async def startup_event():
    load_model()

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(io.BytesIO(data)))
    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    
    # Preprocessing
    img_batch = np.expand_dims(image, 0)
    img_resized = tf.image.resize(img_batch, (224, 224))
    img_normalized = img_resized / 255.0

    if model:
        predictions = model.predict(img_normalized)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = np.max(predictions[0])
    else:
        # Demo mode: Random prediction if no model is found
        import random
        predicted_class = random.choice(CLASS_NAMES)
        confidence = random.uniform(0.85, 0.99)

    return {
        'class': predicted_class,
        'confidence': float(confidence),
        'is_healthy': "healthy" in predicted_class.lower()
    }

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8000)
