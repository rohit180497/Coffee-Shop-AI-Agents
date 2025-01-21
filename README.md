## Merry's Way Coffee: AI-Driven Coffee Shop Application

Welcome to the Merry's Way Coffee GitHub repository. This project is an innovative coffee shop application designed to bring an engaging and personalized experience to coffee lovers. The app leverages AI-powered agents for chat-based interactions and integrates modern web and mobile development techniques to provide seamless ordering and delivery services.




### AI-Driven Features

#### Agents

Guard Agent: Ensures requests are valid and safe.

Classification Agent: Routes user queries to the appropriate handling agent (details, order, or recommendation).

Details Agent: Provides information about products and services.

Recommendation Agent: Offers personalized suggestions based on user preferences.

Order-Taking Agent: Handles conversations related to order placements.


### Application Flow

Home Screen: Displays a curated list of products and quick access to the chatbot.

Chatbot (ChatRoom): Engages users with AI-driven conversational responses, recommendations, and order placement.

Product Details: Provides detailed product information, ratings, and an option to "Buy Now."

Cart and Orders: Users can view, edit, and place orders directly from their cart.

Thank You Page: Displays a confirmation message upon successful order placement.

### Chatbot Flow

The chatbot leverages the Runpod API for AI-powered interactions:

User inputs are processed by the chatBotService.ts.

Messages are structured and passed to the Runpod API.

Responses are dynamically added to the chat interface.