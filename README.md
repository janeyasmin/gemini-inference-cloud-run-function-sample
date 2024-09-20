# Gemini Inference Cloud Run Function Sample

This repo contains the code for a HTTP-trigger Cloud Run Function that calls the Gemini API for text generation.

## Getting Started

To run the app locally using the [Functions Framework](https://cloud.google.com/functions/docs/running/function-frameworks):

```bash
npm start
```

To deploy the app to Cloud Run:

```bash
gcloud functions deploy gemini-http-service \
--gen2 \
--region={REGION} \
--source=. \
--entry-point=geminiHttp \
--trigger-http \
--runtime=nodejs20 \
--service-account={SERVICE_ACCOUNT_ADDRESS}
```

## Sample request and response

**Request**:

```
curl --location 'https://gemini-http-service-978768153094.us-central1.run.app' \
--header 'Content-Type: application/json' \
--data '{
    "prompt": "1.I was very happy with the agent'\''s support during our call.; 2. I was very unhappy"
}'
```

**Response**:

```
Gemini Response: [
    {
        "review": "I was very happy with the agent's support during our call.",
        "sentiment-class": "positive",
        "sentiment-score": 4
    },
    {
        "review": "I was very unhappy",
        "sentiment-class": "negative",
        "sentiment-score": 1
    }
]
```
