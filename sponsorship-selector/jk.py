import requests

api_key = "<apiKey>"

url = "https://api.elevenlabs.io/v1/convai/conversations"

headers = {
    "xi-api-key": "sk_98fe52f543f76b47422eefc55d5fddb2df40b9d7cba38701"
}

response = requests.get(url, headers=headers)

print(response.json())