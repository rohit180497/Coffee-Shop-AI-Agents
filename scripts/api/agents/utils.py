def get_chatbot_response(client, messages, temperature = 0.0):
    input_messages = []
    for message in messages:
        input_messages.append({"role": message["role"], "content": message["content"]}
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
    output = embedding_client.embedding.create(input= text_input, model=model_name)

    embeddings = []
    for embedding_object in output.data:
        embeddings.append(embedding_object.embedding)

    return embeddings