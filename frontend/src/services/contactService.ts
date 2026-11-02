import type { ApiResponse, ContactFormData, ContactResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export class ContactService {
  /**
   * Submit contact form to Spring Boot backend
   * Endpoint: POST /api/contacts
   */
  static async submitContact(data: ContactFormData): Promise<ApiResponse<ContactResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage = responseBody?.message || `Error ${response.status}: Failed to submit your message.`;
        throw new Error(errorMessage);
      }

      return responseBody as ApiResponse<ContactResponse>;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected network error occurred. Please verify backend service.');
    }
  }

  /**
   * Fetch contacts for admin review
   * Endpoint: GET /api/contacts
   * Protected with Basic / Bearer Auth
   */
  static async getContacts(adminAuth?: string): Promise<ApiResponse<ContactResponse[]>> {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (adminAuth) {
        headers['Authorization'] = adminAuth.startsWith('Basic ') ? adminAuth : `Basic ${adminAuth}`;
      }

      const response = await fetch(`${API_BASE_URL}/api/contacts`, {
        method: 'GET',
        headers,
      });

      const responseBody = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(responseBody?.message || `Access denied (${response.status})`);
      }

      return responseBody as ApiResponse<ContactResponse[]>;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to retrieve contacts list.');
    }
  }
}
