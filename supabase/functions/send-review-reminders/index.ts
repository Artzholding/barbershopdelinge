import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const fourHoursAgo = new Date();
    fourHoursAgo.setHours(fourHoursAgo.getHours() - 4);

    const { data: pendingRequests, error: fetchError } = await supabase
      .from('review_requests')
      .select(`
        id,
        visit_id,
        request_type,
        customer_visits (
          customer_name,
          customer_email,
          customer_phone,
          service_type
        )
      `)
      .in('request_type', ['email', 'sms'])
      .is('completed_at', null)
      .lt('sent_at', fourHoursAgo.toISOString());

    if (fetchError) throw fetchError;

    const results = {
      emails_sent: 0,
      sms_sent: 0,
      errors: [] as string[],
    };

    for (const request of pendingRequests || []) {
      const visit = request.customer_visits as any;
      const baseUrl = 'https://barbershopdelinge.nl';
      const reviewUrl = `${baseUrl}/#/review?v=${request.visit_id}`;

      try {
        if (request.request_type === 'email' && visit.customer_email) {
          console.log(`Would send email to ${visit.customer_email}`);
          console.log(`Review link: ${reviewUrl}`);
          results.emails_sent++;
        } else if (request.request_type === 'sms' && visit.customer_phone) {
          console.log(`Would send SMS to ${visit.customer_phone}`);
          console.log(`Review link: ${reviewUrl}`);
          results.sms_sent++;
        }
      } catch (error) {
        results.errors.push(`Failed to send ${request.request_type} for visit ${request.visit_id}`);
        console.error(error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        ...results,
        message: `Processed ${results.emails_sent + results.sms_sent} reminders`,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error processing review reminders:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});