def get_chatbot_response(client, messages, temperature = 0.0):
    input_messages = []
    
    for message in messages:
        # print("message in --", message)
        input_messages.append(
            {"role": message["role"], "content": message["content"]}
        )

    response = client.chat.completions.create(
        model = "meta-llama/Meta-Llama-3-8B-Instruct",
        messages = input_messages,
        temperature = 0.0,
        top_p = 0.8,
        max_tokens = 2000,
    ).choices[0].message.content

    return response


def get_embedding(embedding_client, model_name, text_input):
    output = embedding_client.embeddings.create(input= text_input, model=model_name)

    embeddings = []
    for embedding_object in output.data:
        embeddings.append(embedding_object.embedding)

    return embeddings

def double_check_json_output(client,json_string):
    prompt = f""" You will check this json string and correct any mistakes that will make it invalid. Then you will return the corrected json string. Nothing else. 
    If the Json is correct just return it.

    If there is any text before order after the json string, remove it.
    Do NOT return a single letter outside of the json string.
    Make sure that each key is enclosed in double quotes.
    The first thing you write should be open curly braces of the json and the last letter you write should be the closing curly brace.

    You should check the json string for the following text between triple backticks: 
    '''
    {json_string}
    '''
    """

    messages = [{"role": "user", "content": prompt}]

    response = get_chatbot_response(client,messages)
    response  = response.replace("`", "")
    return response 