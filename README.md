## Merry's Way Coffee: AI-Driven Coffee Shop Application

Welcome to the Merry's Way Coffee GitHub repository. This project is an innovative coffee shop application designed to bring an engaging and personalized experience to coffee lovers. The app leverages AI-powered agents for chat-based interactions and integrates modern web and mobile development techniques to provide seamless ordering and delivery services.

## Architecture Overview: CafeBot System

![Architecture Diagram](architecture/Coffee-Shop-AI-Agents-Architecture.png)

**1. Development and Deployment Workflow**

    Data Sources:

    - Product Details: Includes name, description, price, and other metadata.
    - Historical Orders Data: Used to power recommendation engines.
    - Product Images: Managed and uploaded via Firebase for 

**2. Embedding and Recommendation Engine:**

    Utilizes Hugging Face for embedding generation using models like bge-small-en-v1.5.

    The Apriori Algorithm is implemented to provide product recommendations.

    Agents are orchestrated as follows:

    - Guard Agent: Ensures safety and compliance.
    - Classification Agent: Directs user inputs to the appropriate agent.
    - Details Agent: Retrieves product information.
    - Order Taking Agent: Manages order placement.
    - Recommendation Agent: Provides suggestions based on user preferences.

**3. Firebase Integration:**

    All images are stored and managed using Firebase.

    Firebase Uploader handles image and data uploads seamlessly.

**4. Containerization and Deployment:**

    A Docker image is created for API services and uploaded to DockerHub.

    The application is deployed and accessible through RunPod endpoints for serverless execution.


**5. Multi-Agent and RAG Workflow**

    Agent Workflow:

    User inputs are classified by the Input Classifier Agent to determine the query type.
    Safe questions bypass the Guard Agent; otherwise, the input is validated.
    
    Depending on the query:
    Order Agent processes orders.
    Recommendation Agent suggests products.
    Details Agent retrieves product data.
    
    Response Coordination:
    Responses are fetched from the RunPod API and sent back to the user


**6. Android Application Development**

    Frontend Development:

    Built using React Native, leveraging TypeScript for type safety and JavaScript for component logic.

    The mobile app integrates the chatbot interface for engaging user interactions.

### **Application Flow**

1. **Home Screen**: Displays a curated list of products and quick access to the chatbot.
2. **Chatbot (ChatRoom)**: Engages users with AI-driven conversational responses, recommendations, and order placement.
3. **Product Details**: Provides detailed product information, ratings, and an option to "Buy Now."
4. **Cart and Orders**: Users can view, edit, and place orders directly from their cart.
5. **Thank You Page**: Displays a confirmation message with animations upon successful order placement.

---

## AI-Driven Features

### **Agents**
- **Guard Agent**: Ensures requests are valid and safe.
- **Classification Agent**: Routes user queries to the appropriate handling agent (details, order, or recommendation).
- **Details Agent**: Provides information about products and services.
- **Recommendation Agent**: Offers personalized suggestions based on user preferences.
- **Order-Taking Agent**: Handles conversations related to order placements.

### **Chatbot Flow**
The chatbot leverages the **Runpod API** for AI-powered interactions:
- User inputs are processed by the `chatBotService.ts`.
- Messages are structured and passed to the Runpod API.
- Responses are dynamically added to the chat interface.

---

## Setup and Installation

### **Prerequisites**
1. Node.js and npm installed.
2. Expo CLI (`npm install -g expo-cli`).
3. Firebase account for real-time database.
4. Runpod account and API key.

### **Steps to Run Locally**
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/rohit180497/Coffee-Shop-AI-Agents.git
    cd Coffee-Shop-AI-Agents/coffee_shop_app
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Setup Environment Variables:**
   Create a `.env` file in the `config/` directory and add:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=<your_firebase_api_key>
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
   EXPO_PUBLIC_FIREBASE_DATABASE_URL=<your_database_url>
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=<your_project_id>
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=<your_sender_id>
   EXPO_PUBLIC_FIREBASE_APP_ID=<your_app_id>
   EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=<your_measurement_id>
   RUNPOD_TOKEN=<your_runpod_api_key>
   RUNPOD_CHATBOT_URL=<your_runpod_chatbot_url>
   RUNPOD_EMBEDDING_URL=<your_runpod_embedding_url>

4. **Run the App:**
    ```bash
    npm start expo -c
    ```


## Contribution Guidelines

I welcome contributions from the community. Follow these steps:

1. **Fork the Repository**

2. **Create a Branch**
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. **Make Changes and Commit**
    ```bash
    git commit -m "Added a new feature"
    ```

4. **Push to Your Fork**
    ```bash
    git push origin feature/your-feature-name
    ```

5. **Submit a Pull Request**


## Future Enhancements
- Integration with payment gateways.
- Advanced order tracking.
- Enhanced AI recommendations based on user purchase history.
- Multi-language support for chatbot interactions.

## License

-This project is licensed under the MIT License. See the LICENSE file for details.