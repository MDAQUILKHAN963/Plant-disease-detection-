# Plant Disease Detection System

![Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)
![React](https://img.shields.io/badge/react-18-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

An AI-powered web application that identifies plant diseases from leaf images using deep learning. This system leverages transfer learning with MobileNetV2 to classify plant diseases across common crops including apples, potatoes, and tomatoes.

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/MDAQUILKHAN963/Plant-disease-detection-.git
   cd Plant-disease-detection-
   ```

## Features

- 🎯 **Real-time Disease Detection**: Upload leaf images to get instant disease predictions
- 🧠 **Deep Learning Model**: MobileNetV2-based transfer learning for accurate classification
- 🖼️ **User-friendly Interface**: Modern React UI with drag-and-drop image upload
- 📊 **Confidence Scores**: Get prediction confidence levels for each classification
- 🐳 **Docker Support**: Containerized backend and frontend for easy deployment
- 🔄 **CORS Enabled**: Full cross-origin support for seamless frontend-backend communication

## Project Structure

```
.
├── backend/                 # FastAPI backend server
│   ├── main.py             # API endpoints
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile          # Backend container configuration
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx         # Main React component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Styling
│   ├── package.json        # Node dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── Dockerfile          # Frontend container configuration
│   └── README.md
├── models/                 # ML model scripts
│   ├── train_model.py      # Model training script
│   └── preprocess.py       # Data preprocessing utilities
└── data/                   # Sample data directory
    └── samples/
```

## Tech Stack

**Backend:**
- FastAPI - Modern Python web framework
- TensorFlow/Keras - Deep learning framework
- Uvicorn - ASGI web server
- Python 3.x

**Frontend:**
- React 18+ - UI library
- Vite - Build tool and dev server
- Framer Motion - Animation library
- Lucide React - Icon library
- Axios - HTTP client

**Machine Learning:**
- MobileNetV2 - Pre-trained base model
- Custom CNN architecture available
- Transfer learning approach

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- Docker & Docker Compose (optional)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Backend

```bash
cd backend
python -m uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm run dev
```

The UI will be available at `http://localhost:5173`

### Using Docker

Build and run with Docker Compose:

```bash
docker-compose up --build
```

## Usage

1. Open the frontend application in your browser
2. Upload a plant leaf image by:
   - Clicking the upload area
   - Dragging and dropping an image
3. Click "Predict Disease" to analyze the image
4. View the prediction results with confidence scores

## Supported Plant Classes

The model currently classifies the following diseases:

- **Apple**: Apple scab, Black rot, Cedar apple rust, Healthy
- **Potato**: Early blight, Late blight, Healthy
- **Tomato**: Early blight, Late blight, Healthy

## API Endpoints

### Health Check
```
GET /ping
```

### Disease Prediction
```
POST /predict
```

Request: Multipart form data with image file
Response: JSON with disease prediction and confidence score

## Model Training

To train or fine-tune the model:

1. Prepare your dataset following the PlantVillage format
2. Update the data path in `models/train_model.py`
3. Run:
```bash
python models/train_model.py
```

The trained model will be saved as `plant_disease_model.h5`

## Configuration

- **Image Size**: 224x224 pixels
- **Batch Size**: 32
- **Epochs**: 10 (customizable)
- **Model**: MobileNetV2 with frozen base layers

## Future Improvements

- [ ] Add real-time camera feed support
- [ ] Implement model explainability (LIME/SHAP)
- [ ] Add disease treatment recommendations
- [ ] Support for additional plant types
- [ ] Model quantization for mobile deployment
- [ ] User authentication and history tracking

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- PlantVillage dataset for training data
- TensorFlow/Keras community
- FastAPI and React communities

## Contact

For questions or suggestions, please open an issue or contact the project maintainers.
