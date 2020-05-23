export async function preprocess (preprocessor, code) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        preprocessor,
        code
      })
    };
    const response = await fetch(process.env.REACT_APP_PREPROCESS_URL, options);
    return response.json();
  }
  