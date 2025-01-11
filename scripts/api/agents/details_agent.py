from openai import OpenAI
from .utils import get_chatbot_response, get_embedding
from copy import deepcopy
from pinecone import Pinecone
import dotenv
import os
import json
dotenv.load_dotenv()

class DetailsAgent():
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv("RUNPOD_TOKEN"),
            base_url = os.getenv("RUNPOD_CHATBOT_URL")
        )
        self.model_name = os.getenv("MODEL_NAME")
        self.embedding_client = OpenAI(
            api_key= os.getenv("RUNPOD_TOKEN"),
            base_url= os.getenv("RUNPOD_EMBEDDING_URL")
        )
        self.pc = Pinecone(api_key= os.getenv("PINECONE_API_KEY"))
        self.index_name = os.getenv("PINECONE_INDEX_NAME")


    def get_closest_result(self, index_name, input_embeddings, top_k=2):
        # Get the closest results from the Pinecone index
        index = self.pc.Index(index_name)

        results = index.query(
            namespace= "ns1",
            vector= input_embeddings,
            top_k= top_k,
            include_values= False,
            include_metadata= True
        )

        return results

    def get_response(self, messages):
        messages = deepcopy(messages)

        user_response = messages[-1]["content"]
        embeddings = get_embedding(self.embedding_client, self.model_name, user_response)[0]
        result = self.get_closest_result(self.index_name, embeddings)
        source_knowledge = "\n".join([x['metadata']['text'].strip()+"\n" for x in result["matches"]])

        prompt = f"""
        Using the contexts below answer the query:

        contexts: {source_knowledge}
        query: {user_response}
        
        """

        system_prompt = """
        You are a customer support agent for a coffee shop called Merry's way. You should answer every question as if you are waiter and provide the neccessary information to the user regarding their orders        
        """

        messages[-1]["content"] = prompt
        
        print("DEBUG - Messages Data Type:", type(messages))
        print("DEBUG - Message Content:", messages)

        input_response = [{"role":"system", "content": system_prompt}]  + messages[-3:]
        print("Input Data Type: ", type(input_response))
        print("input to chatbot: ", input_response)
        chatbot_output = get_chatbot_response(self.client, self.model_name, input_response)
        output = self.postprocess(chatbot_output)
        print("DA Chatbot OP: ", output)
        return output

    def postprocess(self, output):
        output = {
            "role" : "assistant",
            "content" : output,
            "memory" : {
                "agent": "details_agent"
            }
        }
        return output