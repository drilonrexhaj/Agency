export interface Env {
  DB: D1Database;
}

// Types for request/response
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    try {
      // Route requests
      if (url.pathname === '/api/contact' && request.method === 'POST') {
        return handleContactSubmission(request, env, corsHeaders);
      }

      if (url.pathname === '/api/contact/messages' && request.method === 'GET') {
        return handleGetMessages(request, env, corsHeaders);
      }

      if (url.pathname.startsWith('/api/contact/') && request.method === 'PUT') {
        const messageId = url.pathname.split('/').pop();
        return handleUpdateMessage(request, env, messageId || '', corsHeaders);
      }

      return new Response(
        JSON.stringify({ success: false, error: 'Not Found' } as ApiResponse),
        { status: 404, headers: corsHeaders }
      );
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Internal Server Error',
          message: error instanceof Error ? error.message : 'Unknown error',
        } as ApiResponse),
        { status: 500, headers: corsHeaders }
      );
    }
  },
};

// Handle contact form submission
async function handleContactSubmission(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  try {
    const data: ContactFormData = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields: name, email, message',
        } as ApiResponse),
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email address',
        } as ApiResponse),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get client IP
    const clientIp =
      request.headers.get('CF-Connecting-IP') ||
      request.headers.get('X-Forwarded-For') ||
      'unknown';

    // Get user agent
    const userAgent = request.headers.get('User-Agent') || '';

    // Insert into database
    const result = await env.DB.prepare(
      `INSERT INTO contact_messages (name, email, phone, message, ip_address, user_agent, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`
    )
      .bind(data.name, data.email, data.phone || null, data.message, clientIp, userAgent)
      .run();

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Mesazhi i juaj u pranua! Shpejt do t\'ju kontaktojmë.',
        data: { id: result.meta.last_row_id },
      } as ApiResponse),
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Contact submission error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to process contact form',
        message: error instanceof Error ? error.message : 'Unknown error',
      } as ApiResponse),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle getting messages (admin endpoint)
async function handleGetMessages(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>
): Promise<Response> {
  try {
    // In production, verify admin authentication here
    // For now, accept all requests (implement auth as needed)

    const { results } = await env.DB.prepare(
      `SELECT id, name, email, phone, message, created_at, status
       FROM contact_messages
       ORDER BY created_at DESC
       LIMIT 100`
    ).all();

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Messages retrieved',
        data: results,
      } as ApiResponse),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Get messages error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to retrieve messages',
      } as ApiResponse),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle updating message status (admin endpoint)
async function handleUpdateMessage(
  request: Request,
  env: Env,
  messageId: string,
  corsHeaders: Record<string, string>
): Promise<Response> {
  try {
    const body = await request.json() as { status: string };

    if (!body.status) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Status field is required',
        } as ApiResponse),
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await env.DB.prepare(
      `UPDATE contact_messages SET status = ? WHERE id = ?`
    )
      .bind(body.status, messageId)
      .run();

    if (result.meta.changes === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Message not found',
        } as ApiResponse),
        { status: 404, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Message status updated',
      } as ApiResponse),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Update message error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to update message',
      } as ApiResponse),
      { status: 500, headers: corsHeaders }
    );
  }
}
