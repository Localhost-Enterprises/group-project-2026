import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://txjftwcpwxmgkvrmqtvy.supabase.co';
const supabaseAnonKey = 'sb_publishable_qPKlCn2KKWKsGvfJv0lZAQ_wPZYcxdy';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
