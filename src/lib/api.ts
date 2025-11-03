import type { Flight } from '@/lib/types';

export async function getFlights(): Promise<Flight[]> {
  try {
    const response = await fetch('https://flight-explorer-api.codewalnut.com/api/flights', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    if (!response.ok) {
      console.error('Failed to fetch flights, status:', response.status);
      return []; // Return empty array on error to prevent crashing
    }
    const data = await response.json();
    return data.flights;
  } catch (error) {
    console.error('API Fetch Error:', error);
    return []; // Return empty array on error
  }
}
