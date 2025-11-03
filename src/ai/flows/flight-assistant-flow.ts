'use server';
/**
 * @fileOverview A flight assistant AI agent that provides travel advisories.
 *
 * - getFlightTravelAdvisory - A function that provides weather and airport status.
 * - FlightTravelAdvisoryInput - The input type for the getFlightTravelAdvisory function.
 * - FlightTravelAdvisoryOutput - The return type for the getFlightTravelAdvisory function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const FlightTravelAdvisoryInputSchema = z.object({
  flightNumber: z.string().describe('The flight number, e.g., "UA123".'),
  originCity: z.string().describe('The city the flight is departing from.'),
  destinationCity: z.string().describe('The city the flight is arriving in.'),
});
export type FlightTravelAdvisoryInput = z.infer<typeof FlightTravelAdvisoryInputSchema>;

const FlightTravelAdvisoryOutputSchema = z.object({
  weatherReport: z.string().describe("A concise, real-time weather report for the destination city. Include temperature, conditions (e.g., sunny, rainy), and wind."),
  airportStatus: z.string().describe("A summary of the operational status for both the origin and destination airports. Mention any significant delays, closures, or other issues reported."),
});
export type FlightTravelAdvisoryOutput = z.infer<typeof FlightTravelAdvisoryOutputSchema>;

export async function getFlightTravelAdvisory(input: FlightTravelAdvisoryInput): Promise<FlightTravelAdvisoryOutput> {
  return flightAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flightAssistantPrompt',
  input: { schema: FlightTravelAdvisoryInputSchema },
  output: { schema: FlightTravelAdvisoryOutputSchema },
  prompt: `You are an expert flight travel assistant. Your task is to provide a real-time travel advisory for flight {{{flightNumber}}} from {{{originCity}}} to {{{destinationCity}}}.

Please provide the following information based on the most current data available:
1.  **Weather Report:** A concise, real-time weather report for the destination city ({{{destinationCity}}}). Include the temperature, overall conditions (e.g., sunny, rainy, cloudy), and wind speed.
2.  **Airport Status:** A summary of the current operational status for both the origin ({{{originCity}}}) and destination ({{{destinationCity}}}) airports. Mention any significant delays, security wait times, closures, or other issues that could impact travel.

Provide a helpful and clear summary.
`,
});

const flightAssistantFlow = ai.defineFlow(
  {
    name: 'flightAssistantFlow',
    inputSchema: FlightTravelAdvisoryInputSchema,
    outputSchema: FlightTravelAdvisoryOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
        throw new Error("The AI assistant failed to generate a response.");
    }
    return output;
  }
);
