from agents import (GuardAgent,
                    ClassificationAgent,
                    DetailsAgent,
                    AgentProtocol)
import os
from typing import Dict

def main():
    pass

if __name__ == "__main__":
    guard_agent = GuardAgent()
    classification_agent = ClassificationAgent()

    agent_dict: Dict[str, AgentProtocol] = {
        "details_agent" : DetailsAgent()
    }

    messages= []
    while True:
        # os.system('cls' if os.name == 'nt' else 'clear')
        print("\n\n Print Messages  ......................")

        for message in messages:
            print(f"{message['role'].capitalize()}: {message['content']}")

        #get user input
        prompt = input("User: " )
        messages.append({"role": "user", "content": prompt})

        #get guard agent resposnse
        guard_agent_response = guard_agent.get_response(messages)
        # print("Guard Agent Output: ", guard_agent_response)
        if guard_agent_response["memory"]["guard_decision"] == "not allowed":
            messages.append(guard_agent_response)
            continue

        #get classification Agent's response
        classification_agent_response = classification_agent.get_response(messages)
        choosen_agent = classification_agent_response["memory"]["classification_decision"]
        print("Choosen_agent: ", choosen_agent)

        #get the choosen agent's response
        agent = agent_dict[choosen_agent]
        response = agent.get_response(messages)
        print("final:", response)
        messages.append(response)