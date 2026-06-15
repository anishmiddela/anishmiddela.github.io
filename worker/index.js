const ALLOWED_ORIGINS = [
  'https://anishmiddela.com',
  'https://www.anishmiddela.com',
  'http://localhost:5173',
]

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''
    const corsOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]

    const corsHeaders = {
      'Access-Control-Allow-Origin': corsOrigin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405, headers: corsHeaders })
    }

    try {
      const { pin } = await request.json()
      const success = pin === env.PIN
      return new Response(JSON.stringify({ success }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    } catch {
      return new Response(JSON.stringify({ success: false }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  },
}
