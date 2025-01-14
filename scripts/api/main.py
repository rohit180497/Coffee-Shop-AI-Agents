
from agent_controller import AgentController
import runpod

def main():
    agene_controller = AgentController()
    runpod.serverless.start({"handler": agene_controller.get_response})
    print("Hello")


if __name__ =="__main__":
    main()