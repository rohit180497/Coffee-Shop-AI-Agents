from agents import (GuardAgent,
                    ClassificationAgent,
                    DetailsAgent,
                    AgentProtocol,
                    RecommendationAgent,
                    OrderTakingAgent)
import os
from typing import Dict
import pathlib

folder_path = pathlib.Path(__file__).parent.resolve()

class AgentController():
    def __init__(self)
