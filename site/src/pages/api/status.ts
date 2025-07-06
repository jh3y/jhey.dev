export const prerender = false; // Not needed in 'server' mode
import type { APIRoute } from 'astro'
import { getStatusData } from '../../utils/getStatusData';

export const GET: APIRoute = async () => {
  try {
    const formattedData = await getStatusData();
    return new Response(JSON.stringify(formattedData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (err) {
    console.error('Unexpected error fetching data:', err);
    return new Response(
      JSON.stringify({
        message: 'Internal server error',
        error: err instanceof Error ? err.message : String(err)
      }),
      { status: 500 }
    );
  }
}; 