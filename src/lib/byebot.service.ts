export interface ValidationResponse {
  valid: boolean;
  message?: string;
  rawResponse?: unknown;
}

export interface ValidationOptions {
  apiKey: string;
  token: string;
}

/**
 * Validates the Byebot token server-side.
 */
export async function validateByebotToken(
  options: ValidationOptions
): Promise<ValidationResponse> {
  const { apiKey, token } = options;

  try {
    const response = await fetch('https://challenge.byebot.de/validate_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: apiKey,
        token: token,
      }),
    });

    if (!response.ok) {
      return { valid: false, message: `Server error: ${response.status}` };
    }

    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return { valid: true, rawResponse: data };
  } catch (error) {
    return {
      valid: false,
      message: error instanceof Error ? error.message : 'Unknown validation error',
    };
  }
}
